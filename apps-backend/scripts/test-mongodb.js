#!/usr/bin/env node

/**
 * MongoDB Database Adapter Tester
 * This script tests if the MongoDB connection and adapter functions work properly
 */

require('dotenv').config();
const MongoDatabase = require('../database/mongo-db');

async function testMongoDB() {
  console.log('🚀 Testing MongoDB connection and adapter...');
  
  try {
    // Initialize database
    const db = new MongoDatabase();
    await db.initialize();
    console.log('✅ MongoDB connection successful');
    
    // Test creating a test post
    const testPostId = require('uuid').v4();
    const testPost = {
      id: testPostId,
      user_id: 'test-user-id',
      app_name: 'Test App',
      description: 'This is a test app created by the MongoDB tester script',
      test_price: 0,
      max_testers: 5,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    console.log('🔄 Testing insert operation...');
    await db.insert('TestPost', testPost);
    console.log('✅ Insert operation successful');
    
    console.log('🔄 Testing get operation...');
    const retrievedPost = await db.get('TestPost', { id: testPostId });
    console.log('✅ Get operation successful');
    console.log('📄 Retrieved test post:', retrievedPost);
    
    console.log('🔄 Testing close operation...');
    await db.close();
    console.log('✅ MongoDB connection closed successfully');
    
    console.log('✅ All MongoDB tests passed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
    process.exit(1);
  }
}

// Run the test
testMongoDB();
