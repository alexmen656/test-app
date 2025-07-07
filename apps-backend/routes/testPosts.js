const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const db = require('../database');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

const testPostSchema = Joi.object({
  slack_user_id: Joi.string().optional(),
  app_name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  testing_link: Joi.string().uri().allow('').optional(),
  ios_link: Joi.string().uri().allow('').optional(),
  android_link: Joi.string().uri().allow('').optional(),
  testing_instruction: Joi.string().max(5000).allow('').optional(),
  test_price: Joi.number().integer().min(0).max(1000).default(0),
  instructions: Joi.string().max(2000).allow('').optional(),
  youtube_link: Joi.string().uri().allow('').optional(),
  google_group_link: Joi.string().uri().allow('').optional(),
  max_testers: Joi.number().integer().min(1).max(100).default(10),
  expires_at: Joi.date().greater('now').optional(),
  icon_url: Joi.string().uri().allow(null, '').optional(),
  cover_image_url: Joi.string().uri().allow(null, '').optional(),
  screenshot_urls: Joi.array().items(Joi.string().uri()).optional(),
  user_info: Joi.object({
    username: Joi.string().optional(),
    profile_image: Joi.string().uri().allow('').optional(),
    slack_user_id: Joi.string().optional()
  }).optional()
});

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication token required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const { slack_user_id, username, display_name, profile_image, email } = decoded;

    if (!slack_user_id) {
      return res.status(401).json({ error: 'Invalid token: missing slack_user_id' });
    }

    let user = await db.findOne('users', { slack_user_id: slack_user_id });

    if (!user) {
      const userId = uuidv4();
      user = {
        id: userId,
        slack_user_id: slack_user_id,
        username: username || `user_${slack_user_id}`,
        display_name: display_name || username || `User ${slack_user_id}`,
        email: email || `${slack_user_id}@slack.local`,
        avatar_url: profile_image || null,
        owned_coins: 100,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      await db.insert('users', user);
      console.log(`✅ Auto-created user from Slack: ${username} (${slack_user_id})`);
    } else {
      await db.update('users',
        { slack_user_id: slack_user_id },
        {
          $set: {
            username: username || user.username,
            display_name: display_name || user.display_name,
            email: email || user.email,
            avatar_url: profile_image || user.avatar_url,
            updated_at: new Date()
          }
        }
      );

      user = await db.findOne('users', { slack_user_id: slack_user_id });
    }

    req.user = user;
    req.slack_user_id = slack_user_id;
    return next();

  } catch (error) {
    console.error('❌ Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'active', search } = req.query;
    const offset = (page - 1) * limit;

    let testPosts;
    let total = 0;

    const query = { status };
    if (search) {
      query.$or = [
        { app_name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await db.count('test_posts', query);
    total = count || 0;

    testPosts = await db.find('test_posts', query, {
      sort: { created_at: -1 },
      skip: offset,
      limit: parseInt(limit)
    });

    for (const post of testPosts) {
      const user = await db.findOne('users', { id: post.user_id });
      if (user) {
        post.username = user.username;
        post.display_name = user.display_name;
        post.avatar_url = user.avatar_url;

        post.user_info = {
          user_id: user.id,
          username: user.username,
          display_name: user.display_name,
          profile_image: user.avatar_url,
          email: user.email
        };
      }

      const screenshots = await db.find('screenshots', { test_post_id: post.id });
      post.screenshots = screenshots || [];

      const testers = await db.find('test_participants', { test_post_id: post.id, status: 'testing' });
      post.current_testers = testers ? testers.length : 0;

      // Add joinedUserIds array for frontend compatibility
      post.joinedUserIds = testers ? testers.map(tester => tester.user_id) : [];

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

router.get('/:id', async (req, res) => {
  try {
    const testPost = await db.findOne('test_posts', { id: req.params.id });

    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }

    const user = await db.findOne('users', { id: testPost.user_id });
    if (user) {
      testPost.username = user.username;
      testPost.display_name = user.display_name;
      testPost.avatar_url = user.avatar_url;

      testPost.user_info = {
        user_id: user.id,
        username: user.username,
        display_name: user.display_name,
        profile_image: user.avatar_url,
        email: user.email
      };
    }

    const screenshots = await db.find('screenshots', { test_post_id: testPost.id });
    testPost.screenshots = screenshots || [];

    const reviews = await db.find('reviews', { test_post_id: testPost.id }, { sort: { created_at: -1 }, limit: 10 });
    testPost.reviews = reviews || [];

    const testers = await db.find('test_participants', { test_post_id: testPost.id, status: 'testing' });
    testPost.current_testers = testers ? testers.length : 0;

    // Add joinedUserIds array for frontend compatibility
    testPost.joinedUserIds = testers ? testers.map(tester => tester.user_id) : [];

    if (reviews && reviews.length > 0) {
      const totalScore = reviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
      testPost.avg_rating = totalScore / reviews.length;
      testPost.review_count = reviews.length;
    } else {
      testPost.avg_rating = null;
      testPost.review_count = 0;
    }

    console.log('📁 Test post retrieved with URLs:', {
      id: testPost.id,
      app_name: testPost.app_name,
      icon_url: testPost.icon_url,
      cover_image_url: testPost.cover_image_url,
      screenshot_urls: testPost.screenshot_urls
    });

    res.json(testPost);

  } catch (error) {
    console.error('❌ Error fetching test post:', error);
    res.status(500).json({ error: 'Failed to fetch test post' });
  }
});

router.post('/', authenticateUser, async (req, res) => {
  try {
    const { error, value } = testPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userId = req.user.id;
    const testPostId = uuidv4();

    await db.insert('test_posts', {
      id: testPostId,
      user_id: userId,
      app_name: value.app_name,
      description: value.description,
      testing_link: value.testing_link || null,
      android_link: value.android_link || null,
      ios_link: value.ios_link || null,
      testing_instruction: value.testing_instruction || null,
      test_price: value.test_price,
      instructions: value.instructions || null,
      youtube_link: value.youtube_link || null,
      google_group_link: value.google_group_link || null,
      max_testers: value.max_testers,
      expires_at: value.expires_at || null,
      icon_url: value.icon_url || null,
      cover_image_url: value.cover_image_url || null,
      screenshot_urls: value.screenshot_urls || [],
      status: 'active',
      current_testers: 0,
      created_at: new Date(),
      updated_at: new Date()
    });

    console.log('✅ Test post created with URLs:', {
      testPostId,
      icon_url: value.icon_url,
      cover_image_url: value.cover_image_url,
      screenshot_urls: value.screenshot_urls
    });

    const createdPost = await db.findOne('test_posts', { id: testPostId });

    res.status(201).json({
      message: 'Test post created successfully',
      test_post: createdPost
    });

  } catch (error) {
    console.error('❌ Error creating test post:', error);

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

router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const testPost = await db.findOne('test_posts', { id: req.params.id });

    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found' });
    }

    const { error, value } = testPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await db.update('test_posts',
      { id: req.params.id },
      {
        $set: {
          app_name: value.app_name,
          description: value.description,
          testing_link: value.testing_link || null,
          ios_link: value.ios_link || null,
          android_link: value.android_link || null,
          testing_instruction: value.testing_instruction || null,
          instructions: value.instructions || null,
          youtube_link: value.youtube_link || null,
          google_group_link: value.google_group_link || null,
          max_testers: value.max_testers,
          expires_at: value.expires_at || null,
          icon_url: value.icon_url || null,
          cover_image_url: value.cover_image_url || null,
          screenshot_urls: value.screenshot_urls || [],
          updated_at: new Date()
        }
      }
    );

    console.log('✅ Test post updated with URLs:', {
      testPostId: req.params.id,
      icon_url: value.icon_url,
      cover_image_url: value.cover_image_url,
      screenshot_urls: value.screenshot_urls
    });

    const updatedPost = await db.findOne('test_posts', { id: req.params.id });

    res.json({
      message: 'Test post updated successfully',
      test_post: updatedPost
    });

  } catch (error) {
    console.error('❌ Error updating test post:', error);
    res.status(500).json({ error: 'Failed to update test post' });
  }
});

router.post('/:id/join', authenticateUser, async (req, res) => {
  try {
    const testPost = await db.findOne('test_posts', { id: req.params.id, status: 'active' });

    if (!testPost) {
      return res.status(404).json({ error: 'Test post not found or not active' });
    }

    const existingParticipant = await db.findOne('test_participants', {
      test_post_id: req.params.id,
      user_id: req.user.id
    });

    const currentTesters = await db.find('test_participants', {
      test_post_id: req.params.id,
      status: 'testing'
    });
    const currentTestersCount = currentTesters ? currentTesters.length : 0;

    const userId = req.user.id;
    const userName = req.user.display_name || req.user.username || 'User';

    if (testPost.user_id === userId) {
      return res.status(400).json({ error: 'Cannot join your own test post' });
    }

    if (existingParticipant) {
      return res.status(400).json({ error: 'Already joined this test' });
    }

    if (currentTestersCount >= testPost.max_testers) {
      return res.status(400).json({ error: 'Test is full' });
    }

    const participantId = uuidv4();

    await db.insert('test_participants', {
      id: participantId,
      test_post_id: req.params.id,
      user_id: userId,
      status: 'testing',
      created_at: new Date(),
      updated_at: new Date()
    });

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

    res.json({ message: 'Successfully joined test post' });

  } catch (error) {
    console.error('❌ Error joining test post:', error);
    res.status(500).json({ error: 'Failed to join test post', details: error.message });
  }
});

router.get('/user/mine', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const testPosts = await db.find('test_posts', { user_id: userId }, { sort: { created_at: -1 } });

    for (const post of testPosts) {
      const testers = await db.find('test_participants', { test_post_id: post.id, status: 'testing' });
      post.current_testers = testers ? testers.length : 0;

      // Add joinedUserIds array for frontend compatibility
      post.joinedUserIds = testers ? testers.map(tester => tester.user_id) : [];

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

    res.json(testPosts);

  } catch (error) {
    console.error('❌ Error fetching user test posts:', error);
    res.status(500).json({ error: 'Failed to fetch test posts', details: error.message });
  }
});

router.post('/upload', async (req, res) => {
  try {
    const multer = require('multer');
    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      }
    }).single('file');

    upload(req, res, async (err) => {
      if (err) {
        console.error('❌ Upload error:', err);
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileUrl = `https://betabay-uploads.s3.amazonaws.com/${Date.now()}-${req.file.originalname}`;

      console.log('✅ File uploaded successfully:', {
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      });

      res.json({
        success: true,
        url: fileUrl,
        filename: req.file.originalname,
        size: req.file.size
      });
    });

  } catch (error) {
    console.error('❌ Error in upload endpoint:', error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

router.post('/auth/generate-token', async (req, res) => {
  try {
    const { slack_user_id, username, display_name, profile_image, email } = req.body;

    if (!slack_user_id) {
      return res.status(400).json({ error: 'slack_user_id is required' });
    }

    const payload = {
      slack_user_id,
      username: username || `user_${slack_user_id}`,
      display_name: display_name || username || `User ${slack_user_id}`,
      profile_image: profile_image || null,
      email: email || `${slack_user_id}@slack.local`,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    };

    const token = jwt.sign(payload, JWT_SECRET);

    res.json({
      token,
      payload,
      message: 'JWT token generated successfully'
    });

  } catch (error) {
    console.error('❌ Error generating JWT token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

module.exports = router;