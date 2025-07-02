/**
 * Test script to verify MongoDB integration in testPosts.js
 * 
 * This script makes requests to the testPosts endpoints to verify
 * that MongoDB methods are being used correctly.
 */
require('dotenv').config();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Set environment variable to use MongoDB
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri';

// Import the database module
const db = require('./database');

const API_URL = 'http://localhost:3002';

async function testMongoDB() {
  try {
    console.log('🔍 Testing MongoDB integration for testPosts.js');
    
    // Verify MongoDB connection
    await db.initialize();
    console.log('✅ MongoDB connection established');
    
    // Verify that MongoDB methods are available
    const methods = ['findOne', 'find', 'insert', 'update', 'delete', 'count'];
    for (const method of methods) {
      if (typeof db[method] !== 'function') {
        console.error(`❌ MongoDB method "${method}" is not available!`);
        process.exit(1);
      }
    }
    console.log('✅ All MongoDB methods are available');
    
    // Create a test user
    const userId = uuidv4();
    const username = `test_user_${Date.now()}`;
    
    await db.insert('users', {
      id: userId,
      slack_user_id: `slack_${userId}`,
      username: username,
      display_name: `Test User ${Date.now()}`,
      email: `${username}@example.com`,
      avatar_url: 'https://example.com/avatar.png',
      owned_coins: 100,
      created_at: new Date(),
      is_active: true
    });
    
    console.log(`✅ Created test user: ${username} (${userId})`);
    
    // Create a test auth token
    const token = Buffer.from(JSON.stringify({
      id: userId,
      username: username,
      exp: Date.now() + (60 * 60 * 1000) // 1 hour expiration
    })).toString('base64');
    
    // Test creating a test post
    const testPostData = {
      app_name: `Test App ${Date.now()}`,
      description: `This is a test app created at ${new Date().toISOString()}`,
      testing_link: 'https://example.com/test',
      test_price: 0,
      instructions: 'Test instructions',
      max_testers: 5
    };
    
    const createResponse = await axios.post(
      `${API_URL}/api/test-posts`,
      testPostData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (createResponse.status !== 201) {
      throw new Error(`Failed to create test post: ${JSON.stringify(createResponse.data)}`);
    }
    
    const testPostId = createResponse.data.test_post.id;
    console.log(`✅ Created test post: ${testPostId}`);
    
    // Test fetching all test posts
    const allPostsResponse = await axios.get(`${API_URL}/api/test-posts`);
    
    if (allPostsResponse.status !== 200) {
      throw new Error(`Failed to fetch test posts: ${JSON.stringify(allPostsResponse.data)}`);
    }
    
    console.log(`✅ Fetched ${allPostsResponse.data.test_posts.length} test posts`);
    
    // Test fetching single test post
    const singlePostResponse = await axios.get(`${API_URL}/api/test-posts/${testPostId}`);
    
    if (singlePostResponse.status !== 200) {
      throw new Error(`Failed to fetch test post: ${JSON.stringify(singlePostResponse.data)}`);
    }
    
    console.log(`✅ Fetched test post: ${singlePostResponse.data.app_name}`);
    
    // Test updating test post
    const updateResponse = await axios.put(
      `${API_URL}/api/test-posts/${testPostId}`,
      {
        ...testPostData,
        app_name: `Updated App ${Date.now()}`
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (updateResponse.status !== 200) {
      throw new Error(`Failed to update test post: ${JSON.stringify(updateResponse.data)}`);
    }
    
    console.log(`✅ Updated test post: ${updateResponse.data.test_post.app_name}`);
    
    // Test fetching user's test posts
    const userPostsResponse = await axios.get(
      `${API_URL}/api/test-posts/user/mine`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (userPostsResponse.status !== 200) {
      throw new Error(`Failed to fetch user test posts: ${JSON.stringify(userPostsResponse.data)}`);
    }
    
    console.log(`✅ Fetched ${userPostsResponse.data.length} user test posts`);
    
    // Create a second test user
    const secondUserId = uuidv4();
    const secondUsername = `test_user_${Date.now() + 1}`;
    
    await db.insert('users', {
      id: secondUserId,
      slack_user_id: `slack_${secondUserId}`,
      username: secondUsername,
      display_name: `Test User ${Date.now() + 1}`,
      email: `${secondUsername}@example.com`,
      avatar_url: 'https://example.com/avatar2.png',
      owned_coins: 100,
      created_at: new Date(),
      is_active: true
    });
    
    console.log(`✅ Created second test user: ${secondUsername} (${secondUserId})`);
    
    // Create a token for the second user
    const secondToken = Buffer.from(JSON.stringify({
      id: secondUserId,
      username: secondUsername,
      exp: Date.now() + (60 * 60 * 1000) // 1 hour expiration
    })).toString('base64');
    
    // Test joining a test post
    const joinResponse = await axios.post(
      `${API_URL}/api/test-posts/${testPostId}/join`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${secondToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (joinResponse.status !== 200) {
      throw new Error(`Failed to join test post: ${JSON.stringify(joinResponse.data)}`);
    }
    
    console.log(`✅ Second user joined test post`);
    
    // Verify that the join was recorded in the database
    const participant = await db.findOne('test_participants', {
      test_post_id: testPostId,
      user_id: secondUserId
    });
    
    if (!participant) {
      throw new Error('Participant record not found in database');
    }
    
    console.log('✅ Verified participant record in database');
    
    console.log('\n✅ All tests passed! MongoDB integration for testPosts.js is working properly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    process.exit(1);
  } finally {
    if (db.close) {
      await db.close();
    }
    process.exit(0);
  }
}

testMongoDB();
