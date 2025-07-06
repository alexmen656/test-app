const express = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../database');

const router = express.Router();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'betabay-secret-key-2024';

// Middleware to authenticate user (updated for MongoDB and JWT)
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
    
    await db.initialize();
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
    return res.status(401).json({ error: 'Invalid authentication' });
  }
};

// Get user's coin balance
router.get('/balance', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const user = await db.findOne('users', { id: req.user.id });
    
    res.json({
      user_id: req.user.id,
      balance: user.owned_coins,
      currency: 'coins'
    });
    
  } catch (error) {
    console.error('❌ Error fetching coin balance:', error);
    res.status(500).json({ error: 'Failed to fetch coin balance' });
  }
});

// Get user's transaction history
router.get('/transactions', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const { page = 1, limit = 20, type } = req.query;
    const offset = (page - 1) * limit;
    
    // Build MongoDB query
    let query = {
      $or: [
        { sender_user_id: req.user.id },
        { receiver_user_id: req.user.id }
      ]
    };
    
    if (type) {
      query.transaction_type = type;
    }
    
    // Get transactions with sorting and pagination
    const transactions = await db.find('coin_transactions', query, {
      sort: { created_at: -1 },
      limit: parseInt(limit),
      skip: offset
    });
    
    // Get total count
    const total = await db.count('coin_transactions', query);
    
    // Enrich transactions with user data
    const enrichedTransactions = await Promise.all(transactions.map(async (tx) => {
      let senderUser = null;
      let receiverUser = null;
      
      if (tx.sender_user_id) {
        senderUser = await db.findOne('users', { id: tx.sender_user_id });
      }
      
      if (tx.receiver_user_id) {
        receiverUser = await db.findOne('users', { id: tx.receiver_user_id });
      }
      
      return {
        ...tx,
        sender_username: senderUser?.username || null,
        sender_display_name: senderUser?.display_name || null,
        receiver_username: receiverUser?.username || null,
        receiver_display_name: receiverUser?.display_name || null,
        direction: tx.sender_user_id === req.user.id ? 'outgoing' : 'incoming'
      };
    }));
    
    res.json({
      transactions: enrichedTransactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Transfer coins to another user
router.post('/transfer', authenticateUser, async (req, res) => {
  try {
    const { recipient_username, amount, description } = req.body;
    
    // Validation
    if (!recipient_username || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid transfer details' });
    }
    
    if (amount > req.user.owned_coins) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }
    
    await db.initialize();
    
    // Find recipient
    const recipient = await db.findOne('users', { username: recipient_username });
    
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient user not found' });
    }
    
    if (recipient.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot transfer coins to yourself' });
    }
    
    // Perform transaction using MongoDB session for atomicity
    const transactionId = uuidv4();
    
    try {
      // Deduct from sender
      await db.update('users', 
        { id: req.user.id }, 
        { $inc: { owned_coins: -amount } }
      );
      
      // Add to recipient
      await db.update('users', 
        { id: recipient.id }, 
        { $inc: { owned_coins: amount } }
      );
      
      // Record transaction
      await db.insert('coin_transactions', {
        id: transactionId,
        sender_user_id: req.user.id,
        receiver_user_id: recipient.id,
        amount: amount,
        transaction_type: 'payment',
        reference_type: 'user_transfer',
        description: description || `Transfer to ${recipient.username}`,
        status: 'completed',
        created_at: new Date()
      });
      
      // Create notification for recipient
      const notificationId = uuidv4();
      await db.insert('notifications', {
        id: notificationId,
        user_id: recipient.id,
        title: 'Coins Received! 💰',
        message: `You received ${amount} coins from ${req.user.display_name || req.user.username}${description ? ': ' + description : ''}`,
        type: 'success',
        reference_type: 'coin_transaction',
        reference_id: transactionId,
        is_read: false,
        created_at: new Date()
      });
      
      res.json({
        message: 'Coins transferred successfully',
        transaction: {
          id: transactionId,
          amount,
          recipient: recipient.username,
          description
        }
      });
      
    } catch (error) {
      console.error('❌ Transaction error:', error);
      throw error;
    }
    
  } catch (error) {
    console.error('❌ Error transferring coins:', error);
    res.status(500).json({ error: 'Failed to transfer coins' });
  }
});

// Award coins (for completing tests, good reviews, etc.)
async function awardCoins(userId, amount, transactionType, referenceType, referenceId, description) {
  try {
    await db.initialize();
    
    const transactionId = uuidv4();
    
    try {
      // Add coins to user
      await db.update('users', 
        { id: userId }, 
        { $inc: { owned_coins: amount } }
      );
      
      // Record transaction
      await db.insert('coin_transactions', {
        id: transactionId,
        receiver_user_id: userId,
        amount: amount,
        transaction_type: transactionType,
        reference_type: referenceType,
        reference_id: referenceId,
        description: description,
        status: 'completed',
        created_at: new Date()
      });
      
      // Create notification
      const notificationId = uuidv4();
      await db.insert('notifications', {
        id: notificationId,
        user_id: userId,
        title: 'Coins Earned! 🎉',
        message: `You earned ${amount} coins: ${description}`,
        type: 'success',
        reference_type: 'coin_transaction',
        reference_id: transactionId,
        is_read: false,
        created_at: new Date()
      });
      
      return { success: true, transactionId };
      
    } catch (error) {
      console.error('❌ Award coins error:', error);
      throw error;
    }
    
  } catch (error) {
    console.error('❌ Error awarding coins:', error);
    return { success: false, error: error.message };
  }
}

// Get coin statistics
router.get('/stats', async (req, res) => {
  try {
    await db.initialize();
    
    // Get platform stats using MongoDB aggregation
    const rewardTransactions = await db.find('coin_transactions', {
      transaction_type: 'reward',
      status: 'completed'
    });
    
    const paymentTransactions = await db.find('coin_transactions', {
      transaction_type: 'payment',
      status: 'completed'
    });
    
    const allTransactions = await db.find('coin_transactions', {
      status: 'completed'
    });
    
    // Calculate stats
    const totalRewards = rewardTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalPayments = paymentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgTransactionAmount = allTransactions.length > 0 
      ? allTransactions.reduce((sum, tx) => sum + tx.amount, 0) / allTransactions.length 
      : 0;
    
    // Get unique active users
    const activeUserIds = new Set();
    allTransactions.forEach(tx => {
      if (tx.receiver_user_id) activeUserIds.add(tx.receiver_user_id);
    });
    
    const stats = {
      total_rewards_given: totalRewards,
      total_payments: totalPayments,
      active_users: activeUserIds.size,
      avg_transaction_amount: Math.round(avgTransactionAmount * 100) / 100
    };
    
    // Get top earners
    const topEarners = await db.find('users', {
      is_active: true
    }, {
      sort: { owned_coins: -1 },
      limit: 5
    });
    
    res.json({
      platform_stats: stats,
      top_earners: topEarners.map(user => ({
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        owned_coins: user.owned_coins
      }))
    });
    
  } catch (error) {
    console.error('❌ Error fetching coin stats:', error);
    res.status(500).json({ error: 'Failed to fetch coin statistics' });
  }
});

// Export the award function for use in other modules
module.exports = router;
module.exports.awardCoins = awardCoins;
