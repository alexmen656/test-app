# BetaBay 🚀
Review Apps and submit apps for review

## Project Structure

This repository contains the complete BetaBay platform with multiple components:

### Frontend Components
- **`public/`** - Main web application frontend
- **`landing-page/`** - Marketing/landing page with Slack OAuth integration  
- **`frontend-server.js`** - Simple static file server for frontend

### Backend Components
- **`backend/`** - Legacy backend (for reference)
- **`apps-backend/`** - **🚀 NEW Main Platform Backend** - Complete testing platform API

### Assets
- **`assets/`** - Brand assets and images

## Quick Start

### 1. Main Platform Backend (apps-backend)
```bash
cd apps-backend
npm install
cp .env.example .env
# Configure your Slack OAuth credentials in .env
npm run init-db
npm run dev
```

### 2. Frontend
```bash
npm install
npm run serve-frontend
```

### 3. Landing Page
```bash
npm run serve-landing
```

## Features

### 🎯 Core Platform (apps-backend)
- **Slack OAuth Integration** - Secure user authentication
- **Test Post Management** - Create and manage app testing opportunities
- **Coin Economy System** - Reward-based system for testers and developers
- **Review & Rating System** - Rate and review tested applications
- **User Profiles & Leaderboards** - Track participation and achievements
- **File Upload Support** - Screenshots, app icons, and media
- **Cross-domain Authentication** - JWT-like tokens for frontend integration
- **Notification System** - Keep users informed of activity

### 📊 Database Schema
- Users (Slack-based authentication)
- Test Posts (app testing opportunities)  
- Screenshots (linked media files)
- Test Participants (many-to-many relationships)
- Reviews (ratings and feedback)
- Coin Transactions (complete audit trail)
- Notifications (user engagement)

### 🔐 Security & Performance
- Helmet security headers
- CORS configuration
- OAuth state validation
- SQL injection prevention
- Image processing and optimization
- Session management with secure cookies

## API Documentation

The main backend (`apps-backend`) provides a comprehensive RESTful API. See:
- **`apps-backend/README.md`** - Complete API documentation
- **`apps-backend/FRONTEND_INTEGRATION.md`** - Frontend integration guide

## Environment Setup

1. **Slack OAuth Setup**:
   - Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
   - Add OAuth redirect URI: `http://localhost:3002/api/auth/slack/callback`
   - Copy Client ID and Secret to `.env`

2. **Environment Variables**:
   ```env
   SLACK_CLIENT_ID=your_client_id
   SLACK_CLIENT_SECRET=your_client_secret  
   SLACK_REDIRECT_URI=http://localhost:3002/api/auth/slack/callback
   SESSION_SECRET=your-session-secret
   ```

## Development

- **Backend**: `cd apps-backend && npm run dev` (Port 3002)
- **Frontend**: `npm run serve-frontend` (Port 3000)  
- **Landing**: `npm run serve-landing` (Port 3001)

## Deployment

### Backend (apps-backend)
Deploy to Vercel, Railway, or any Node.js hosting platform. Set production environment variables.

### Frontend
Can be deployed as static files or integrated with the backend for a unified experience.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes  
4. Test thoroughly
5. Submit a pull request

For detailed development setup, see the individual README files in each component directory.