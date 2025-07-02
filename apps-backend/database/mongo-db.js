const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

// MongoDB connection URI - should be set in environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri-here'; 

// Mongoose Schema Definitions
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  slack_user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  display_name: String,
  email: String,
  avatar_url: String,
  slack_profile_link: String,
  owned_coins: { type: Number, default: 100 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  last_login: Date,
  is_active: { type: Boolean, default: true }
});

const testPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  user_id: { type: String, required: true, ref: 'User' },
  app_name: { type: String, required: true },
  description: { type: String, required: true },
  testing_link: String,
  test_price: { type: Number, required: true, default: 0 },
  instructions: String,
  youtube_link: String,
  google_group_link: String,
  icon_url: String,
  status: { 
    type: String, 
    default: 'active', 
    enum: ['active', 'paused', 'completed', 'cancelled'] 
  },
  max_testers: { type: Number, default: 10 },
  current_testers: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  expires_at: Date
});

const screenshotSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  test_post_id: { type: String, required: true, ref: 'TestPost' },
  image_url: { type: String, required: true },
  caption: String,
  display_order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const testParticipantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  test_post_id: { type: String, required: true, ref: 'TestPost' },
  user_id: { type: String, required: true, ref: 'User' },
  joined_at: { type: Date, default: Date.now },
  status: { 
    type: String, 
    default: 'testing',
    enum: ['testing', 'completed', 'dropped'] 
  },
  completion_date: Date
});

// Add compound unique index
testParticipantSchema.index({ test_post_id: 1, user_id: 1 }, { unique: true });

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  test_post_id: { type: String, required: true, ref: 'TestPost' },
  reviewer_user_id: { type: String, required: true, ref: 'User' },
  review_score: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  is_featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Add compound unique index
reviewSchema.index({ test_post_id: 1, reviewer_user_id: 1 }, { unique: true });

const coinTransactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  sender_user_id: { type: String, ref: 'User' },
  receiver_user_id: { type: String, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  transaction_type: { 
    type: String, 
    required: true,
    enum: ['reward', 'payment', 'refund', 'bonus', 'penalty']
  },
  reference_type: { 
    type: String,
    enum: ['test_post', 'review', 'signup_bonus', 'admin']
  },
  reference_id: String,
  description: String,
  status: { 
    type: String, 
    default: 'completed',
    enum: ['pending', 'completed', 'failed', 'cancelled']
  },
  created_at: { type: Date, default: Date.now }
});

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: () => uuidv4() },
  user_id: { type: String, required: true, ref: 'User' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    default: 'info',
    enum: ['info', 'success', 'warning', 'error']
  },
  reference_type: String,
  reference_id: String,
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// Create the models
const User = mongoose.model('User', userSchema);
const TestPost = mongoose.model('TestPost', testPostSchema);
const Screenshot = mongoose.model('Screenshot', screenshotSchema);
const TestParticipant = mongoose.model('TestParticipant', testParticipantSchema);
const Review = mongoose.model('Review', reviewSchema);
const CoinTransaction = mongoose.model('CoinTransaction', coinTransactionSchema);
const Notification = mongoose.model('Notification', notificationSchema);

class MongoDatabase {
  constructor() {
    this.models = {
      User,
      TestPost,
      Screenshot,
      TestParticipant,
      Review,
      CoinTransaction,
      Notification
    };
    this.isConnected = false;
    this.client = null;
  }

  async initialize() {
    if (this.isConnected) return;

    try {
      console.log('🔄 Connecting to MongoDB...');
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      // Create a raw MongoDB client for health checks and direct operations
      this.client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await this.client.connect();
      
      this.isConnected = true;
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  // Methods to match SQLite interface for compatibility

  async run(sql, params = []) {
    // This is a compatibility method that doesn't do anything in MongoDB
    // It's here to avoid having to change existing code
    console.warn('⚠️ run() method called in MongoDB adapter - this is a no-op');
    return { id: null, changes: 0 };
  }

  async get(collection, query) {
    await this.initialize();
    
    try {
      // If this is a raw SQL query (from existing code), parse it to extract collection and query
      if (typeof collection === 'string' && collection.trim().toUpperCase().startsWith('SELECT')) {
        const parsedQuery = this._parseSqlToMongoQuery(collection, query);
        if (!parsedQuery) {
          throw new Error('Unable to parse SQL query: ' + collection);
        }
        
        collection = parsedQuery.collection;
        query = parsedQuery.query;
      }
      
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Execute the query
      const result = await Model.findOne(query).lean();
      return result;
    } catch (error) {
      console.error(`❌ MongoDB get error:`, error);
      throw error;
    }
  }

  async all(collection, query) {
    await this.initialize();
    
    try {
      // If this is a raw SQL query (from existing code), parse it to extract collection and query
      if (typeof collection === 'string' && collection.trim().toUpperCase().startsWith('SELECT')) {
        const parsedQuery = this._parseSqlToMongoQuery(collection, query);
        if (!parsedQuery) {
          throw new Error('Unable to parse SQL query: ' + collection);
        }
        
        collection = parsedQuery.collection;
        query = parsedQuery.query;
        
        // Check for joins and handle them
        if (parsedQuery.joins && parsedQuery.joins.length > 0) {
          return this._handleJoinQuery(parsedQuery);
        }
      }
      
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Execute the query
      let queryBuilder = Model.find(query);
      
      // Add sorting if specified
      if (query && query.$sort) {
        queryBuilder = queryBuilder.sort(query.$sort);
        delete query.$sort;
      }
      
      // Add limit and skip if specified
      if (query && query.$limit) {
        queryBuilder = queryBuilder.limit(query.$limit);
        delete query.$limit;
      }
      
      if (query && query.$skip) {
        queryBuilder = queryBuilder.skip(query.$skip);
        delete query.$skip;
      }
      
      const results = await queryBuilder.lean();
      return results;
    } catch (error) {
      console.error(`❌ MongoDB all error:`, error);
      throw error;
    }
  }

  async insert(collection, document) {
    await this.initialize();
    
    try {
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Ensure document has an ID
      if (!document.id) {
        document.id = uuidv4();
      }
      
      // Create and save the document
      const newDocument = new Model(document);
      await newDocument.save();
      
      return { id: document.id, changes: 1 };
    } catch (error) {
      console.error(`❌ MongoDB insert error:`, error);
      throw error;
    }
  }

  async update(collection, query, update) {
    await this.initialize();
    
    try {
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Check if update contains MongoDB operators like $set
      const hasMongoDBO = Object.keys(update).some(key => key.startsWith('$'));
      
      // Update the document
      const updateObj = hasMongoDBO ? update : { $set: update };
      const result = await Model.updateOne(query, updateObj);
      
      return { id: null, changes: result.modifiedCount };
    } catch (error) {
      console.error(`❌ MongoDB update error:`, error);
      throw error;
    }
  }

  async delete(collection, query) {
    await this.initialize();
    
    try {
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Delete the document
      const result = await Model.deleteOne(query);
      
      return { id: null, changes: result.deletedCount };
    } catch (error) {
      console.error(`❌ MongoDB delete error:`, error);
      throw error;
    }
  }

  async close() {
    if (this.client) {
      try {
        await this.client.close();
        console.log('📁 MongoDB client connection closed');
      } catch (error) {
        console.error('❌ Error closing MongoDB client:', error);
      }
    }
    
    if (this.isConnected) {
      try {
        await mongoose.connection.close();
        this.isConnected = false;
        console.log('📁 MongoDB connection closed');
      } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
      }
    }
  }

  // Helper methods

  _getModelForCollection(collection) {
    // Convert collection name to model name
    let modelName;
    
    // Handle raw collection names
    if (collection === 'users') modelName = 'User';
    else if (collection === 'test_posts') modelName = 'TestPost';
    else if (collection === 'screenshots') modelName = 'Screenshot';
    else if (collection === 'test_participants') modelName = 'TestParticipant';
    else if (collection === 'reviews') modelName = 'Review';
    else if (collection === 'coin_transactions') modelName = 'CoinTransaction';
    else if (collection === 'notifications') modelName = 'Notification';
    else modelName = collection; // Assume it's already the model name
    
    const Model = this.models[modelName];
    if (!Model) {
      throw new Error(`Unknown collection or model: ${collection}`);
    }
    
    return Model;
  }

  _parseSqlToMongoQuery(sql, params = []) {
    // This is a very simplified SQL parser for common queries
    // In a real app, you'd want a more robust SQL parser
    
    sql = sql.trim();
    
    // Extract the collection name (table name in SQL)
    const fromMatch = sql.match(/FROM\s+([^\s,]+)/i);
    if (!fromMatch) return null;
    
    const collection = fromMatch[1];
    let query = {};
    
    // Extract WHERE conditions
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:ORDER BY|GROUP BY|LIMIT|$)/i);
    if (whereMatch) {
      const whereClause = whereMatch[1].trim();
      
      // Handle simple conditions (this is very basic)
      const conditions = whereClause.split(/\s+AND\s+/i);
      
      conditions.forEach((condition, index) => {
        // Simple equality condition: col = ?
        const equalityMatch = condition.match(/([^\s]+)\s*=\s*\?/);
        if (equalityMatch) {
          const field = equalityMatch[1];
          query[field] = params[index];
        }
        
        // Simple LIKE condition: col LIKE ?
        const likeMatch = condition.match(/([^\s]+)\s+LIKE\s+\?/i);
        if (likeMatch) {
          const field = likeMatch[1];
          const value = params[index];
          
          // Convert SQL LIKE to MongoDB regex
          if (typeof value === 'string') {
            const escapedValue = value
              .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
              .replace(/%/g, '.*');
            
            query[field] = new RegExp(`^${escapedValue}$`, 'i');
          }
        }
      });
    }
    
    // Extract ORDER BY
    const orderByMatch = sql.match(/ORDER BY\s+(.+?)(?:LIMIT|$)/i);
    if (orderByMatch) {
      const orderByClause = orderByMatch[1].trim();
      const sort = {};
      
      orderByClause.split(',').forEach(part => {
        const [field, direction] = part.trim().split(/\s+/);
        sort[field] = direction.toUpperCase() === 'DESC' ? -1 : 1;
      });
      
      query.$sort = sort;
    }
    
    // Extract LIMIT and OFFSET
    const limitMatch = sql.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
    if (limitMatch) {
      query.$limit = parseInt(limitMatch[1]);
      if (limitMatch[2]) {
        query.$skip = parseInt(limitMatch[2]);
      }
    }
    
    // Check for JOIN statements
    const joins = [];
    const joinRegex = /LEFT JOIN\s+([^\s]+)\s+ON\s+(.+?)(?:LEFT JOIN|WHERE|ORDER BY|GROUP BY|LIMIT|$)/gi;
    let joinMatch;
    
    while ((joinMatch = joinRegex.exec(sql)) !== null) {
      joins.push({
        collection: joinMatch[1],
        condition: joinMatch[2].trim()
      });
    }
    
    return {
      collection,
      query,
      joins: joins.length > 0 ? joins : null
    };
  }

  async _handleJoinQuery(parsedQuery) {
    // This is a simplified implementation for handling joins
    // It will need to be expanded for more complex queries
    
    // Get the base data
    const baseModel = this._getModelForCollection(parsedQuery.collection);
    const baseResults = await baseModel.find(parsedQuery.query).lean();
    
    // If no results or no joins, return early
    if (!baseResults.length || !parsedQuery.joins) return baseResults;
    
    // Process each join
    for (const join of parsedQuery.joins) {
      const joinModel = this._getModelForCollection(join.collection);
      
      // Extract the join conditions
      // This is very simplified - assumes format like "base.field = join.field"
      const conditionMatch = join.condition.match(/([^.]+)\.([^=\s]+)\s*=\s*([^.]+)\.([^=\s]+)/);
      
      if (conditionMatch) {
        const [, baseTableAlias, baseField, joinTableAlias, joinField] = conditionMatch;
        
        // For each base result, find matching join results
        for (const baseResult of baseResults) {
          const joinQuery = {};
          joinQuery[joinField] = baseResult[baseField];
          
          const joinResults = await joinModel.find(joinQuery).lean();
          
          // Add join results to base result
          // Using the join table name as the property name
          baseResult[join.collection] = joinResults;
        }
      }
    }
    
    return baseResults;
  }

  // Method to create tables - not needed in MongoDB but kept for compatibility
  async createTables() {
    // No-op in MongoDB as collections are created automatically
    console.log('✅ MongoDB collections will be created automatically as needed');
    return true;
  }

  async find(collection, query, options = {}) {
    await this.initialize();
    
    try {
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Process options
      const findOptions = {};
      if (options.sort) findOptions.sort = options.sort;
      if (options.limit) findOptions.limit = options.limit;
      if (options.skip) findOptions.skip = options.skip;
      
      // Execute the query
      const results = await Model.find(query, null, findOptions).lean();
      return results;
    } catch (error) {
      console.error(`❌ MongoDB find error:`, error);
      throw error;
    }
  }

  async findOne(collection, query) {
    await this.initialize();
    
    try {
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Execute the query
      const result = await Model.findOne(query).lean();
      return result;
    } catch (error) {
      console.error(`❌ MongoDB findOne error:`, error);
      throw error;
    }
  }

  async count(collection, query) {
    await this.initialize();
    
    try {
      // Get the appropriate model
      const Model = this._getModelForCollection(collection);
      
      // Count documents matching the query
      const count = await Model.countDocuments(query);
      return count;
    } catch (error) {
      console.error(`❌ MongoDB count error:`, error);
      throw error;
    }
  }
}

module.exports = MongoDatabase;
