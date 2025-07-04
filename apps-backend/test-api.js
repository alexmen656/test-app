const axios = require('axios');

// Test the backend API endpoints
async function testAPI() {
  const baseURL = 'http://localhost:3002';
  
  try {
    console.log('🚀 Testing backend API...');
    
    // Test 1: Get all test posts
    console.log('\n📋 Testing GET /api/test-posts...');
    const response1 = await axios.get(`${baseURL}/api/test-posts`);
    console.log(`✅ Status: ${response1.status}`);
    console.log(`📊 Found ${response1.data.test_posts.length} test posts`);
    
    if (response1.data.test_posts.length > 0) {
      const firstApp = response1.data.test_posts[0];
      console.log(`📱 First app: ${firstApp.app_name} (ID: ${firstApp.id})`);
      
      // Test 2: Get specific test post
      console.log(`\n🔍 Testing GET /api/test-posts/${firstApp.id}...`);
      const response2 = await axios.get(`${baseURL}/api/test-posts/${firstApp.id}`);
      console.log(`✅ Status: ${response2.status}`);
      console.log(`📱 App details: ${response2.data.app_name}`);
      console.log(`👤 Creator: ${response2.data.user_info?.username || 'Unknown'}`);
      console.log(`🔗 Icon URL: ${response2.data.icon_url ? 'Available' : 'Not set'}`);
    }
    
    console.log('\n🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data:`, error.response.data);
    }
  }
}

// Run the test
testAPI();
