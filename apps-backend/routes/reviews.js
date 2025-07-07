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
    const user = await db.findOne('users', { slack_user_id: slack_user_id });
    
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
    
    // Get reviews with user data
    const reviews = await db.find('reviews', { test_post_id: req.params.testPostId }, {
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
    const stats = {
      total_reviews: allReviews.length,
      average_rating: 0
    };
    if (allReviews.length > 0) {
      const totalScore = allReviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
      stats.average_rating = totalScore / allReviews.length;
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
    
    // Check if test post exists
    const testPost = await db.findOne('test_posts', { id: value.test_post_id });
    
    // Check if user has joined this test
    const participation = await db.findOne('test_participants', { 
      test_post_id: value.test_post_id, 
      user_id: req.user.id 
    });
    
    // Check if user has already reviewed this test post
    const existingReview = await db.findOne('reviews', { 
      test_post_id: value.test_post_id, 
      reviewer_user_id: req.user.id 
    });
    
    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }
    
    // Check if user is not the owner of the test post
    if (testPost.user_id === req.user.id) {
      return res.status(400).json({ error: 'Cannot review your own test post' });
    }
    
    /*if (!participation) {
      return res.status(400).json({ error: 'You must join the test before reviewing' });
    }*/
    
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
    const createdReview = await db.findOne('reviews', { id: reviewId });
    const user = await db.findOne('users', { id: req.user.id });
    if (user) {
      createdReview.username = user.username;
      createdReview.display_name = user.display_name;
      createdReview.avatar_url = user.avatar_url;
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
    // Check if review exists and belongs to user
    const review = await db.findOne('reviews', { 
      id: req.params.id, 
      reviewer_user_id: req.user.id 
    });
    
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
    
    await db.update(
      'reviews',
      { id: req.params.id },
      { 
        review_score: value.review_score,
        comment: value.comment || null,
        updated_at: new Date().toISOString()
      }
    );
    
    // Get updated review
    const updatedReview = await db.findOne('reviews', { id: req.params.id });
    const user = await db.findOne('users', { id: req.user.id });
    if (user) {
      updatedReview.username = user.username;
      updatedReview.display_name = user.display_name;
      updatedReview.avatar_url = user.avatar_url;
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
    // Check if review exists and belongs to user
    const review = await db.findOne('reviews', { 
      id: req.params.id, 
      reviewer_user_id: req.user.id 
    });
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found or not authorized' });
    }
    
    await db.delete('reviews', { id: req.params.id });
    
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
    
    // Get user's reviews
    const reviews = await db.find('reviews', { reviewer_user_id: req.user.id }, {
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
    const total = await db.count('reviews', { reviewer_user_id: req.user.id });
    
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
    
    // Get reviews with high scores and non-empty comments
    let featuredReviews = await db.find(
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
    
    res.json({ featured_reviews: featuredReviews });
    
  } catch (error) {
    console.error('❌ Error fetching featured reviews:', error);
    res.status(500).json({ error: 'Failed to fetch featured reviews' });
  }
});

module.exports = router;
