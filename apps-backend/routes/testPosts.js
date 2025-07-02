const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Joi = require('joi');
const Database = require('../database/db');

const router = express.Router();
const db = new Database();

// Validation schemas
const testPostSchema = Joi.object({
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
      
      await db.initialize();
      const user = await db.get('SELECT * FROM users WHERE id = ?', [userData.id]);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      req.user = user;
      return next();
    }
    
    if (req.session.user) {
      await db.initialize();
      const user = await db.get('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
      
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
    await db.initialize();
    
    const { page = 1, limit = 10, status = 'active', search } = req.query;
    const offset = (page - 1) * limit;
    
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
    
    const testPosts = await db.all(query, params);
    
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
    
    const { total } = await db.get(countQuery, countParams);
    
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
    await db.initialize();
    
    const testPost = await db.get(`
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
    
    res.json(testPost);
    
  } catch (error) {
    console.error('❌ Error fetching test post:', error);
    res.status(500).json({ error: 'Failed to fetch test post' });
  }
});

// Create new test post
router.post('/', /* authenticateUser, */ async (req, res) => {
  try {
    // Validate input
    const { error, value } = testPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Note: Authentication is disabled, so we're using a default user ID
    const userId = req.body.user_id || 'default-user-id'; // Use user_id from request body or a default
    
    // Check for coins is disabled since we don't have req.user
    // if (value.test_price > req.user.owned_coins) {
    //   return res.status(400).json({ error: 'Insufficient coins to create this test post' });
    // }
    
    await db.initialize();
    
    const testPostId = uuidv4();
    
    // Create test post
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
    
    // Coin deduction is disabled since we don't have req.user
    // if (value.test_price > 0) {
    //   await db.run('UPDATE users SET owned_coins = owned_coins - ? WHERE id = ?', [
    //     value.test_price,
    //     req.user.id
    //   ]);
    //   
    //   // Create transaction record
    //   const transactionId = uuidv4();
    //   await db.run(`
    //     INSERT INTO coin_transactions (
    //       id, sender_user_id, receiver_user_id, amount, transaction_type,
    //       reference_type, reference_id, description
    //     ) VALUES (?, ?, NULL, ?, ?, ?, ?, ?)
    //   `, [
    //     transactionId,
    //     req.user.id,
    //     value.test_price,
    //     'payment',
    //     'test_post',
    //     testPostId,
    //     `Payment for creating test post: ${value.app_name}`
    //   ]);
    // }
    
    // Get the created test post
    const createdPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [testPostId]);
    
    res.status(201).json({
      message: 'Test post created successfully',
      test_post: createdPost
    });
    
  } catch (error) {
    console.error('❌ Error creating test post:', error);
    res.status(500).json({ error: 'Failed to create test post' });
  }
});

// Update test post
router.put('/:id', /* authenticateUser, */ async (req, res) => {
  try {
    await db.initialize();
    
    // Note: With auth disabled, we don't check if the post belongs to the user
    const testPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [
      req.params.id
    ]);
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }
    
    // Validate input
    const { error, value } = testPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Update test post
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
    
    // Get updated test post
    const updatedPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [req.params.id]);
    
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
router.post('/:id/join', /* authenticateUser, */ async (req, res) => {
  try {
    await db.initialize();
    
    const testPost = await db.get('SELECT * FROM test_posts WHERE id = ? AND status = ?', [
      req.params.id,
      'active'
    ]);
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found or not active' });
    }
    
    // Note: Auth is disabled, so we need a user ID from the request
    const userId = req.body.user_id || 'test-user-id'; // Use user_id from request body or a default
    const userName = req.body.user_name || 'Test User';
    
    // Check if user is not the owner - still check this even though auth is disabled
    if (testPost.user_id === userId) {
      return res.status(400).json({ error: 'Cannot join your own test post' });
    }
    
    // Check if already joined
    const existingParticipant = await db.get(
      'SELECT * FROM test_participants WHERE test_post_id = ? AND user_id = ?',
      [req.params.id, userId]
    );
    
    if (existingParticipant) {
      return res.status(400).json({ error: 'Already joined this test' });
    }
    
    // Check if test is full
    const currentTesters = await db.get(
      'SELECT COUNT(*) as count FROM test_participants WHERE test_post_id = ? AND status = ?',
      [req.params.id, 'testing']
    );
    
    if (currentTesters.count >= testPost.max_testers) {
      return res.status(400).json({ error: 'Test is full' });
    }
    
    // Join the test
    const participantId = uuidv4();
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
    
    res.json({ message: 'Successfully joined test post' });
    
  } catch (error) {
    console.error('❌ Error joining test post:', error);
    res.status(500).json({ error: 'Failed to join test post' });
  }
});

// Get user's test posts
router.get('/user/mine', /* authenticateUser, */ async (req, res) => {
  try {
    await db.initialize();
    
    // Note: With auth disabled, we take the user_id from the query parameters
    const userId = req.query.user_id || 'default-user-id';
    
    const testPosts = await db.all(`
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
    
    res.json(testPosts);
    
  } catch (error) {
    console.error('❌ Error fetching user test posts:', error);
    res.status(500).json({ error: 'Failed to fetch test posts' });
  }
});

module.exports = router;
