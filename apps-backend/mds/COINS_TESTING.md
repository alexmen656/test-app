# Coins System Testing

This directory contains comprehensive tests for the MongoDB-based coins system.

## Test Files

### 1. `test-coins-mongodb.js` 
**Direct MongoDB Integration Test**
- Tests MongoDB operations directly
- Tests the `awardCoins` function
- Tests JWT token generation and verification
- Tests complex MongoDB queries ($or, sorting, filtering)
- No server required - tests database layer directly

### 2. `test-coins.js`
**Full API Endpoint Test**
- Tests all REST API endpoints
- Tests authentication and authorization
- Tests error handling and edge cases
- Requires running server

## Running Tests

### Prerequisites
1. Make sure you have MongoDB connection string in your environment:
   ```bash
   export MONGODB_URI="your-mongodb-connection-string"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Quick Test Commands

```bash
# Test MongoDB integration only (no server required)
npm run test:coins-mongodb

# Test API endpoints (requires running server)
npm run test:coins

# Run all tests
npm run test:all
```

### Manual Test Execution

#### Test MongoDB Integration:
```bash
node test-coins-mongodb.js
```

#### Test API Endpoints:
1. Start the server:
   ```bash
   npm run dev
   ```

2. In another terminal, run the API tests:
   ```bash
   node test-coins.js
   ```

## Test Coverage

### MongoDB Integration Tests (`test-coins-mongodb.js`)
- ✅ Database connection and initialization
- ✅ User creation and retrieval (`findOne`)
- ✅ Coin balance updates (`$inc` operator)
- ✅ Transaction creation (`insert`)
- ✅ Transaction querying (`find` with filters)
- ✅ Document counting (`count`)
- ✅ Complex queries (`$or`, sorting, limiting)
- ✅ `awardCoins` function testing
- ✅ Notification creation
- ✅ JWT token generation and verification
- ✅ Cleanup operations

### API Endpoint Tests (`test-coins.js`)
- ✅ `GET /api/coins/balance` - Get user coin balance
- ✅ `GET /api/coins/transactions` - Get transaction history
- ✅ `GET /api/coins/transactions?type=reward` - Filter by transaction type
- ✅ `POST /api/coins/transfer` - Transfer coins between users
- ✅ `GET /api/coins/stats` - Get platform statistics
- ✅ Authentication testing (valid, invalid, expired tokens)
- ✅ Error handling (insufficient funds, non-existent users, self-transfer)
- ✅ Pagination testing
- ✅ High-volume transaction testing

## Test Users

The tests create temporary test users:
- **testuser1** (U123456789) - Primary test user
- **testuser2** (U987654321) - Secondary test user for transfers

## Expected Output

### Successful MongoDB Test:
```
🚀 Starting MongoDB Coins Integration Tests...
🔧 Setting up test environment...
✅ Database initialized
✅ Test user created
🧪 Testing MongoDB operations...
✅ findOne works - User found: testuser_mongo
✅ $inc update works
✅ Coin balance updated correctly: 150
✅ Transaction insert works
✅ Found 1 transactions for user
✅ Count works: 1 transactions
🧪 Testing awardCoins function...
✅ awardCoins function works
✅ All MongoDB integration tests passed! 🎉
```

### Successful API Test:
```
🚀 Starting Coins API Tests...
🧪 Testing authentication...
✅ No token test passed (correctly rejected)
✅ Invalid token test passed (correctly rejected)
✅ Expired token test passed (correctly rejected)
🧪 Testing GET /api/coins/balance...
✅ Balance test passed
🧪 Testing POST /api/coins/transfer...
✅ Transfer test passed
✅ Invalid transfer test passed (correctly rejected)
✅ All tests completed!
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```
   ❌ MongoDB connection error: MongoServerError
   ```
   - Check your `MONGODB_URI` environment variable
   - Ensure MongoDB server is running and accessible

2. **Authentication Errors**
   ```
   ❌ Authentication error: Invalid token
   ```
   - Check that `JWT_SECRET` matches between server and tests
   - Ensure server is running on the correct port

3. **Test User Creation Conflicts**
   ```
   ❌ Setup failed: duplicate key error
   ```
   - This is usually harmless - test continues with existing user
   - Cleanup function removes test data after tests

### Environment Variables

Create a `.env` file in the `apps-backend` directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/betabay
JWT_SECRET=betabay-secret-key-2024
PORT=3001
```

## Development Notes

### Adding New Tests
1. Add test functions to the appropriate test file
2. Update the main test runner to include new tests
3. Add documentation here

### MongoDB Query Testing
The tests verify that the coins system correctly uses:
- Mongoose models and schemas
- MongoDB operators (`$inc`, `$or`, `$set`)
- Sorting and pagination
- Atomic operations for coin transfers

### Performance Testing
Use the high-volume transaction test to check system performance:
```javascript
await testHighVolumeTransactions(50); // Test 50 rapid transfers
```

## Next Steps
- Add integration tests with other modules (reviews, test posts)
- Add load testing for concurrent users
- Add database transaction/rollback testing
- Add webhook/notification testing
