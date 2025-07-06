/**
 * Test script to verify that MongoDB methods are working correctly
 */
require('dotenv').config();

// Ensure MongoDB URI is set
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

// Import the database instance
const db = require('../database');

async function testMethods() {
  try {
    console.log('🔍 Testing MongoDB adapter methods...');
    
    // Initialize the database
    await db.initialize();
    console.log('✅ Database initialized');
    
    // Check that all required methods exist
    const requiredMethods = ['findOne', 'find', 'insert', 'update', 'delete', 'count'];
    for (const method of requiredMethods) {
      if (typeof db[method] !== 'function') {
        console.error(`❌ Method "${method}" is not available!`);
      } else {
        console.log(`✅ Method "${method}" is available`);
      }
    }
    
    // Test findOne method
    try {
      const testUser = await db.findOne('users', { username: 'test-user' });
      console.log('✅ findOne method worked:', testUser ? 'Found user' : 'No user found (expected)');
    } catch (error) {
      console.error('❌ findOne test failed:', error);
    }
    
    // Test find method
    try {
      const testPosts = await db.find('test_posts', {}, { limit: 1 });
      console.log('✅ find method worked, found', testPosts.length, 'posts');
    } catch (error) {
      console.error('❌ find test failed:', error);
    }
    
    // Close the database connection
    if (db.close) {
      await db.close();
      console.log('✅ Database connection closed');
    }
    
    console.log('✅ All tests completed');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testMethods();
