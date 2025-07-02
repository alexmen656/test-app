const express = require('express');
const db = require('../database');

const router = express.Router();

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const userData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      if (userData.exp && userData.exp < Date.now()) {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      let user;
      
      if (db.findOne) {
        // MongoDB approach
        user = await db.findOne('users', { id: userData.id });
      } else {
        // SQLite approach
        await db.initialize();
        user = await db.get('SELECT * FROM users WHERE id = ?', [userData.id]);
      }
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      req.user = user;
      return next();
    }
    
    if (req.session.user) {
      let user;
      
      if (db.findOne) {
        // MongoDB approach
        user = await db.findOne('users', { id: req.session.user.id });
      } else {
        // SQLite approach
        await db.initialize();
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

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    let userStats;
    let recentTransactions;
    let unreadNotifications;
    
    if (db.findOne && db.find && db.count) {
      // MongoDB approach
      // Get user from authentication middleware
      userStats = { ...req.user };
      
      // Get test posts count
      const testPostsCount = await db.count('test_posts', { user_id: req.user.id });
      userStats.total_test_posts = testPostsCount;
      
      // Get tests joined count
      const testsJoinedCount = await db.count('test_participants', { user_id: req.user.id });
      userStats.tests_joined = testsJoinedCount;
      
      // Get reviews given count and average score
      const reviews = await db.find('reviews', { reviewer_user_id: req.user.id });
      userStats.reviews_given = reviews.length;
      
      if (reviews.length > 0) {
        const totalScore = reviews.reduce((sum, review) => sum + (review.review_score || 0), 0);
        userStats.avg_review_score = totalScore / reviews.length;
      } else {
        userStats.avg_review_score = null;
      }
      
      // Get recent transactions
      recentTransactions = await db.find(
        'coin_transactions', 
        { $or: [{ sender_user_id: req.user.id }, { receiver_user_id: req.user.id }] },
        { sort: { created_at: -1 }, limit: 10 }
      );
      
      // Get unread notifications
      unreadNotifications = await db.find(
        'notifications',
        { user_id: req.user.id, is_read: false },
        { sort: { created_at: -1 } }
      );
    } else {
      // SQLite approach
      await db.initialize();
      
      // Get user with stats
      userStats = await db.get(`
        SELECT 
          u.*,
          COUNT(DISTINCT tp.id) as total_test_posts,
          COUNT(DISTINCT tpr.id) as tests_joined,
          COUNT(DISTINCT r.id) as reviews_given,
          AVG(r.review_score) as avg_review_score
        FROM users u
        LEFT JOIN test_posts tp ON u.id = tp.user_id
        LEFT JOIN test_participants tpr ON u.id = tpr.user_id
        LEFT JOIN reviews r ON u.id = r.reviewer_user_id
        WHERE u.id = ?
        GROUP BY u.id
      `, [req.user.id]);
      
      // Get recent activities
      recentTransactions = await db.all(`
        SELECT * FROM coin_transactions 
        WHERE sender_user_id = ? OR receiver_user_id = ?
        ORDER BY created_at DESC 
        LIMIT 10
      `, [req.user.id, req.user.id]);
      
      // Get unread notifications
      unreadNotifications = await db.all(`
        SELECT * FROM notifications 
        WHERE user_id = ? AND is_read = 0
        ORDER BY created_at DESC
      `, [req.user.id]);
    }
    
    // Remove sensitive data
    delete userStats.slack_user_id;
    
    res.json({
      user: userStats,
      recent_transactions: recentTransactions,
      unread_notifications: unreadNotifications
    });
    
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { display_name } = req.body;
    
    if (!display_name || display_name.trim().length < 2) {
      return res.status(400).json({ error: 'Display name must be at least 2 characters' });
    }
    
    await db.initialize();
    
    await db.run(`
      UPDATE users SET 
        display_name = ?, 
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [display_name.trim(), req.user.id]);
    
    // Get updated user
    const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', [req.user.id]);
    delete updatedUser.slack_user_id;
    
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user's notifications
router.get('/notifications', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const notifications = await db.all(`
      SELECT * FROM notifications 
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [req.user.id, parseInt(limit), offset]);
    
    const { total } = await db.get(
      'SELECT COUNT(*) as total FROM notifications WHERE user_id = ?',
      [req.user.id]
    );
    
    res.json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.put('/notifications/:id/read', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const notification = await db.get(
      'SELECT * FROM notifications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    await db.run(
      'UPDATE notifications SET is_read = 1 WHERE id = ?',
      [req.params.id]
    );
    
    res.json({ message: 'Notification marked as read' });
    
  } catch (error) {
    console.error('❌ Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// Mark all notifications as read
router.put('/notifications/read-all', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    await db.run(
      'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0',
      [req.user.id]
    );
    
    res.json({ message: 'All notifications marked as read' });
    
  } catch (error) {
    console.error('❌ Error marking all notifications as read:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
});

// Get user's test participation history
router.get('/tests/joined', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const participations = await db.all(`
      SELECT 
        tp.*,
        tpr.joined_at,
        tpr.status as participation_status,
        tpr.completion_date,
        u.username as owner_username,
        u.display_name as owner_display_name,
        u.avatar_url as owner_avatar
      FROM test_participants tpr
      LEFT JOIN test_posts tp ON tpr.test_post_id = tp.id
      LEFT JOIN users u ON tp.user_id = u.id
      WHERE tpr.user_id = ?
      ORDER BY tpr.joined_at DESC
    `, [req.user.id]);
    
    res.json(participations);
    
  } catch (error) {
    console.error('❌ Error fetching test participations:', error);
    res.status(500).json({ error: 'Failed to fetch test participations' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    await db.initialize();
    
    const { type = 'coins', limit = 10 } = req.query;
    
    let query = '';
    let orderBy = '';
    
    switch (type) {
      case 'coins':
        query = `
          SELECT 
            u.id, u.username, u.display_name, u.avatar_url, u.owned_coins,
            COUNT(DISTINCT tp.id) as test_posts_created,
            COUNT(DISTINCT tpr.id) as tests_joined,
            COUNT(DISTINCT r.id) as reviews_given
          FROM users u
          LEFT JOIN test_posts tp ON u.id = tp.user_id
          LEFT JOIN test_participants tpr ON u.id = tpr.user_id
          LEFT JOIN reviews r ON u.id = r.reviewer_user_id
          WHERE u.is_active = 1
          GROUP BY u.id
          ORDER BY u.owned_coins DESC
        `;
        break;
        
      case 'tests_created':
        query = `
          SELECT 
            u.id, u.username, u.display_name, u.avatar_url, u.owned_coins,
            COUNT(DISTINCT tp.id) as test_posts_created,
            COUNT(DISTINCT tpr.id) as tests_joined,
            COUNT(DISTINCT r.id) as reviews_given
          FROM users u
          LEFT JOIN test_posts tp ON u.id = tp.user_id
          LEFT JOIN test_participants tpr ON u.id = tpr.user_id
          LEFT JOIN reviews r ON u.id = r.reviewer_user_id
          WHERE u.is_active = 1
          GROUP BY u.id
          ORDER BY test_posts_created DESC
        `;
        break;
        
      case 'reviews_given':
        query = `
          SELECT 
            u.id, u.username, u.display_name, u.avatar_url, u.owned_coins,
            COUNT(DISTINCT tp.id) as test_posts_created,
            COUNT(DISTINCT tpr.id) as tests_joined,
            COUNT(DISTINCT r.id) as reviews_given,
            AVG(r.review_score) as avg_review_score
          FROM users u
          LEFT JOIN test_posts tp ON u.id = tp.user_id
          LEFT JOIN test_participants tpr ON u.id = tpr.user_id
          LEFT JOIN reviews r ON u.id = r.reviewer_user_id
          WHERE u.is_active = 1
          GROUP BY u.id
          ORDER BY reviews_given DESC
        `;
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid leaderboard type' });
    }
    
    query += ` LIMIT ?`;
    
    const leaderboard = await db.all(query, [parseInt(limit)]);
    
    res.json({
      type,
      leaderboard
    });
    
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
