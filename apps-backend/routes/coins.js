const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Database = require('../database/db');

const router = express.Router();
const db = new Database();

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

// Get user's coin balance
router.get('/balance', authenticateUser, async (req, res) => {
  try {
    await db.initialize();
    
    const user = await db.get('SELECT owned_coins FROM users WHERE id = ?', [req.user.id]);
    
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
    
    let query = `
      SELECT 
        ct.*,
        sender.username as sender_username,
        sender.display_name as sender_display_name,
        receiver.username as receiver_username,
        receiver.display_name as receiver_display_name
      FROM coin_transactions ct
      LEFT JOIN users sender ON ct.sender_user_id = sender.id
      LEFT JOIN users receiver ON ct.receiver_user_id = receiver.id
      WHERE ct.sender_user_id = ? OR ct.receiver_user_id = ?
    `;
    
    const params = [req.user.id, req.user.id];
    
    if (type) {
      query += ' AND ct.transaction_type = ?';
      params.push(type);
    }
    
    query += ' ORDER BY ct.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const transactions = await db.all(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total FROM coin_transactions 
      WHERE sender_user_id = ? OR receiver_user_id = ?
    `;
    const countParams = [req.user.id, req.user.id];
    
    if (type) {
      countQuery += ' AND transaction_type = ?';
      countParams.push(type);
    }
    
    const { total } = await db.get(countQuery, countParams);
    
    // Add transaction direction for each transaction
    const enrichedTransactions = transactions.map(tx => ({
      ...tx,
      direction: tx.sender_user_id === req.user.id ? 'outgoing' : 'incoming'
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
    const recipient = await db.get('SELECT * FROM users WHERE username = ?', [recipient_username]);
    
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient user not found' });
    }
    
    if (recipient.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot transfer coins to yourself' });
    }
    
    // Perform transaction
    const transactionId = uuidv4();
    
    // Start transaction
    await db.run('BEGIN TRANSACTION');
    
    try {
      // Deduct from sender
      await db.run('UPDATE users SET owned_coins = owned_coins - ? WHERE id = ?', [
        amount,
        req.user.id
      ]);
      
      // Add to recipient
      await db.run('UPDATE users SET owned_coins = owned_coins + ? WHERE id = ?', [
        amount,
        recipient.id
      ]);
      
      // Record transaction
      await db.run(`
        INSERT INTO coin_transactions (
          id, sender_user_id, receiver_user_id, amount, transaction_type,
          reference_type, description, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        transactionId,
        req.user.id,
        recipient.id,
        amount,
        'payment',
        'user_transfer',
        description || `Transfer to ${recipient.username}`,
        'completed'
      ]);
      
      // Create notification for recipient
      const notificationId = uuidv4();
      await db.run(`
        INSERT INTO notifications (
          id, user_id, title, message, type, reference_type, reference_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        notificationId,
        recipient.id,
        'Coins Received! 💰',
        `You received ${amount} coins from ${req.user.display_name || req.user.username}${description ? ': ' + description : ''}`,
        'success',
        'coin_transaction',
        transactionId
      ]);
      
      await db.run('COMMIT');
      
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
      await db.run('ROLLBACK');
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
    
    await db.run('BEGIN TRANSACTION');
    
    try {
      // Add coins to user
      await db.run('UPDATE users SET owned_coins = owned_coins + ? WHERE id = ?', [
        amount,
        userId
      ]);
      
      // Record transaction
      await db.run(`
        INSERT INTO coin_transactions (
          id, receiver_user_id, amount, transaction_type,
          reference_type, reference_id, description, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        transactionId,
        userId,
        amount,
        transactionType,
        referenceType,
        referenceId,
        description,
        'completed'
      ]);
      
      // Create notification
      const notificationId = uuidv4();
      await db.run(`
        INSERT INTO notifications (
          id, user_id, title, message, type, reference_type, reference_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        notificationId,
        userId,
        'Coins Earned! 🎉',
        `You earned ${amount} coins: ${description}`,
        'success',
        'coin_transaction',
        transactionId
      ]);
      
      await db.run('COMMIT');
      
      return { success: true, transactionId };
      
    } catch (error) {
      await db.run('ROLLBACK');
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
    
    const stats = await db.get(`
      SELECT 
        SUM(CASE WHEN transaction_type = 'reward' THEN amount ELSE 0 END) as total_rewards_given,
        SUM(CASE WHEN transaction_type = 'payment' THEN amount ELSE 0 END) as total_payments,
        COUNT(DISTINCT receiver_user_id) as active_users,
        AVG(amount) as avg_transaction_amount
      FROM coin_transactions
      WHERE status = 'completed'
    `);
    
    // Get top earners
    const topEarners = await db.all(`
      SELECT 
        u.username, u.display_name, u.avatar_url, u.owned_coins
      FROM users u
      WHERE u.is_active = 1
      ORDER BY u.owned_coins DESC
      LIMIT 5
    `);
    
    res.json({
      platform_stats: stats,
      top_earners: topEarners
    });
    
  } catch (error) {
    console.error('❌ Error fetching coin stats:', error);
    res.status(500).json({ error: 'Failed to fetch coin statistics' });
  }
});

// Export the award function for use in other modules
module.exports = router;
module.exports.awardCoins = awardCoins;
