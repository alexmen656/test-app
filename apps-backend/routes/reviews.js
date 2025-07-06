const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { awardCoins } = require('./coins');

const router = express.Router();

// JWT Secret (same as in testPosts.js and auth.js)
const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

// Validation schema for reviews
const reviewSchema = Joi.object({
  test_post_id: Joi.string().required(),
  review_score: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow('').optional()
});

// Middleware to authenticate user via JWT
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication token required' });
    }
    
    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Extract Slack user info from JWT payload
    const { slack_user_id } = decoded;
    
    if (!slack_user_id) {
      return res.status(401).json({ error: 'Invalid token: missing slack_user_id' });
    }
    
    // Find user based on Slack ID
    let user;
    
    if (db.findOne) {
      // MongoDB approach
      user = await db.findOne('users', { slack_user_id: slack_user_id });
    } else {
      // SQLite approach
      await db.initialize();
      user = await db.get('SELECT * FROM users WHERE slack_user_id = ?', [slack_user_id]);
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    req.user = user;
    req.slack_user_id = slack_user_id;
    return next();
    
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

// Get reviews for a test post
router.get('/test-post/:testPostId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let reviews = [];
    let stats = { total_reviews: 0, average_rating: 0 };
    
    if (db.find) {
      // MongoDB approach
      // Get reviews with user data
      reviews = await db.find('reviews', { test_post_id: req.params.testPostId }, {
        sort: { created_at: -1 },
        skip: offset,
        limit: parseInt(limit)
      });
      
      // Get user data for each review
      for (const review of reviews) {
        const user = await db.findOne('users', { id: review.reviewer_user_id });
        if (user) {
          review.username = user.username;
          review.display_name = user.display_name;
          review.avatar_url = user.avatar_url;
        }
      }
      
      // Get stats
      const allReviews = await db.find('reviews', { test_post_id: req.params.testPostId });
      stats.total_reviews = allReviews.length;
      if (allReviews.length > 0) {
        const totalScore = allReviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
        stats.average_rating = totalScore / allReviews.length;
      }
    } else {
      // SQLite approach
      await db.initialize();
      
      reviews = await db.all(`
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
      stats = await db.get(`
        SELECT 
          COUNT(*) as total_reviews,
          AVG(review_score) as average_rating
        FROM reviews 
        WHERE test_post_id = ?
      `, [req.params.testPostId]);
    }
    
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
    
    let testPost;
    let participation;
    let existingReview;
    
    if (db.findOne) {
      // MongoDB approach
      // Check if test post exists
      testPost = await db.findOne('test_posts', { id: value.test_post_id });
      
      // Check if user has joined this test
      participation = await db.findOne('test_participants', { 
        test_post_id: value.test_post_id, 
        user_id: req.user.id 
      });
      
      // Check if user has already reviewed this test post
      existingReview = await db.findOne('reviews', { 
        test_post_id: value.test_post_id, 
        reviewer_user_id: req.user.id 
      });
    } else {
      // SQLite approach
      await db.initialize();
      
      // Check if test post exists
      testPost = await db.get('SELECT * FROM test_posts WHERE id = ?', [value.test_post_id]);
      
      // Check if user has joined this test
      participation = await db.get(
        'SELECT * FROM test_participants WHERE test_post_id = ? AND user_id = ?',
        [value.test_post_id, req.user.id]
      );
      
      // Check if user has already reviewed this test post
      existingReview = await db.get(
        'SELECT * FROM reviews WHERE test_post_id = ? AND reviewer_user_id = ?',
        [value.test_post_id, req.user.id]
      );
    }
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }
    
    // Check if user is not the owner of the test post
    if (testPost.user_id === req.user.id) {
      return res.status(400).json({ error: 'Cannot review your own test post' });
    }
    
    if (!participation) {
      return res.status(400).json({ error: 'You must join the test before reviewing' });
    }
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this test post' });
    }
    
    // Create review
    const reviewId = uuidv4();
    const reviewData = {
      id: reviewId,
      test_post_id: value.test_post_id,
      reviewer_user_id: req.user.id,
      review_score: value.review_score,
      comment: value.comment || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    if (db.insert) {
      // MongoDB approach
      await db.insert('reviews', reviewData);
      
      // Update test participation
      await db.update(
        'test_participants',
        { test_post_id: value.test_post_id, user_id: req.user.id },
        { status: 'completed', completion_date: new Date().toISOString() }
      );
      
      // Create notification
      const notificationData = {
        id: uuidv4(),
        user_id: testPost.user_id,
        title: 'New Review Received! ⭐',
        message: `${req.user.display_name || req.user.username} gave your app "${testPost.app_name}" ${value.review_score} stars`,
        type: 'success',
        reference_type: 'review',
        reference_id: reviewId,
        created_at: new Date().toISOString(),
        is_read: false
      };
      
      await db.insert('notifications', notificationData);
    } else {
      // SQLite approach
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
    }
    
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
    
    // Get the created review with user info
    let createdReview;
    
    if (db.findOne) {
      // MongoDB approach
      createdReview = await db.findOne('reviews', { id: reviewId });
      const user = await db.findOne('users', { id: req.user.id });
      if (user) {
        createdReview.username = user.username;
        createdReview.display_name = user.display_name;
        createdReview.avatar_url = user.avatar_url;
      }
    } else {
      // SQLite approach
      createdReview = await db.get(`
        SELECT 
          r.*,
          u.username,
          u.display_name,
          u.avatar_url
        FROM reviews r
        LEFT JOIN users u ON r.reviewer_user_id = u.id
        WHERE r.id = ?
      `, [reviewId]);
    }
    
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
    let review;
    
    if (db.findOne) {
      // MongoDB approach
      // Check if review exists and belongs to user
      review = await db.findOne('reviews', { 
        id: req.params.id, 
        reviewer_user_id: req.user.id 
      });
    } else {
      // SQLite approach
      await db.initialize();
      
      // Check if review exists and belongs to user
      review = await db.get(
        'SELECT * FROM reviews WHERE id = ? AND reviewer_user_id = ?',
        [req.params.id, req.user.id]
      );
    }
    
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
    
    if (db.update) {
      // MongoDB approach
      await db.update(
        'reviews',
        { id: req.params.id },
        { 
          review_score: value.review_score,
          comment: value.comment || null,
          updated_at: new Date().toISOString()
        }
      );
    } else {
      // SQLite approach
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
    }
    
    // Get updated review
    let updatedReview;
    
    if (db.findOne) {
      // MongoDB approach
      updatedReview = await db.findOne('reviews', { id: req.params.id });
      const user = await db.findOne('users', { id: req.user.id });
      if (user) {
        updatedReview.username = user.username;
        updatedReview.display_name = user.display_name;
        updatedReview.avatar_url = user.avatar_url;
      }
    } else {
      // SQLite approach
      updatedReview = await db.get(`
        SELECT 
          r.*,
          u.username,
          u.display_name,
          u.avatar_url
        FROM reviews r
        LEFT JOIN users u ON r.reviewer_user_id = u.id
        WHERE r.id = ?
      `, [req.params.id]);
    }
    
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
    let review;
    
    if (db.findOne) {
      // MongoDB approach
      // Check if review exists and belongs to user
      review = await db.findOne('reviews', { 
        id: req.params.id, 
        reviewer_user_id: req.user.id 
      });
    } else {
      // SQLite approach
      await db.initialize();
      
      // Check if review exists and belongs to user
      review = await db.get(
        'SELECT * FROM reviews WHERE id = ? AND reviewer_user_id = ?',
        [req.params.id, req.user.id]
      );
    }
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found or not authorized' });
    }
    
    if (db.delete) {
      // MongoDB approach
      await db.delete('reviews', { id: req.params.id });
    } else {
      // SQLite approach
      // Delete review
      await db.run('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    }
    
    res.json({ message: 'Review deleted successfully' });
    
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Get user's reviews
router.get('/user/mine', authenticateUser, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let reviews = [];
    let total = 0;
    
    if (db.find && db.count) {
      // MongoDB approach
      // Get user's reviews
      reviews = await db.find('reviews', { reviewer_user_id: req.user.id }, {
        sort: { created_at: -1 },
        skip: offset,
        limit: parseInt(limit)
      });
      
      // Enhance reviews with test post and owner info
      for (const review of reviews) {
        const testPost = await db.findOne('test_posts', { id: review.test_post_id });
        if (testPost) {
          review.app_name = testPost.app_name;
          review.icon_url = testPost.icon_url;
          
          // Get test post owner info
          const owner = await db.findOne('users', { id: testPost.user_id });
          if (owner) {
            review.owner_username = owner.username;
            review.owner_display_name = owner.display_name;
          }
        }
      }
      
      // Get total count
      total = await db.count('reviews', { reviewer_user_id: req.user.id });
    } else {
      // SQLite approach
      await db.initialize();
      
      reviews = await db.all(`
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
      
      const countResult = await db.get(
        'SELECT COUNT(*) as total FROM reviews WHERE reviewer_user_id = ?',
        [req.user.id]
      );
      total = countResult.total;
    }
    
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
    const { limit = 6 } = req.query;
    
    let featuredReviews = [];
    
    if (db.find) {
      // MongoDB approach
      // Get reviews with high scores and non-empty comments
      featuredReviews = await db.find(
        'reviews', 
        { 
          review_score: { $gte: 4 },
          comment: { $exists: true, $ne: null, $ne: '' } 
        }, 
        {
          sort: { review_score: -1, created_at: -1 },
          limit: parseInt(limit)
        }
      );
      
      // Filter reviews further to match SQL's LENGTH(r.comment) > 50
      featuredReviews = featuredReviews.filter(review => 
        review.comment && review.comment.length > 50
      );
      
      // Limit to the requested number
      featuredReviews = featuredReviews.slice(0, parseInt(limit));
      
      // Enhance reviews with user and test post info
      for (const review of featuredReviews) {
        // Get user info
        const user = await db.findOne('users', { id: review.reviewer_user_id });
        if (user) {
          review.username = user.username;
          review.display_name = user.display_name;
          review.avatar_url = user.avatar_url;
        }
        
        // Get test post info
        const testPost = await db.findOne('test_posts', { id: review.test_post_id, status: 'active' });
        if (testPost) {
          review.app_name = testPost.app_name;
          review.icon_url = testPost.icon_url;
        } else {
          // If test post is not active, remove this review from featured
          const index = featuredReviews.indexOf(review);
          if (index > -1) {
            featuredReviews.splice(index, 1);
          }
        }
      }
      
      // If we removed some reviews, get more to fill the limit
      if (featuredReviews.length < parseInt(limit)) {
        // This is a simplified approach - in a real app, you might want to implement 
        // a more sophisticated way to get more featured reviews
      }
    } else {
      // SQLite approach
      await db.initialize();
      
      featuredReviews = await db.all(`
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
    }
    
    res.json({ featured_reviews: featuredReviews });
    
  } catch (error) {
    console.error('❌ Error fetching featured reviews:', error);
    res.status(500).json({ error: 'Failed to fetch featured reviews' });
  }
});

module.exports = router;
