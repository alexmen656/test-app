const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Joi = require('joi');

// Import the shared database instance
const db = require('../database');

const router = express.Router();

// Validation schemas
const testPostSchema = Joi.object({
  user_id: Joi.string().optional(), // Allow user_id in the request body for testing
  app_name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  testing_link: Joi.string().uri().allow('').optional(),
  test_price: Joi.number().integer().min(0).max(1000).default(0),
  instructions: Joi.string().max(2000).allow('').optional(),
  youtube_link: Joi.string().uri().allow('').optional(),
  google_group_link: Joi.string().uri().allow('').optional(),
  max_testers: Joi.number().integer().min(1).max(100).default(10),
  expires_at: Joi.date().greater('now').optional()
});

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const userData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      if (userData.exp && userData.exp < Date.now()) {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      // Check if we're using MongoDB or SQLite
      let user;
      if (db.findOne) {
        // MongoDB approach
        user = await db.findOne('users', { id: userData.id });
      } else {
        // SQLite approach
        user = await db.get('SELECT * FROM users WHERE id = ?', [userData.id]);
      }
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      req.user = user;
      return next();
    }
    
    if (req.session.user) {
      // Check if we're using MongoDB or SQLite
      let user;
      if (db.findOne) {
        // MongoDB approach
        user = await db.findOne('users', { id: req.session.user.id });
      } else {
        // SQLite approach
        user = await db.get('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
      }
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      req.user = user;
      return next();
    }
    
    return res.status(401).json({ error: 'Authentication required' });
    
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return res.status(401).json({ error: 'Invalid authentication' });
  }
};

// Get all test posts (public)
router.get('/', async (req, res) => {
  try {
    // DB is pre-initialized in server.js
    
    const { page = 1, limit = 10, status = 'active', search } = req.query;
    const offset = (page - 1) * limit;
    
    let testPosts;
    let total = 0;
    
    if (db.find) {
      // MongoDB approach
      // Build query
      const query = { status };
      if (search) {
        query.$or = [
          { app_name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      
      // Get total count
      const count = await db.count('test_posts', query);
      total = count || 0;
      
      // Get paginated posts
      testPosts = await db.find('test_posts', query, { 
        sort: { created_at: -1 },
        skip: offset,
        limit: parseInt(limit)
      });
      
      // Enhance posts with additional data
      for (const post of testPosts) {
        // Get user data
        const user = await db.findOne('users', { id: post.user_id });
        if (user) {
          post.username = user.username;
          post.display_name = user.display_name;
          post.avatar_url = user.avatar_url;
        }
        
        // Get screenshots
        const screenshots = await db.find('screenshots', { test_post_id: post.id });
        post.screenshots = screenshots || [];
        
        // Get current testers count
        const testers = await db.find('test_participants', { test_post_id: post.id, status: 'testing' });
        post.current_testers = testers ? testers.length : 0;
        
        // Get review stats
        const reviews = await db.find('reviews', { test_post_id: post.id });
        if (reviews && reviews.length > 0) {
          const totalScore = reviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
          post.avg_rating = totalScore / reviews.length;
          post.review_count = reviews.length;
        } else {
          post.avg_rating = null;
          post.review_count = 0;
        }
      }
    } else {
      // SQLite approach
      let query = `
        SELECT 
          tp.*,
          u.username,
          u.display_name,
          u.avatar_url,
          COUNT(DISTINCT tprt.id) as current_testers,
          AVG(r.review_score) as avg_rating,
          COUNT(DISTINCT r.id) as review_count
        FROM test_posts tp
        LEFT JOIN users u ON tp.user_id = u.id
        LEFT JOIN test_participants tprt ON tp.id = tprt.test_post_id AND tprt.status = 'testing'
        LEFT JOIN reviews r ON tp.id = r.test_post_id
        WHERE tp.status = ?
      `;
      
      const params = [status];
      
      if (search) {
        query += ' AND (tp.app_name LIKE ? OR tp.description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      
      query += `
        GROUP BY tp.id
        ORDER BY tp.created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      params.push(parseInt(limit), offset);
      
      testPosts = await db.all(query, params);
      
      // Get screenshots for each test post
      for (const post of testPosts) {
        const screenshots = await db.all(
          'SELECT * FROM screenshots WHERE test_post_id = ? ORDER BY display_order',
          [post.id]
        );
        post.screenshots = screenshots;
      }
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM test_posts WHERE status = ?';
      const countParams = [status];
      
      if (search) {
        countQuery += ' AND (app_name LIKE ? OR description LIKE ?)';
        countParams.push(`%${search}%`, `%${search}%`);
      }
      
      const countResult = await db.get(countQuery, countParams);
      total = countResult.total;
    }
    
    res.json({
      test_posts: testPosts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching test posts:', error);
    res.status(500).json({ error: 'Failed to fetch test posts' });
  }
});

// Get single test post
router.get('/:id', async (req, res) => {
  try {
    // DB is pre-initialized in server.js
    
    let testPost;
    
    if (db.findOne) {
      // MongoDB approach
      testPost = await db.findOne('test_posts', { id: req.params.id });
      
      if (!testPost) {
        return res.status(404).json({ error: 'Test post not found' });
      }
      
      // Get user data
      const user = await db.findOne('users', { id: testPost.user_id });
      if (user) {
        testPost.username = user.username;
        testPost.display_name = user.display_name;
        testPost.avatar_url = user.avatar_url;
      }
      
      // Get screenshots
      const screenshots = await db.find('screenshots', { test_post_id: testPost.id });
      testPost.screenshots = screenshots || [];
      
      // Get reviews
      const reviews = await db.find('reviews', { test_post_id: testPost.id }, { sort: { created_at: -1 }, limit: 10 });
      testPost.reviews = reviews || [];
      
      // Get current testers count
      const testers = await db.find('test_participants', { test_post_id: testPost.id, status: 'testing' });
      testPost.current_testers = testers ? testers.length : 0;
      
      // Calculate average rating
      if (reviews && reviews.length > 0) {
        const totalScore = reviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
        testPost.avg_rating = totalScore / reviews.length;
        testPost.review_count = reviews.length;
      } else {
        testPost.avg_rating = null;
        testPost.review_count = 0;
      }
    } else {
      // SQLite approach
      testPost = await db.get(`
        SELECT 
          tp.*,
          u.username,
          u.display_name,
          u.avatar_url,
          COUNT(DISTINCT tprt.id) as current_testers,
          AVG(r.review_score) as avg_rating,
          COUNT(DISTINCT r.id) as review_count
        FROM test_posts tp
        LEFT JOIN users u ON tp.user_id = u.id
        LEFT JOIN test_participants tprt ON tp.id = tprt.test_post_id AND tprt.status = 'testing'
        LEFT JOIN reviews r ON tp.id = r.test_post_id
        WHERE tp.id = ?
        GROUP BY tp.id
      `, [req.params.id]);
      
      if (!testPost) {
        return res.status(404).json({ error: 'Test post not found' });
      }
      
      // Get screenshots
      const screenshots = await db.all(
        'SELECT * FROM screenshots WHERE test_post_id = ? ORDER BY display_order',
        [testPost.id]
      );
      
      // Get recent reviews
      const reviews = await db.all(`
        SELECT 
          r.*,
          u.username,
          u.display_name,
          u.avatar_url
        FROM reviews r
        LEFT JOIN users u ON r.reviewer_user_id = u.id
        WHERE r.test_post_id = ?
        ORDER BY r.created_at DESC
        LIMIT 10
      `, [testPost.id]);
      
      testPost.screenshots = screenshots;
      testPost.reviews = reviews;
    }
    
    res.json(testPost);
    
  } catch (error) {
    console.error('❌ Error fetching test post:', error);
    res.status(500).json({ error: 'Failed to fetch test post' });
  }
});

// Create new test post
router.post('/', authenticateUser, async (req, res) => {
  try {
    // Validate input
    const { error, value } = testPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Get user ID from authenticated user
    const userId = req.user.id;
    
    // DB is pre-initialized in server.js
    
    const testPostId = uuidv4();
    
    // Create a test post document (works for both MongoDB and SQLite)
    if (db.insert) {
      // MongoDB approach
      await db.insert('test_posts', {
        id: testPostId,
        user_id: userId,
        app_name: value.app_name,
        description: value.description,
        testing_link: value.testing_link || null,
        test_price: value.test_price,
        instructions: value.instructions || null,
        youtube_link: value.youtube_link || null,
        google_group_link: value.google_group_link || null,
        max_testers: value.max_testers,
        expires_at: value.expires_at || null,
        status: 'active',
        current_testers: 0,
        created_at: new Date(),
        updated_at: new Date()
      });
    } else {
      // SQLite approach
      await db.run(`
        INSERT INTO test_posts (
          id, user_id, app_name, description, testing_link, test_price,
          instructions, youtube_link, google_group_link, max_testers, expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        testPostId,
        userId,
        value.app_name,
        value.description,
        value.testing_link || null,
        value.test_price,
        value.instructions || null,
        value.youtube_link || null,
        value.google_group_link || null,
        value.max_testers,
        value.expires_at || null
      ]);
    }
    
    // Get the created test post (works for both MongoDB and SQLite)
    let createdPost;
    if (db.get) {
      createdPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [testPostId]);
    } else if (db.findOne) {
      createdPost = await db.findOne('test_posts', { id: testPostId });
    }
    
    res.status(201).json({
      message: 'Test post created successfully',
      test_post: createdPost
    });
    
  } catch (error) {
    console.error('❌ Error creating test post:', error);
    
    // Provide more detailed error message for MongoDB connection issues
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      return res.status(500).json({ 
        error: 'Database connection error', 
        message: 'Could not connect to MongoDB. Please check your connection string and network.',
        details: error.message
      });
    }
    
    res.status(500).json({ error: 'Failed to create test post', details: error.message });
  }
});

// Update test post
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    // DB is pre-initialized in server.js
    
    let testPost;
    
    // Check if test post exists
    if (db.findOne) {
      // MongoDB approach
      testPost = await db.findOne('test_posts', { id: req.params.id });
    } else {
      // SQLite approach
      testPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [
        req.params.id
      ]);
    }
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }
    
    // Validate input
    const { error, value } = testPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Update test post
    if (db.update) {
      // MongoDB approach
      await db.update('test_posts', 
        { id: req.params.id },
        { 
          $set: {
            app_name: value.app_name,
            description: value.description,
            testing_link: value.testing_link || null,
            instructions: value.instructions || null,
            youtube_link: value.youtube_link || null,
            google_group_link: value.google_group_link || null,
            max_testers: value.max_testers,
            expires_at: value.expires_at || null,
            updated_at: new Date()
          }
        }
      );
    } else {
      // SQLite approach
      await db.run(`
        UPDATE test_posts SET
          app_name = ?, description = ?, testing_link = ?, instructions = ?,
          youtube_link = ?, google_group_link = ?, max_testers = ?,
          expires_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        value.app_name,
        value.description,
        value.testing_link || null,
        value.instructions || null,
        value.youtube_link || null,
        value.google_group_link || null,
        value.max_testers,
        value.expires_at || null,
        req.params.id
      ]);
    }
    
    // Get updated test post
    let updatedPost;
    if (db.findOne) {
      // MongoDB approach
      updatedPost = await db.findOne('test_posts', { id: req.params.id });
    } else {
      // SQLite approach
      updatedPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [req.params.id]);
    }
    
    res.json({
      message: 'Test post updated successfully',
      test_post: updatedPost
    });
    
  } catch (error) {
    console.error('❌ Error updating test post:', error);
    res.status(500).json({ error: 'Failed to update test post' });
  }
});

// Join test post as tester
router.post('/:id/join', authenticateUser, async (req, res) => {
  try {
    // DB is pre-initialized in server.js
    
    let testPost;
    let existingParticipant;
    let currentTestersCount = 0;
    
    if (db.findOne) {
      // MongoDB approach
      testPost = await db.findOne('test_posts', { id: req.params.id, status: 'active' });
      
      if (testPost) {
        existingParticipant = await db.findOne('test_participants', { 
          test_post_id: req.params.id, 
          user_id: req.user.id
        });
        
        const currentTesters = await db.find('test_participants', { 
          test_post_id: req.params.id, 
          status: 'testing' 
        });
        currentTestersCount = currentTesters ? currentTesters.length : 0;
      }
    } else {
      // SQLite approach
      testPost = await db.get('SELECT * FROM test_posts WHERE id = ? AND status = ?', [
        req.params.id,
        'active'
      ]);
      
      if (testPost) {
        existingParticipant = await db.get(
          'SELECT * FROM test_participants WHERE test_post_id = ? AND user_id = ?',
          [req.params.id, req.user.id]
        );
        
        const currentTesters = await db.get(
          'SELECT COUNT(*) as count FROM test_participants WHERE test_post_id = ? AND status = ?',
          [req.params.id, 'testing']
        );
        currentTestersCount = currentTesters.count;
      }
    }
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found or not active' });
    }
    
    // Get user ID from authenticated user
    const userId = req.user.id;
    const userName = req.user.display_name || req.user.username || 'User';
    
    // Check if user is not the owner
    if (testPost.user_id === userId) {
      return res.status(400).json({ error: 'Cannot join your own test post' });
    }
    
    // Check if already joined
    if (existingParticipant) {
      return res.status(400).json({ error: 'Already joined this test' });
    }
    
    // Check if test is full
    if (currentTestersCount >= testPost.max_testers) {
      return res.status(400).json({ error: 'Test is full' });
    }
    
    // Join the test
    const participantId = uuidv4();
    
    if (db.insert) {
      // MongoDB approach
      await db.insert('test_participants', {
        id: participantId,
        test_post_id: req.params.id,
        user_id: userId,
        status: 'testing',
        created_at: new Date(),
        updated_at: new Date()
      });
      
      // Create notification for test owner
      const notificationId = uuidv4();
      await db.insert('notifications', {
        id: notificationId,
        user_id: testPost.user_id,
        title: 'New Tester Joined! 🎉',
        message: `${userName} joined your test for "${testPost.app_name}"`,
        type: 'success',
        reference_type: 'test_post',
        reference_id: req.params.id,
        is_read: false,
        created_at: new Date()
      });
    } else {
      // SQLite approach
      await db.run(`
        INSERT INTO test_participants (id, test_post_id, user_id)
        VALUES (?, ?, ?)
      `, [participantId, req.params.id, userId]);
      
      // Create notification for test owner
      const notificationId = uuidv4();
      await db.run(`
        INSERT INTO notifications (
          id, user_id, title, message, type, reference_type, reference_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        notificationId,
        testPost.user_id,
        'New Tester Joined! 🎉',
        `${userName} joined your test for "${testPost.app_name}"`,
        'success',
        'test_post',
        req.params.id
      ]);
    }
    
    res.json({ message: 'Successfully joined test post' });
    
  } catch (error) {
    console.error('❌ Error joining test post:', error);
    res.status(500).json({ error: 'Failed to join test post', details: error.message });
  }
});

// Get user's test posts
router.get('/user/mine', authenticateUser, async (req, res) => {
  try {
    // DB is pre-initialized in server.js
    
    // Get user ID from authenticated user
    const userId = req.user.id;
    
    let testPosts;
    
    if (db.find) {
      // MongoDB approach
      testPosts = await db.find('test_posts', { user_id: userId }, { sort: { created_at: -1 } });
      
      // For each post, get additional data
      for (const post of testPosts) {
        // Get testers count
        const testers = await db.find('test_participants', { test_post_id: post.id, status: 'testing' });
        post.current_testers = testers ? testers.length : 0;
        
        // Get review stats
        const reviews = await db.find('reviews', { test_post_id: post.id });
        if (reviews && reviews.length > 0) {
          const totalScore = reviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
          post.avg_rating = totalScore / reviews.length;
          post.review_count = reviews.length;
        } else {
          post.avg_rating = null;
          post.review_count = 0;
        }
      }
    } else {
      // SQLite approach
      testPosts = await db.all(`
        SELECT 
          tp.*,
          COUNT(DISTINCT tprt.id) as current_testers,
          AVG(r.review_score) as avg_rating,
          COUNT(DISTINCT r.id) as review_count
        FROM test_posts tp
        LEFT JOIN test_participants tprt ON tp.id = tprt.test_post_id AND tprt.status = 'testing'
        LEFT JOIN reviews r ON tp.id = r.test_post_id
        WHERE tp.user_id = ?
        GROUP BY tp.id
        ORDER BY tp.created_at DESC
      `, [userId]);
    }
    
    res.json(testPosts);
    
  } catch (error) {
    console.error('❌ Error fetching user test posts:', error);
    res.status(500).json({ error: 'Failed to fetch test posts', details: error.message });
  }
});

module.exports = router;
