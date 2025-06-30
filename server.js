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
      connectSrc: ["'self'", "https://betabay-crmuhirmj-alexmen656s-projects.vercel.app", "https://betabay-4qax3ayf7-alexmen656s-projects.vercel.app"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'https://betabay-4qax3ayf7-alexmen656s-projects.vercel.app'],
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
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Slack OAuth URLs
const SLACK_OAUTH_URL = 'https://slack.com/oauth/v2/authorize';
const SLACK_TOKEN_URL = 'https://slack.com/api/oauth.v2.access';
const SLACK_USER_INFO_URL = 'https://slack.com/api/users.identity';

// Routes
app.get('/api/auth/slack', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.SLACK_CLIENT_ID,
    scope: 'identity.basic,identity.email,identity.team',
    redirect_uri: process.env.SLACK_REDIRECT_URI,
    state: Math.random().toString(36).substring(7) // CSRF protection
  });
  
  req.session.oauthState = params.get('state');
  res.redirect(`${SLACK_OAUTH_URL}?${params}`);
});

app.get('/auth/slack/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state for CSRF protection
  if (state !== req.session.oauthState) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }
  
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
    });
    
    if (!tokenResponse.data.ok) {
      throw new Error(tokenResponse.data.error);
    }
    
    const accessToken = tokenResponse.data.access_token;
    
    // Get user information
    const userResponse = await axios.get(SLACK_USER_INFO_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!userResponse.data.ok) {
      throw new Error(userResponse.data.error);
    }
    
    const user = userResponse.data.user;
    
    // Store user in session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image_192,
      team: userResponse.data.team
    };
    
    // Redirect to frontend
    res.redirect('/?auth=success');
    
  } catch (error) {
    console.error('Slack OAuth error:', error.message);
    res.redirect('/?auth=error');
  }
});

app.get('/api/user', (req, res) => {
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
  if (!req.session.user) {
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
    submittedBy: req.session.user.name,
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
