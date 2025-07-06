/**
 * Simple test script to verify coins.js MongoDB integration
 * This script tests the core functionality without needing a running server
 */

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

// Import the database and coins module
const db = require('../database');
const { awardCoins } = require('../routes/coins');

const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

// Test data
const testUser = {
  id: uuidv4(),
  slack_user_id: 'U_TEST_123',
  username: 'testuser_mongo',
  display_name: 'MongoDB Test User',
  email: 'test@mongo.local',
  avatar_url: null,
  owned_coins: 100,
  is_active: true,
  created_at: new Date(),
  updated_at: new Date()
};

async function setupTestEnvironment() {
  console.log('🔧 Setting up test environment...');
  
  try {
    // Initialize database
    await db.initialize();
    console.log('✅ Database initialized');
    
    // Create test user
    await db.insert('users', testUser);
    console.log('✅ Test user created');
    
    return true;
  } catch (error) {
    if (error.message.includes('duplicate')) {
      console.log('ℹ️ Test user already exists, continuing...');
      return true;
    }
    console.error('❌ Setup failed:', error);
    return false;
  }
}

async function testMongoDBOperations() {
  console.log('\n🧪 Testing MongoDB operations...');
  
  try {
    // Test findOne
    const user = await db.findOne('users', { id: testUser.id });
    if (user) {
      console.log('✅ findOne works - User found:', user.username);
    } else {
      console.log('❌ findOne failed - User not found');
      return false;
    }
    
    // Test update with $inc
    await db.update('users', 
      { id: testUser.id }, 
      { $inc: { owned_coins: 50 } }
    );
    console.log('✅ $inc update works');
    
    // Verify update
    const updatedUser = await db.findOne('users', { id: testUser.id });
    if (updatedUser.owned_coins === 150) {
      console.log('✅ Coin balance updated correctly:', updatedUser.owned_coins);
    } else {
      console.log('❌ Coin balance update failed. Expected: 150, Got:', updatedUser.owned_coins);
    }
    
    // Test insert transaction
    const transactionId = uuidv4();
    await db.insert('coin_transactions', {
      id: transactionId,
      receiver_user_id: testUser.id,
      amount: 50,
      transaction_type: 'bonus',
      reference_type: 'test',
      description: 'MongoDB test transaction',
      status: 'completed',
      created_at: new Date()
    });
    console.log('✅ Transaction insert works');
    
    // Test find transactions
    const transactions = await db.find('coin_transactions', {
      receiver_user_id: testUser.id
    });
    console.log(`✅ Found ${transactions.length} transactions for user`);
    
    // Test count
    const transactionCount = await db.count('coin_transactions', {
      receiver_user_id: testUser.id
    });
    console.log(`✅ Count works: ${transactionCount} transactions`);
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB operations test failed:', error);
    return false;
  }
}

async function testAwardCoinsFunction() {
  console.log('\n🧪 Testing awardCoins function...');
  
  try {
    const result = await awardCoins(
      testUser.id,
      25,
      'reward',
      'test_completion',
      'test_123',
      'Test reward for MongoDB testing'
    );
    
    if (result.success) {
      console.log('✅ awardCoins function works');
      console.log('📊 Transaction ID:', result.transactionId);
      
      // Verify the coins were added
      const user = await db.findOne('users', { id: testUser.id });
      console.log('📊 User balance after award:', user.owned_coins);
      
      // Verify transaction was recorded
      const transaction = await db.findOne('coin_transactions', { id: result.transactionId });
      if (transaction) {
        console.log('✅ Transaction recorded correctly');
      } else {
        console.log('❌ Transaction not found in database');
      }
      
      // Verify notification was created
      const notification = await db.findOne('notifications', { 
        reference_id: result.transactionId 
      });
      if (notification) {
        console.log('✅ Notification created correctly');
      } else {
        console.log('❌ Notification not found in database');
      }
      
    } else {
      console.log('❌ awardCoins function failed:', result.error);
    }
    
    return result.success;
  } catch (error) {
    console.error('❌ awardCoins test failed:', error);
    return false;
  }
}

async function testComplexQueries() {
  console.log('\n🧪 Testing complex MongoDB queries...');
  
  try {
    // Test $or query (like in transactions endpoint)
    const userTransactions = await db.find('coin_transactions', {
      $or: [
        { sender_user_id: testUser.id },
        { receiver_user_id: testUser.id }
      ]
    });
    console.log(`✅ $or query works: Found ${userTransactions.length} transactions`);
    
    // Test sorting and limiting
    const recentTransactions = await db.find('coin_transactions', {
      receiver_user_id: testUser.id
    }, {
      sort: { created_at: -1 },
      limit: 2
    });
    console.log(`✅ Sort and limit works: Found ${recentTransactions.length} recent transactions`);
    
    // Test transaction type filtering
    const rewardTransactions = await db.find('coin_transactions', {
      receiver_user_id: testUser.id,
      transaction_type: 'reward'
    });
    console.log(`✅ Type filtering works: Found ${rewardTransactions.length} reward transactions`);
    
    return true;
  } catch (error) {
    console.error('❌ Complex queries test failed:', error);
    return false;
  }
}

async function testJWTTokenGeneration() {
  console.log('\n🧪 Testing JWT token generation...');
  
  try {
    const payload = {
      slack_user_id: testUser.slack_user_id,
      username: testUser.username,
      display_name: testUser.display_name,
      email: testUser.email,
      profile_image: testUser.avatar_url,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    };
    
    const token = jwt.sign(payload, JWT_SECRET);
    console.log('✅ JWT token generated');
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.slack_user_id === testUser.slack_user_id) {
      console.log('✅ JWT token verification works');
    } else {
      console.log('❌ JWT token verification failed');
    }
    
    console.log('📊 Sample token (first 50 chars):', token.substring(0, 50) + '...');
    
    return true;
  } catch (error) {
    console.error('❌ JWT test failed:', error);
    return false;
  }
}

async function cleanupTestData() {
  console.log('\n🧹 Cleaning up test data...');
  
  try {
    // Delete test transactions
    await db.delete('coin_transactions', { receiver_user_id: testUser.id });
    console.log('✅ Test transactions deleted');
    
    // Delete test notifications
    await db.delete('notifications', { user_id: testUser.id });
    console.log('✅ Test notifications deleted');
    
    // Delete test user
    await db.delete('users', { id: testUser.id });
    console.log('✅ Test user deleted');
    
  } catch (error) {
    console.error('⚠️ Cleanup failed (this is usually okay):', error.message);
  }
}

async function runMongoDBTests() {
  console.log('🚀 Starting MongoDB Coins Integration Tests...');
  console.log('📊 Test User ID:', testUser.id);
  console.log('📊 Database Type:', process.env.MONGODB_URI ? 'MongoDB' : 'SQLite (fallback)');
  
  let allTestsPassed = true;
  
  try {
    // Setup
    const setupSuccess = await setupTestEnvironment();
    if (!setupSuccess) {
      console.log('❌ Setup failed, aborting tests');
      return;
    }
    
    // Run tests
    const mongoSuccess = await testMongoDBOperations();
    const awardSuccess = await testAwardCoinsFunction();
    const querySuccess = await testComplexQueries();
    const jwtSuccess = await testJWTTokenGeneration();
    
    allTestsPassed = mongoSuccess && awardSuccess && querySuccess && jwtSuccess;
    
    // Cleanup
    await cleanupTestData();
    
    if (allTestsPassed) {
      console.log('\n✅ All MongoDB integration tests passed! 🎉');
    } else {
      console.log('\n❌ Some tests failed. Check the output above for details.');
    }
    
  } catch (error) {
    console.error('💥 Test execution failed:', error);
    allTestsPassed = false;
  } finally {
    // Close database connection
    try {
      await db.close();
      console.log('📁 Database connection closed');
    } catch (error) {
      console.error('⚠️ Error closing database:', error.message);
    }
  }
  
  process.exit(allTestsPassed ? 0 : 1);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runMongoDBTests();
}

module.exports = {
  runMongoDBTests,
  testMongoDBOperations,
  testAwardCoinsFunction,
  testComplexQueries,
  testJWTTokenGeneration,
  testUser
};
