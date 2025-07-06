const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

const SLACK_OAUTH_URL = 'https://slack.com/oauth/v2/authorize';
const SLACK_TOKEN_URL = 'https://slack.com/api/oauth.v2.access';
const SLACK_USER_INFO_URL = 'https://slack.com/api/users.info';

const oauthStates = new Map();

router.get('/slack', (req, res) => {
  const state = require('crypto').randomBytes(32).toString('hex');
  
  const params = new URLSearchParams({
    client_id: process.env.SLACK_CLIENT_ID,
    scope: 'users:read',
    redirect_uri: process.env.SLACK_REDIRECT_URI,
    state: state,
    response_type: 'code'
  });
  
  oauthStates.set(state, {
    timestamp: Date.now(),
    sessionId: req.sessionID
  });
  
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  for (const [key, value] of oauthStates.entries()) {
    if (value.timestamp < tenMinutesAgo) {
      oauthStates.delete(key);
    }
  }
  
  console.log('🔐 OAuth state generated:', state);
  res.redirect(`${SLACK_OAUTH_URL}?${params}`);
});

router.get('/slack/callback', async (req, res) => {
  const { code, state } = req.query;
  
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
    
    const userResponse = await axios.get(SLACK_USER_INFO_URL, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
      params: { user: slackUserId }
    });
    
    if (!userResponse.data.ok) {
      throw new Error(userResponse.data.error || 'Failed to get user info');
    }
    
    const slackUser = userResponse.data.user;
    
    let user;
    
    if (db.findOne) {
      user = await db.findOne('users', { slack_user_id: slackUserId });
      
      if (!user) {
        const userId = uuidv4();
        
        await db.insert('users', {
          id: userId,
          slack_user_id: slackUserId,
          username: slackUser.name,
          display_name: slackUser.real_name || slackUser.name,
          email: slackUser.profile.email || `${slackUserId}@slack.local`,
          avatar_url: slackUser.profile.image_512 || slackUser.profile.image_192,
          slack_profile_link: `https://${teamName.toLowerCase()}.slack.com/team/${slackUserId}`,
          owned_coins: 100,
          last_login: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        });
        
        await db.insert('coin_transactions', {
          id: uuidv4(),
          receiver_user_id: userId,
          amount: 100,
          transaction_type: 'bonus',
          reference_type: 'signup_bonus',
          description: 'Welcome bonus for joining BetaBay!',
          status: 'completed',
          created_at: new Date()
        });
        
        await db.insert('notifications', {
          id: uuidv4(),
          user_id: userId,
          title: 'Welcome to BetaBay! 🎉',
          message: 'You have received 100 coins as a welcome bonus. Start testing apps to earn more!',
          type: 'success',
          is_read: false,
          created_at: new Date()
        });
        
        user = await db.findOne('users', { id: userId });
        console.log('✅ New user created:', user.username);
      } else {
        await db.update('users', 
          { id: user.id }, 
          { $set: { last_login: new Date(), updated_at: new Date() } }
        );
        console.log('✅ User login updated:', user.username);
      }
    }
    
    const jwtPayload = {
      slack_user_id: user.slack_user_id,
      username: user.username,
      display_name: user.display_name,
      email: user.email,
      profile_image: user.avatar_url,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    };
    
    const userToken = jwt.sign(jwtPayload, JWT_SECRET);
    
    console.log('✅ JWT token created for user:', user.username);
    console.log('Token payload:', { 
      slack_user_id: user.slack_user_id, 
      username: user.username 
    });
    
    req.session.user = {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      email: user.email,
      avatar_url: user.avatar_url,
      owned_coins: user.owned_coins
    };
    
    const frontendUrl = `${'https://app.beta-bay.com'}/?auth=success&token=${userToken}`;
    
    res.redirect(frontendUrl);
    
  } catch (error) {
    console.error('❌ Slack OAuth error:', error.message);
    console.error('Error details:', error.response?.data);
    
    const errorUrl = `${'https://app.beta-bay.com'}/?auth=error`;
    
    res.redirect(errorUrl);
  }
});

router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        if (!decoded.slack_user_id) {
          return res.status(401).json({ error: 'Invalid token: missing slack_user_id' });
        }
        
        let user;
        
        if (db.findOne) {
          user = await db.findOne('users', { slack_user_id: decoded.slack_user_id });
        }
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        return res.json({
          id: user.slack_user_id,
          name: user.display_name || user.username,
          email: user.email,
          image: user.avatar_url,
          team: 'BetaBay Team'
        });
        
      } catch (jwtError) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
    }
    
    if (req.session.user) {
      let user;
      
      if (db.findOne) {
        user = await db.findOne('users', { id: req.session.user.id });
      }
      
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

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
