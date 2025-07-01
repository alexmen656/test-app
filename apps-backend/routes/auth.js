const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Database = require('../database/db');

const router = express.Router();
const db = new Database();

// Slack OAuth configuration
const SLACK_OAUTH_URL = 'https://slack.com/oauth/v2/authorize';
const SLACK_TOKEN_URL = 'https://slack.com/api/oauth.v2.access';
const SLACK_USER_INFO_URL = 'https://slack.com/api/users.info';

// In-memory store for OAuth states
const oauthStates = new Map();

// Start Slack OAuth flow
router.get('/slack', (req, res) => {
  const state = require('crypto').randomBytes(32).toString('hex');
  
  const params = new URLSearchParams({
    client_id: process.env.SLACK_CLIENT_ID,
    scope: 'users:read',
    redirect_uri: process.env.SLACK_REDIRECT_URI,
    state: state,
    response_type: 'code'
  });
  
  // Store state with expiration (10 minutes)
  oauthStates.set(state, {
    timestamp: Date.now(),
    sessionId: req.sessionID
  });
  
  // Clean up old states
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  for (const [key, value] of oauthStates.entries()) {
    if (value.timestamp < tenMinutesAgo) {
      oauthStates.delete(key);
    }
  }
  
  console.log('🔐 OAuth state generated:', state);
  res.redirect(`${SLACK_OAUTH_URL}?${params}`);
});

// Handle Slack OAuth callback
router.get('/slack/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state
  const storedState = oauthStates.get(state);
  if (!storedState) {
    console.error('❌ OAuth state not found:', state);
    return res.status(400).json({ error: 'Invalid or expired state parameter' });
  }
  
  oauthStates.delete(state);
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(SLACK_TOKEN_URL, {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.SLACK_REDIRECT_URI
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    if (!tokenResponse.data.ok) {
      throw new Error(tokenResponse.data.error || 'Token exchange failed');
    }
    
    const accessToken = tokenResponse.data.access_token;
    const slackUserId = tokenResponse.data.authed_user.id;
    const teamName = tokenResponse.data.team.name;
    
    // Get user information
    const userResponse = await axios.get(SLACK_USER_INFO_URL, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
      params: { user: slackUserId }
    });
    
    if (!userResponse.data.ok) {
      throw new Error(userResponse.data.error || 'Failed to get user info');
    }
    
    const slackUser = userResponse.data.user;
    
    // Check if user exists in database
    await db.initialize();
    let user = await db.get('SELECT * FROM users WHERE slack_user_id = ?', [slackUserId]);
    
    if (!user) {
      // Create new user
      const userId = uuidv4();
      await db.run(`
        INSERT INTO users (
          id, slack_user_id, username, display_name, email, avatar_url, 
          slack_profile_link, owned_coins, last_login
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        slackUserId,
        slackUser.name,
        slackUser.real_name || slackUser.name,
        slackUser.profile.email,
        slackUser.profile.image_512 || slackUser.profile.image_192,
        `https://${teamName.toLowerCase()}.slack.com/team/${slackUserId}`,
        100, // Starting coins
        new Date().toISOString()
      ]);
      
      // Create signup bonus transaction
      const transactionId = uuidv4();
      await db.run(`
        INSERT INTO coin_transactions (
          id, receiver_user_id, amount, transaction_type, reference_type, description
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [
        transactionId,
        userId,
        100,
        'bonus',
        'signup_bonus',
        'Welcome bonus for joining BetaBay!'
      ]);
      
      // Create welcome notification
      const notificationId = uuidv4();
      await db.run(`
        INSERT INTO notifications (
          id, user_id, title, message, type
        ) VALUES (?, ?, ?, ?, ?)
      `, [
        notificationId,
        userId,
        'Welcome to BetaBay! 🎉',
        'You have received 100 coins as a welcome bonus. Start testing apps to earn more!',
        'success'
      ]);
      
      user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
      console.log('✅ New user created:', user.username);
    } else {
      // Update last login
      await db.run('UPDATE users SET last_login = ? WHERE id = ?', [
        new Date().toISOString(),
        user.id
      ]);
      console.log('✅ User login updated:', user.username);
    }
    
    // Create JWT token for frontend authentication
    const userToken = Buffer.from(JSON.stringify({
      id: user.id,
      slack_user_id: user.slack_user_id,
      username: user.username,
      display_name: user.display_name,
      email: user.email,
      avatar_url: user.avatar_url,
      owned_coins: user.owned_coins,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })).toString('base64');
    
    // Store user in session as fallback
    req.session.user = {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      email: user.email,
      avatar_url: user.avatar_url,
      owned_coins: user.owned_coins
    };
    
    // Redirect to frontend with token
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? `${process.env.FRONTEND_URL || 'https://betabay-apps.vercel.app'}/?auth=success&token=${userToken}`
      : `http://localhost:3000/?auth=success&token=${userToken}`;
    
    res.redirect(frontendUrl);
    
  } catch (error) {
    console.error('❌ Slack OAuth error:', error.message);
    console.error('Error details:', error.response?.data);
    
    const errorUrl = process.env.NODE_ENV === 'production'
      ? `${process.env.FRONTEND_URL || 'https://betabay-apps.vercel.app'}/?auth=error`
      : 'http://localhost:3000/?auth=error';
    
    res.redirect(errorUrl);
  }
});

// Get current user info
router.get('/user', async (req, res) => {
  try {
    // Check for token-based auth first
    const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
    
    if (token) {
      try {
        const userData = JSON.parse(Buffer.from(token, 'base64').toString());
        
        // Check if token is expired
        if (userData.exp && userData.exp < Date.now()) {
          return res.status(401).json({ error: 'Token expired' });
        }
        
        // Get fresh user data from database
        await db.initialize();
        const user = await db.get('SELECT * FROM users WHERE id = ?', [userData.id]);
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        // Remove sensitive data
        delete user.slack_user_id;
        return res.json(user);
        
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
    
    // Fallback to session-based auth
    if (req.session.user) {
      await db.initialize();
      const user = await db.get('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      delete user.slack_user_id;
      return res.json(user);
    }
    
    res.status(401).json({ error: 'Not authenticated' });
    
  } catch (error) {
    console.error('❌ Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
