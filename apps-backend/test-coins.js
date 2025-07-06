const axios = require('axios');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Test configuration
const BASE_URL = 'http://localhost:3001'; // Adjust port as needed
const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

// Test users data
const testUsers = [
  {
    slack_user_id: 'U123456789',
    username: 'testuser1',
    display_name: 'Test User 1',
    email: 'testuser1@test.com',
    profile_image: 'https://example.com/avatar1.jpg'
  },
  {
    slack_user_id: 'U987654321',
    username: 'testuser2', 
    display_name: 'Test User 2',
    email: 'testuser2@test.com',
    profile_image: 'https://example.com/avatar2.jpg'
  }
];

// Helper function to generate JWT token
function generateTestToken(userData) {
  const payload = {
    slack_user_id: userData.slack_user_id,
    username: userData.username,
    display_name: userData.display_name,
    email: userData.email,
    profile_image: userData.profile_image,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  return jwt.sign(payload, JWT_SECRET);
}

// Helper function to make authenticated requests
async function makeRequest(method, endpoint, data = null, userIndex = 0) {
  const token = generateTestToken(testUsers[userIndex]);
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    config.data = data;
  }
  
  try {
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
}

// Test functions
async function testGetBalance() {
  console.log('\n🧪 Testing GET /api/coins/balance...');
  
  const result = await makeRequest('GET', '/api/coins/balance');
  
  if (result.success) {
    console.log('✅ Balance test passed');
    console.log('📊 Balance data:', JSON.stringify(result.data, null, 2));
    return result.data.balance;
  } else {
    console.log('❌ Balance test failed:', result.error);
    return null;
  }
}

async function testGetTransactions() {
  console.log('\n🧪 Testing GET /api/coins/transactions...');
  
  // Test basic transaction retrieval
  const result = await makeRequest('GET', '/api/coins/transactions?page=1&limit=10');
  
  if (result.success) {
    console.log('✅ Transactions test passed');
    console.log('📊 Transactions data:', JSON.stringify(result.data, null, 2));
  } else {
    console.log('❌ Transactions test failed:', result.error);
  }
  
  // Test with type filter
  const rewardResult = await makeRequest('GET', '/api/coins/transactions?type=reward');
  
  if (rewardResult.success) {
    console.log('✅ Reward transactions filter test passed');
    console.log('📊 Reward transactions count:', rewardResult.data.transactions.length);
  } else {
    console.log('❌ Reward transactions filter test failed:', rewardResult.error);
  }
}

async function testTransferCoins() {
  console.log('\n🧪 Testing POST /api/coins/transfer...');
  
  // Test valid transfer
  const transferData = {
    recipient_username: testUsers[1].username,
    amount: 50,
    description: 'Test transfer from user 1 to user 2'
  };
  
  const result = await makeRequest('POST', '/api/coins/transfer', transferData, 0);
  
  if (result.success) {
    console.log('✅ Transfer test passed');
    console.log('📊 Transfer data:', JSON.stringify(result.data, null, 2));
  } else {
    console.log('❌ Transfer test failed:', result.error);
  }
  
  // Test invalid transfer (insufficient funds)
  const invalidTransfer = {
    recipient_username: testUsers[1].username,
    amount: 10000,
    description: 'This should fail - too much money'
  };
  
  const invalidResult = await makeRequest('POST', '/api/coins/transfer', invalidTransfer, 0);
  
  if (!invalidResult.success && invalidResult.status === 400) {
    console.log('✅ Invalid transfer test passed (correctly rejected)');
  } else {
    console.log('❌ Invalid transfer test failed - should have been rejected');
  }
  
  // Test transfer to non-existent user
  const nonExistentTransfer = {
    recipient_username: 'nonexistentuser123',
    amount: 10,
    description: 'This should fail - user does not exist'
  };
  
  const nonExistentResult = await makeRequest('POST', '/api/coins/transfer', nonExistentTransfer, 0);
  
  if (!nonExistentResult.success && nonExistentResult.status === 404) {
    console.log('✅ Non-existent user transfer test passed (correctly rejected)');
  } else {
    console.log('❌ Non-existent user transfer test failed - should have been rejected');
  }
  
  // Test self-transfer
  const selfTransfer = {
    recipient_username: testUsers[0].username,
    amount: 10,
    description: 'This should fail - transferring to self'
  };
  
  const selfResult = await makeRequest('POST', '/api/coins/transfer', selfTransfer, 0);
  
  if (!selfResult.success && selfResult.status === 400) {
    console.log('✅ Self-transfer test passed (correctly rejected)');
  } else {
    console.log('❌ Self-transfer test failed - should have been rejected');
  }
}

async function testGetStats() {
  console.log('\n🧪 Testing GET /api/coins/stats...');
  
  const result = await makeRequest('GET', '/api/coins/stats');
  
  if (result.success) {
    console.log('✅ Stats test passed');
    console.log('📊 Stats data:', JSON.stringify(result.data, null, 2));
  } else {
    console.log('❌ Stats test failed:', result.error);
  }
}

async function testAuthentication() {
  console.log('\n🧪 Testing authentication...');
  
  // Test without token
  try {
    const response = await axios.get(`${BASE_URL}/api/coins/balance`);
    console.log('❌ No token test failed - should have been rejected');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ No token test passed (correctly rejected)');
    } else {
      console.log('❌ No token test failed with unexpected error:', error.message);
    }
  }
  
  // Test with invalid token
  try {
    const response = await axios.get(`${BASE_URL}/api/coins/balance`, {
      headers: {
        'Authorization': 'Bearer invalid-token-here'
      }
    });
    console.log('❌ Invalid token test failed - should have been rejected');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Invalid token test passed (correctly rejected)');
    } else {
      console.log('❌ Invalid token test failed with unexpected error:', error.message);
    }
  }
  
  // Test with expired token
  const expiredPayload = {
    slack_user_id: testUsers[0].slack_user_id,
    username: testUsers[0].username,
    display_name: testUsers[0].display_name,
    email: testUsers[0].email,
    profile_image: testUsers[0].profile_image,
    iat: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    exp: Math.floor(Date.now() / 1000) - 1800  // 30 minutes ago (expired)
  };
  
  const expiredToken = jwt.sign(expiredPayload, JWT_SECRET);
  
  try {
    const response = await axios.get(`${BASE_URL}/api/coins/balance`, {
      headers: {
        'Authorization': `Bearer ${expiredToken}`
      }
    });
    console.log('❌ Expired token test failed - should have been rejected');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Expired token test passed (correctly rejected)');
    } else {
      console.log('❌ Expired token test failed with unexpected error:', error.message);
    }
  }
}

async function testAwardCoins() {
  console.log('\n🧪 Testing awardCoins function (internal)...');
  
  // This would need to be tested by importing the function directly
  // or by creating an admin endpoint that uses it
  console.log('ℹ️ awardCoins function testing requires direct import or admin endpoint');
  console.log('ℹ️ This function is used internally by other parts of the system');
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Coins API Tests...');
  console.log('🏠 Base URL:', BASE_URL);
  console.log('👥 Test users:', testUsers.map(u => u.username).join(', '));
  
  try {
    // Test authentication first
    await testAuthentication();
    
    // Test balance endpoint
    const initialBalance = await testGetBalance();
    
    // Test transactions endpoint
    await testGetTransactions();
    
    // Test transfer functionality
    await testTransferCoins();
    
    // Check balance after transfer
    console.log('\n🧪 Checking balance after transfer...');
    await testGetBalance();
    
    // Test stats endpoint
    await testGetStats();
    
    // Test award coins function
    await testAwardCoins();
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('❌ Test runner error:', error);
  }
}

// Additional utility functions for specific testing scenarios
async function testHighVolumeTransactions(count = 10) {
  console.log(`\n🧪 Testing ${count} rapid transactions...`);
  
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(makeRequest('POST', '/api/coins/transfer', {
      recipient_username: testUsers[1].username,
      amount: 1,
      description: `Rapid test transfer #${i + 1}`
    }, 0));
  }
  
  const results = await Promise.all(promises);
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`📊 Rapid transactions: ${successful} successful, ${failed} failed`);
}

async function testPaginatedTransactions() {
  console.log('\n🧪 Testing paginated transaction retrieval...');
  
  // Test different page sizes
  const pageSizes = [5, 10, 20];
  
  for (const pageSize of pageSizes) {
    const result = await makeRequest('GET', `/api/coins/transactions?page=1&limit=${pageSize}`);
    
    if (result.success) {
      console.log(`✅ Page size ${pageSize}: ${result.data.transactions.length} transactions`);
      console.log(`📊 Pagination info:`, result.data.pagination);
    } else {
      console.log(`❌ Page size ${pageSize} test failed:`, result.error);
    }
  }
}

// Export test functions for individual testing
module.exports = {
  runAllTests,
  testGetBalance,
  testGetTransactions,
  testTransferCoins,
  testGetStats,
  testAuthentication,
  testHighVolumeTransactions,
  testPaginatedTransactions,
  makeRequest,
  generateTestToken,
  testUsers
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().then(() => {
    console.log('\n🏁 Test execution finished');
    process.exit(0);
  }).catch(error => {
    console.error('💥 Test execution failed:', error);
    process.exit(1);
  });
}
