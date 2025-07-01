const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const Database = require('../database/db');
const { awardCoins } = require('./coins');

const router = express.Router();
const db = new Database();

// Validation schema for reviews
const reviewSchema = Joi.object({
  test_post_id: Joi.string().required(),
  review_score: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('').optional()
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

// Get reviews for a test post
router.get('/test-post/:testPostId', async (req, res) => {
  try {
    await db.initialize();
    
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
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
      LIMIT ? OFFSET ?
    `, [req.params.testPostId, parseInt(limit), offset]);
    
    // Get total count and average rating
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_reviews,
        AVG(review_score) as average_rating
      FROM reviews 
      WHERE test_post_id = ?
    `, [req.params.testPostId]);
    
    res.json({
      reviews,
      stats: {
        total_reviews: stats.total_reviews || 0,
        average_rating: stats.average_rating ? parseFloat(stats.average_rating.toFixed(1)) : 0
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: stats.total_reviews || 0,
        pages: Math.ceil((stats.total_reviews || 0) / limit)
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Submit a review
router.post('/', authenticateUser, async (req, res) => {
  try {
    // Validate input
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    await db.initialize();
    
    // Check if test post exists
    const testPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [value.test_post_id]);
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }
    
    // Check if user is not the owner of the test post
    if (testPost.user_id === req.user.id) {
      return res.status(400).json({ error: 'Cannot review your own test post' });
    }
    
    // Check if user has joined this test
    const participation = await db.get(
      'SELECT * FROM test_participants WHERE test_post_id = ? AND user_id = ?',
      [value.test_post_id, req.user.id]
    );
    
    if (!participation) {
      return res.status(400).json({ error: 'You must join the test before reviewing' });
    }
    
    // Check if user has already reviewed this test post
    const existingReview = await db.get(
      'SELECT * FROM reviews WHERE test_post_id = ? AND reviewer_user_id = ?',
      [value.test_post_id, req.user.id]
    );
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this test post' });
    }
    
    // Create review
    const reviewId = uuidv4();
    
    await db.run(`
      INSERT INTO reviews (
        id, test_post_id, reviewer_user_id, review_score, comment
      ) VALUES (?, ?, ?, ?, ?)
    `, [
      reviewId,
      value.test_post_id,
      req.user.id,
      value.review_score,
      value.comment || null
    ]);
    
    // Award coins to reviewer (5 coins per review)
    await awardCoins(
      req.user.id,
      5,
      'reward',
      'review',
      reviewId,
      `Review submitted for "${testPost.app_name}"`
    );
    
    // Award coins to test post owner if it's a good review (4-5 stars)
    if (value.review_score >= 4) {
      await awardCoins(
        testPost.user_id,
        10,
        'reward',
        'good_review',
        reviewId,
        `Received ${value.review_score}-star review for "${testPost.app_name}"`
      );
    }
    
    // Mark test participation as completed
    await db.run(
      'UPDATE test_participants SET status = ?, completion_date = ? WHERE test_post_id = ? AND user_id = ?',
      ['completed', new Date().toISOString(), value.test_post_id, req.user.id]
    );
    
    // Create notification for test post owner
    const notificationId = uuidv4();
    await db.run(`
      INSERT INTO notifications (
        id, user_id, title, message, type, reference_type, reference_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      notificationId,
      testPost.user_id,
      'New Review Received! ⭐',
      `${req.user.display_name || req.user.username} gave your app "${testPost.app_name}" ${value.review_score} stars`,
      'success',
      'review',
      reviewId
    ]);
    
    // Get the created review with user info
    const createdReview = await db.get(`
      SELECT 
        r.*,
        u.username,
        u.display_name,
        u.avatar_url
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_user_id = u.id
      WHERE r.id = ?
    `, [reviewId]);
    
    res.status(201).json({
      message: 'Review submitted successfully',
      review: createdReview
    });
    
  } catch (error) {
    console.error('❌ Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Update a review
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    // Check if review exists and belongs to user
    const review = await db.get(
      'SELECT * FROM reviews WHERE id = ? AND reviewer_user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found or not authorized' });
    }
    
    // Validate input
    const { error, value } = Joi.object({
      review_score: Joi.number().integer().min(1).max(5).required(),
      comment: Joi.string().max(1000).allow('').optional()
    }).validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Update review
    await db.run(`
      UPDATE reviews SET
        review_score = ?,
        comment = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      value.review_score,
      value.comment || null,
      req.params.id
    ]);
    
    // Get updated review
    const updatedReview = await db.get(`
      SELECT 
        r.*,
        u.username,
        u.display_name,
        u.avatar_url
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_user_id = u.id
      WHERE r.id = ?
    `, [req.params.id]);
    
    res.json({
      message: 'Review updated successfully',
      review: updatedReview
    });
    
  } catch (error) {
    console.error('❌ Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    // Check if review exists and belongs to user
    const review = await db.get(
      'SELECT * FROM reviews WHERE id = ? AND reviewer_user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found or not authorized' });
    }
    
    // Delete review
    await db.run('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    
    res.json({ message: 'Review deleted successfully' });
    
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Get user's reviews
router.get('/user/mine', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const reviews = await db.all(`
      SELECT 
        r.*,
        tp.app_name,
        tp.icon_url,
        owner.username as owner_username,
        owner.display_name as owner_display_name
      FROM reviews r
      LEFT JOIN test_posts tp ON r.test_post_id = tp.id
      LEFT JOIN users owner ON tp.user_id = owner.id
      WHERE r.reviewer_user_id = ?
      ORDER BY r.created_at DESC
      LIMIT ? OFFSET ?
    `, [req.user.id, parseInt(limit), offset]);
    
    const { total } = await db.get(
      'SELECT COUNT(*) as total FROM reviews WHERE reviewer_user_id = ?',
      [req.user.id]
    );
    
    res.json({
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching user reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get featured reviews (highest rated, most helpful)
router.get('/featured', async (req, res) => {
  try {
    await db.initialize();
    
    const { limit = 6 } = req.query;
    
    const featuredReviews = await db.all(`
      SELECT 
        r.*,
        u.username,
        u.display_name,
        u.avatar_url,
        tp.app_name,
        tp.icon_url
      FROM reviews r
      LEFT JOIN users u ON r.reviewer_user_id = u.id
      LEFT JOIN test_posts tp ON r.test_post_id = tp.id
      WHERE r.review_score >= 4 
        AND LENGTH(r.comment) > 50
        AND tp.status = 'active'
      ORDER BY r.review_score DESC, LENGTH(r.comment) DESC, r.created_at DESC
      LIMIT ?
    `, [parseInt(limit)]);
    
    res.json({ featured_reviews: featuredReviews });
    
  } catch (error) {
    console.error('❌ Error fetching featured reviews:', error);
    res.status(500).json({ error: 'Failed to fetch featured reviews' });
  }
});

module.exports = router;
