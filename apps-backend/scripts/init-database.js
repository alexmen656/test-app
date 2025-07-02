#!/usr/bin/env node

/**
 * Database Initialization Script
 * Initializes the SQLite database with all required tables and indexes
 */

const Database = require('../database/db');
const path = require('path');
const fs = require('fs');

async function initDatabase() {
  console.log('🚀 Starting database initialization...');
  
  try {
    const db = new Database();
    await db.initialize();
    
    console.log('✅ Database initialization completed successfully!');
    console.log('📁 Database file location:', db.dbPath);
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('📂 Created uploads directory');
    }
    
    await db.close();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;
