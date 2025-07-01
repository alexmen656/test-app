# BetaBay Apps Backend

A comprehensive backend for the BetaBay app testing platform.

## Features

- **Slack OAuth Integration**: Secure user authentication via Slack
- **Test Post Management**: Create, manage, and join app testing sessions
- **Coin System**: Reward-based economy for testers and developers
- **Review System**: Rate and review tested applications
- **User Management**: Profile management, notifications, leaderboards
- **File Upload**: Screenshot and icon upload with image processing
- **Cross-domain Support**: JWT-like tokens for frontend integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables by creating `.env`:
```bash
cp .env.example .env
```

3. Configure your Slack OAuth application and add credentials to `.env`

4. Initialize the database:
```bash
npm run init-db
```

5. Start the server:
```bash
npm run dev  # Development mode with auto-reload
# or
npm start    # Production mode
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3002

# Slack OAuth
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
SLACK_REDIRECT_URI=http://localhost:3002/api/auth/slack/callback

# Frontend URLs (for OAuth redirects)
FRONTEND_URL=http://localhost:3000

# Session Secret
SESSION_SECRET=your-super-secret-session-key
```

## API Endpoints

### Authentication
- `GET /api/auth/slack` - Start Slack OAuth flow
- `GET /api/auth/slack/callback` - Handle OAuth callback
- `GET /api/auth/user` - Get current user info
- `POST /api/auth/logout` - Logout user

### Test Posts
- `GET /api/test-posts` - List all active test posts
- `POST /api/test-posts` - Create new test post
- `GET /api/test-posts/:id` - Get specific test post
- `PUT /api/test-posts/:id` - Update test post
- `DELETE /api/test-posts/:id` - Delete test post
- `POST /api/test-posts/:id/join` - Join a test post
- `GET /api/test-posts/user/:userId` - Get user's test posts

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/notifications` - Get user notifications
- `POST /api/users/notifications/:id/read` - Mark notification as read
- `GET /api/users/leaderboard` - Get top users by coins
- `GET /api/users/participation` - Get user's test participation

### Coins
- `GET /api/coins/balance` - Get user's coin balance
- `GET /api/coins/transactions` - Get user's transaction history
- `POST /api/coins/transfer` - Transfer coins to another user
- `GET /api/coins/stats` - Get coin system statistics

### Reviews
- `GET /api/reviews` - Get all reviews (with pagination)
- `POST /api/reviews` - Create a new review
- `GET /api/reviews/:id` - Get specific review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/featured` - Get featured reviews
- `GET /api/reviews/user/:userId` - Get user's reviews

### Health Check
- `GET /api/health` - Server health status

## Database Schema

The backend uses SQLite with the following main tables:

- **users** - User profiles and authentication
- **test_posts** - App testing opportunities
- **screenshots** - Images linked to test posts
- **test_participants** - Many-to-many relationship between users and tests
- **reviews** - User reviews of tested apps
- **coin_transactions** - All coin movements and rewards
- **notifications** - User notifications

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts the server with nodemon for auto-reloading on file changes.

### Database Management

Initialize or reset the database:
```bash
npm run init-db
```

The database file will be created at `database/betabay_apps.db`.

### File Uploads

Screenshots and app icons are uploaded to the `uploads/` directory. The server automatically:
- Validates file types (images only)
- Limits file size (5MB max)
- Processes images with Sharp for optimization
- Serves files via `/uploads` static route

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production URLs in environment variables
3. Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start server.js --name "betabay-apps-backend"
```

## Architecture

- **Express.js** - Web framework
- **SQLite** - Database (with prepared statements)
- **Multer + Sharp** - File upload and image processing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-session** - Session management
- **Joi** - Request validation

## Security Features

- Helmet security headers
- CORS configuration for specific origins
- OAuth state validation with expiration
- JWT-like token authentication
- SQL injection prevention with prepared statements
- File upload restrictions and validation
- Session security with secure cookies

## Support

For questions or issues, please refer to the main BetaBay documentation or create an issue in the repository.
