const jwt = require('jsonwebtoken');

// JWT Secret (same as in testPosts.js)
const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

// Test users with Slack IDs
const testUsers = [
  {
    slack_user_id: "U01TASKMASTER123",
    username: "taskmaster_dev",
    display_name: "TaskMaster Developer",
    profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "taskmaster_dev@slack.local"
  },
  {
    slack_user_id: "U02FITNESS456",
    username: "fitness_innovate",
    display_name: "Fitness Innovator",
    profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "fitness_innovate@slack.local"
  },
  {
    slack_user_id: "U03CREATIVE789",
    username: "creative_studio",
    display_name: "Creative Studio",
    profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    email: "creative_studio@slack.local"
  },
  {
    slack_user_id: "U04EDU012345",
    username: "edutech_labs",
    display_name: "EduTech Labs",
    profile_image: "https://images.unsplash.com/photo-1494790108755-2616b25a4b7a?w=150&h=150&fit=crop&crop=face",
    email: "edutech_labs@slack.local"
  },
  {
    slack_user_id: "U05ZEN678901",
    username: "zen_developers",
    display_name: "Zen Developers",
    profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "zen_developers@slack.local"
  },
  {
    slack_user_id: "U06CULINARY234",
    username: "culinary_tech",
    display_name: "Culinary Tech",
    profile_image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=150&h=150&fit=crop&crop=face",
    email: "culinary_tech@slack.local"
  }
];

function generateTokens() {
  console.log('🔐 Generating JWT tokens for test users...\n');
  
  testUsers.forEach((user, index) => {
    const payload = {
      slack_user_id: user.slack_user_id,
      username: user.username,
      display_name: user.display_name,
      profile_image: user.profile_image,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 7) // 7 days
    };
    
    const token = jwt.sign(payload, JWT_SECRET);
    
    console.log(`${index + 1}. ${user.display_name} (${user.slack_user_id}):`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Token: ${token}`);
    console.log(`   Test command:`);
    console.log(`   curl -H "Authorization: Bearer ${token}" http://localhost:3001/api/test-posts/user/mine\n`);
  });
  
  console.log('✅ All tokens generated successfully!');
  console.log('\n📝 How to use:');
  console.log('1. Copy any token above');
  console.log('2. Add it to your API requests as: Authorization: Bearer <token>');
  console.log('3. The backend will automatically create/update users based on Slack data');
  console.log('\n🧪 Test endpoint to generate tokens via API:');
  console.log('POST http://localhost:3001/api/test-posts/auth/generate-token');
  console.log('Body: { "slack_user_id": "U12345", "username": "testuser", "display_name": "Test User" }');
}

generateTokens();
