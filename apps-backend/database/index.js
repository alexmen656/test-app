/**
 * Database module that provides a shared database instance across the application
 */
require('dotenv').config();

// Determine which database adapter to use based on environment
let Database;
const isVercel = process.env.VERCEL === 'true' || process.env.VERCEL === '1' || 
    process.env.NEXT_PUBLIC_VERCEL_ENV || 
    (process.env.NODE_ENV === 'production' && process.cwd().includes('/var/task'));

console.log('Environment check:', {
  VERCEL: process.env.VERCEL,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
  IS_VERCEL_DETECTED: isVercel,
  CWD: process.cwd()
});

if (isVercel) {
  // On Vercel, ensure MongoDB is used
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is required when running on Vercel');
    throw new Error('MONGODB_URI is required in Vercel environment');
  }
  
  Database = require('./mongo-db');
  console.log('🚀 Running on Vercel - using MongoDB');
} 
// For other environments, check if MongoDB URI is available
else if (process.env.MONGODB_URI) {
  console.log('📊 MongoDB connection string found - using MongoDB');
  Database = require('./mongo-db');
} 
// Fall back to SQLite if not on Vercel and no MongoDB URI
else {
  console.log('📊 No MongoDB connection string - falling back to SQLite');
  console.log('⚠️ Note: SQLite will not work in serverless environments like Vercel');
  Database = require('./db');
}

// Create a singleton instance
const db = new Database();

// Initialize the database to ensure methods are available
(async () => {
  try {
    await db.initialize();
    
    // Check that MongoDB methods are available
    if (process.env.MONGODB_URI) {
      const methods = ['findOne', 'find', 'insert', 'update', 'delete', 'count'];
      methods.forEach(method => {
        if (typeof db[method] !== 'function') {
          console.error(`❌ MongoDB method "${method}" is not available!`);
        } else {
          console.log(`✅ MongoDB method "${method}" is available`);
        }
      });
    }
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
})();

// Export the database instance
module.exports = db;
