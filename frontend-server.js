const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001; // Different port to avoid conflicts

// Security middleware with relaxed CSP for API calls
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

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 BetaBay Frontend running on port ${PORT}`);
  console.log(`📱 Visit http://localhost:${PORT} to view the app`);
  console.log(`🔗 Backend API: https://betabay-4qax3ayf7-alexmen656s-projects.vercel.app`);
});
