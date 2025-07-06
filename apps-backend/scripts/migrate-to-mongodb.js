#!/usr/bin/env node

/**
 * SQLite to MongoDB Migration Script
 * 
 * This script migrates data from the SQLite database to MongoDB.
 * It reads all tables from SQLite and inserts the data into MongoDB.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const SqliteDB = require('../database/db');
const MongoDB = require('../database/mongo-db');

const WIPE_COLLECTIONS = true;

async function migrateData() {
  console.log('🚀 Starting migration from SQLite to MongoDB...');
  
  try {
    const sqliteDB = new SqliteDB();
    const mongoDB = new MongoDB();
    
    await sqliteDB.initialize();
    await mongoDB.initialize();
    
    console.log('✅ Both databases initialized');
    
    const tables = [
      'users',
      'test_posts',
      'screenshots',
      'test_participants',
      'reviews',
      'coin_transactions',
      'notifications'
    ];
    
    const tableToModelMap = {
      'users': 'User',
      'test_posts': 'TestPost',
      'screenshots': 'Screenshot',
      'test_participants': 'TestParticipant',
      'reviews': 'Review',
      'coin_transactions': 'CoinTransaction',
      'notifications': 'Notification'
    };
    
    if (WIPE_COLLECTIONS) {
      console.log('⚠️ Wiping MongoDB collections before migration...');
      
      for (const table of tables) {
        const model = mongoDB._getModelForCollection(tableToModelMap[table]);
        await model.deleteMany({});
        console.log(`🧹 Wiped ${tableToModelMap[table]} collection`);
      }
    }
    
    for (const table of tables) {
      console.log(`🔄 Migrating ${table}...`);
      
      const records = await sqliteDB.all(`SELECT * FROM ${table}`);
      
      if (records.length === 0) {
        console.log(`ℹ️ No records found in ${table}`);
        continue;
      }
      
      console.log(`📊 Found ${records.length} records in ${table}`);
      
      const dateFields = ['created_at', 'updated_at', 'last_login', 'expires_at', 
                         'joined_at', 'completion_date'];
      
      for (const record of records) {
        for (const field of dateFields) {
          if (record[field]) {
            record[field] = new Date(record[field]);
          }
        }
        
        await mongoDB.insert(tableToModelMap[table], record);
      }
      
      console.log(`✅ Migrated ${records.length} records from ${table} to ${tableToModelMap[table]}`);
    }
    
    console.log('✅ Migration completed successfully!');
    
    await sqliteDB.close();
    await mongoDB.close();
    
    console.log('📁 Database connections closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();