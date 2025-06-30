const express = require('express');
const session = require('express-session');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'https://betabay.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true, // Changed to true to persist OAuth state
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  // Force session to be saved even if unmodified
  rolling: true
}));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for OAuth states (in production, use Redis or database)
const oauthStates = new Map();

// Slack OAuth URLs - Updated to latest API endpoints
const SLACK_OAUTH_URL = 'https://slack.com/oauth/v2/authorize';
const SLACK_TOKEN_URL = 'https://slack.com/api/oauth.v2.access';
const SLACK_USER_INFO_URL = 'https://slack.com/api/users.info';
const SLACK_AUTH_TEST_URL = 'https://slack.com/api/auth.test';

// Routes
app.get('/api/auth/slack', (req, res) => {
  // Generate a more secure state parameter
  const state = require('crypto').randomBytes(32).toString('hex');
  
  const params = new URLSearchParams({
    client_id: process.env.SLACK_CLIENT_ID,
    scope: 'users:read',
    redirect_uri: process.env.SLACK_REDIRECT_URI,
    state: state,
    response_type: 'code'
  });
  
  // Store state in memory store with expiration (10 minutes)
  oauthStates.set(state, {
    timestamp: Date.now(),
    sessionId: req.sessionID
  });
  
  // Clean up old states (older than 10 minutes)
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  for (const [key, value] of oauthStates.entries()) {
    if (value.timestamp < tenMinutesAgo) {
      oauthStates.delete(key);
    }
  }
  
  console.log('OAuth state generated and stored:', state);
  res.redirect(`${SLACK_OAUTH_URL}?${params}`);
});

app.get('/auth/slack/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state for CSRF protection using in-memory store
  const storedState = oauthStates.get(state);
  if (!storedState) {
    console.error('OAuth state not found:', state);
    return res.status(400).json({ error: 'Invalid or expired state parameter' });
  }
  
  // Remove used state
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
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (!tokenResponse.data.ok) {
      throw new Error(tokenResponse.data.error || 'Token exchange failed');
    }
    
    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.authed_user.id;
    
    // Get user information using users.info
    const userResponse = await axios.get(SLACK_USER_INFO_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        user: userId
      }
    });
    
    if (!userResponse.data.ok) {
      throw new Error(userResponse.data.error || 'Failed to get user info');
    }
    
    const user = userResponse.data.user;
    
    // Store user in session with proper data structure
    req.session.user = {
      id: user.id,
      name: user.real_name || user.name,
      email: user.profile.email,
      image: user.profile.image_512 || user.profile.image_192,
      team: tokenResponse.data.team.name || 'Unknown Team'
    };
    
    console.log('User authenticated successfully:', user.id);
    
    // Create JWT token for cross-domain authentication
    const crypto = require('crypto');
    const userToken = Buffer.from(JSON.stringify({
      id: user.id,
      name: user.real_name || user.name,
      email: user.profile.email,
      image: user.profile.image_512 || user.profile.image_192,
      team: tokenResponse.data.team.name || 'Unknown Team',
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })).toString('base64');
    
    // Redirect to frontend with token
    const frontendUrl = process.env.NODE_ENV === 'production' 
      ? `http://localhost:3000/?auth=success&token=${userToken}`
      : `http://localhost:3000/?auth=success&token=${userToken}`;
    
    res.redirect(frontendUrl);
    
  } catch (error) {
    console.error('Slack OAuth error:', error.message);
    console.error('Error details:', error.response?.data);
    res.redirect('/?auth=error');
  }
});

app.get('/api/user', (req, res) => {
  // Check for token-based auth first (for cross-domain)
  const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
  
  if (token) {
    try {
      const userData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if token is expired
      if (userData.exp && userData.exp < Date.now()) {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      // Remove expiration from response
      delete userData.exp;
      return res.json(userData);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  
  // Fallback to session-based auth (for same-domain)
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// API routes for app testing functionality
app.get('/api/apps', (req, res) => {
  // Mock data - in a real app, this would come from a database
  const apps = [
    {
      id: 1,
      name: 'TaskMaster Pro',
      description: 'Advanced task management with AI assistance',
      category: 'Productivity',
      status: 'testing',
      submittedBy: 'john.doe',
      submitDate: '2024-12-15'
    },
    {
      id: 2,
      name: 'CodeReview Bot',
      description: 'Automated code review and suggestions',
      category: 'Development',
      status: 'approved',
      submittedBy: 'jane.smith',
      submitDate: '2024-12-10'
    }
  ];
  
  res.json(apps);
});

app.post('/api/apps', (req, res) => {
  let user = null;
  
  // Check for token-based auth first (for cross-domain)
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const userData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if token is expired
      if (userData.exp && userData.exp < Date.now()) {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      user = userData;
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else if (req.session.user) {
    // Fallback to session-based auth
    user = req.session.user;
  }
  
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const { name, description, category, url } = req.body;
  
  if (!name || !description || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Mock response - in a real app, this would save to a database
  const newApp = {
    id: Date.now(),
    name,
    description,
    category,
    url,
    status: 'pending',
    submittedBy: user.name,
    submitDate: new Date().toISOString().split('T')[0]
  };
  
  res.status(201).json(newApp);
});

// Serve main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`BetaBay server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the app`);
});
