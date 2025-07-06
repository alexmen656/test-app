require('dotenv').config();
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

// Base URL for API
const API_BASE = 'http://localhost:3002/api';

// Test creating a post
async function testCreatePost() {
  console.log('\n--- Testing Create Post ---');
  try {
    const testId = uuidv4().substring(0, 8);
    const response = await fetch(`${API_BASE}/test-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 'test-user-id',
        app_name: `Test App ${testId}`,
        description: 'This is a test app for MongoDB integration',
        test_price: 15,
        max_testers: 8
      })
    });
    
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Create Post Response:', JSON.stringify(data, null, 2));
    
    return data.test_post?.id;
  } catch (error) {
    console.error('Error testing post creation:', error.message);
    return null;
  }
}

// Test getting a post by ID
async function testGetPost(postId) {
  console.log('\n--- Testing Get Post by ID ---');
  try {
    console.log(`Getting post ID: ${postId}`);
    
    const response = await fetch(`${API_BASE}/test-posts/${postId}`);
    const data = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Get Post Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing post retrieval:', error.message);
  }
}

// Test getting all posts
async function testGetAllPosts() {
  console.log('\n--- Testing Get All Posts ---');
  try {
    const response = await fetch(`${API_BASE}/test-posts?limit=5`);
    const data = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Pagination:', data.pagination);
    console.log(`Retrieved ${data.test_posts?.length || 0} posts`);
    
    if (data.test_posts && data.test_posts.length > 0) {
      console.log('First Post:', JSON.stringify(data.test_posts[0], null, 2));
    }
  } catch (error) {
    console.error('Error testing posts retrieval:', error.message);
  }
}

// Test updating a post
async function testUpdatePost(postId) {
  console.log('\n--- Testing Update Post ---');
  try {
    const response = await fetch(`${API_BASE}/test-posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_name: `Updated Test App`,
        description: 'This post has been updated with MongoDB',
        test_price: 25,
        max_testers: 12
      })
    });
    
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Update Post Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing post update:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('=== Starting MongoDB Integration Tests ===');
  console.log('Testing with MongoDB URI:', process.env.MONGODB_URI ? 'Available' : 'Not Available');
  
  // Create a post
  const postId = await testCreatePost();
  
  if (postId) {
    // Get the post by ID
    await testGetPost(postId);
    
    // Update the post
    await testUpdatePost(postId);
    
    // Get the updated post
    await testGetPost(postId);
  }
  
  // Get all posts
  await testGetAllPosts();
  
  console.log('\n=== MongoDB Integration Tests Complete ===');
}

// Start the server if it's not already running
const { spawn } = require('child_process');
const http = require('http');

function checkServerRunning() {
  return new Promise((resolve) => {
    http.get('http://localhost:3002/api/health', (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function startServer() {
  const isRunning = await checkServerRunning();
  
  if (isRunning) {
    console.log('Server is already running, starting tests...');
    runTests();
  } else {
    console.log('Starting server...');
    const server = spawn('node', ['server.js'], { detached: true });
    
    server.stdout.on('data', (data) => {
      console.log(`Server: ${data}`);
      if (data.includes('BetaBay Apps Backend running')) {
        console.log('Server is ready, starting tests...');
        setTimeout(runTests, 1000); // Give it a little extra time
      }
    });
    
    server.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });
  }
}

startServer();
