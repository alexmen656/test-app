const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, 'betabay_apps.db');
    this.db = null;
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('📁 Connected to SQLite database');
          this.createTables().then(resolve).catch(reject);
        }
      });
    });
  }

  async createTables() {
    const schemas = [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        slack_user_id TEXT UNIQUE NOT NULL,
        username TEXT NOT NULL,
        display_name TEXT,
        email TEXT,
        avatar_url TEXT,
        slack_profile_link TEXT,
        owned_coins INTEGER DEFAULT 100,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT 1
      )`,

      // Test Posts table
      `CREATE TABLE IF NOT EXISTS test_posts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        app_name TEXT NOT NULL,
        description TEXT NOT NULL,
        testing_link TEXT,
        test_price INTEGER NOT NULL DEFAULT 0,
        instructions TEXT,
        youtube_link TEXT,
        google_group_link TEXT,
        icon_url TEXT,
        status TEXT DEFAULT 'active' CHECK(status IN ('active', 'paused', 'completed', 'cancelled')),
        max_testers INTEGER DEFAULT 10,
        current_testers INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,

      // Screenshots table (linked to test posts)
      `CREATE TABLE IF NOT EXISTS screenshots (
        id TEXT PRIMARY KEY,
        test_post_id TEXT NOT NULL,
        image_url TEXT NOT NULL,
        caption TEXT,
        display_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (test_post_id) REFERENCES test_posts (id) ON DELETE CASCADE
      )`,

      // Test Post Participants (many-to-many between users and test posts)
      `CREATE TABLE IF NOT EXISTS test_participants (
        id TEXT PRIMARY KEY,
        test_post_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'testing' CHECK(status IN ('testing', 'completed', 'dropped')),
        completion_date DATETIME,
        FOREIGN KEY (test_post_id) REFERENCES test_posts (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE(test_post_id, user_id)
      )`,

      // Reviews table
      `CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        test_post_id TEXT NOT NULL,
        reviewer_user_id TEXT NOT NULL,
        review_score INTEGER NOT NULL CHECK(review_score >= 1 AND review_score <= 5),
        comment TEXT,
        is_featured BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (test_post_id) REFERENCES test_posts (id) ON DELETE CASCADE,
        FOREIGN KEY (reviewer_user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE(test_post_id, reviewer_user_id)
      )`,

      // Coin Transactions table
      `CREATE TABLE IF NOT EXISTS coin_transactions (
        id TEXT PRIMARY KEY,
        sender_user_id TEXT,
        receiver_user_id TEXT NOT NULL,
        amount INTEGER NOT NULL,
        transaction_type TEXT NOT NULL CHECK(transaction_type IN ('reward', 'payment', 'refund', 'bonus', 'penalty')),
        reference_type TEXT CHECK(reference_type IN ('test_post', 'review', 'signup_bonus', 'admin')),
        reference_id TEXT,
        description TEXT,
        status TEXT DEFAULT 'completed' CHECK(status IN ('pending', 'completed', 'failed', 'cancelled')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_user_id) REFERENCES users (id) ON DELETE SET NULL,
        FOREIGN KEY (receiver_user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,

      // Notifications table
      `CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'info' CHECK(type IN ('info', 'success', 'warning', 'error')),
        reference_type TEXT,
        reference_id TEXT,
        is_read BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`
    ];

    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_users_slack_id ON users(slack_user_id)',
      'CREATE INDEX IF NOT EXISTS idx_test_posts_user_id ON test_posts(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_test_posts_status ON test_posts(status)',
      'CREATE INDEX IF NOT EXISTS idx_test_posts_created_at ON test_posts(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_reviews_test_post_id ON reviews(test_post_id)',
      'CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_user_id)',
      'CREATE INDEX IF NOT EXISTS idx_coin_transactions_receiver ON coin_transactions(receiver_user_id)',
      'CREATE INDEX IF NOT EXISTS idx_coin_transactions_sender ON coin_transactions(sender_user_id)',
      'CREATE INDEX IF NOT EXISTS idx_coin_transactions_created_at ON coin_transactions(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read)'
    ];

    // Execute all table creation queries
    for (const schema of schemas) {
      await this.run(schema);
    }

    // Create indexes
    for (const index of indexes) {
      await this.run(index);
    }

    console.log('✅ All database tables and indexes created successfully');
  }

  // Helper method to run SQL queries with Promise
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  // Helper method to get a single row
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Helper method to get multiple rows
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Close database connection
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('📁 Database connection closed');
          resolve();
        }
      });
    });
  }
}

module.exports = Database;
