require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

// Check MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not set');
  console.log('Please set your MongoDB connection string in the .env file');
  process.exit(1);
}

// Log start of test
console.log('=== MongoDB Vercel Compatibility Test ===');
console.log('Testing MongoDB URI:', process.env.MONGODB_URI.substring(0, 25) + '...');

async function runTests() {
  let client;
  let mongooseConn;
  
  try {
    // Test mongoose connection
    console.log('\n1. Testing mongoose connection...');
    mongooseConn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Mongoose connected to MongoDB successfully');
    
    // Test direct MongoDB connection
    console.log('\n2. Testing direct MongoDB connection with MongoClient...');
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    console.log('✅ MongoClient connected to MongoDB successfully');
    
    // Test ping command
    console.log('\n3. Testing MongoDB ping command...');
    const pingResult = await client.db().command({ ping: 1 });
    console.log('✅ Ping result:', pingResult);
    
    // Test document creation
    console.log('\n4. Testing document creation...');
    const testCollection = client.db().collection('vercel_tests');
    
    const testDoc = {
      id: uuidv4(),
      name: 'Vercel Test',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date(),
      random: Math.random()
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Document inserted:', insertResult.acknowledged);
    
    // Test document retrieval
    console.log('\n5. Testing document retrieval...');
    const retrievedDoc = await testCollection.findOne({ id: testDoc.id });
    console.log('✅ Document retrieved:', retrievedDoc ? 'success' : 'not found');
    if (retrievedDoc) {
      console.log('   Document ID:', retrievedDoc.id);
      console.log('   Document timestamp:', retrievedDoc.timestamp);
    }
    
    // Test document update
    console.log('\n6. Testing document update...');
    const updateResult = await testCollection.updateOne(
      { id: testDoc.id },
      { $set: { updated: true, update_time: new Date() } }
    );
    console.log('✅ Document updated:', updateResult.modifiedCount > 0);
    
    // Test document deletion
    console.log('\n7. Testing document deletion...');
    const deleteResult = await testCollection.deleteOne({ id: testDoc.id });
    console.log('✅ Document deleted:', deleteResult.deletedCount > 0);
    
    console.log('\n=== All MongoDB tests completed successfully! ===');
    console.log('✅ Your MongoDB connection is working properly');
    console.log('✅ This configuration should work on Vercel');
    
  } catch (error) {
    console.error('\n❌ MongoDB test failed:', error);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your MongoDB connection string in the .env file');
    console.log('2. Ensure your IP address is whitelisted in MongoDB Atlas');
    console.log('3. Check your database user credentials');
    console.log('4. Make sure your MongoDB cluster is running');
  } finally {
    if (mongooseConn) {
      await mongoose.disconnect();
      console.log('Mongoose connection closed');
    }
    if (client) {
      await client.close();
      console.log('MongoClient connection closed');
    }
    process.exit(0);
  }
}

runTests();
