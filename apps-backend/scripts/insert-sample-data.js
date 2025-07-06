/**
 * Script to insert sample test posts data for testing
 */
const { v4: uuidv4 } = require('uuid');

async function insertSampleData(db) {
  try {
    const userId = uuidv4();
    await db.run(
      `INSERT OR REPLACE INTO users (id, slack_user_id, username, display_name, email, avatar_url, owned_coins) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, 'U123456', 'johndoe', 'John Doe', 'john@example.com', 'https://via.placeholder.com/150', 100]
    );

    const testPosts = [
      {
        id: '1',
        user_id: userId,
        app_name: 'PhotoEditor Pro',
        description: 'A powerful photo editing app with advanced filters and effects. Test the new AI-powered background removal feature.',
        testing_link: 'https://testflight.apple.com/join/abc123',
        test_price: 5,
        instructions: 'Please test the new AI background removal feature and provide feedback on performance.',
        youtube_link: 'https://www.youtube.com/watch?v=example',
        google_group_link: 'https://groups.google.com/example',
        icon_url: 'https://via.placeholder.com/120x120/4285f4/ffffff?text=PE'
      },
      {
        id: '2',
        user_id: userId,
        app_name: 'TaskMaster',
        description: 'A productivity app for managing tasks and projects. We need feedback on the new collaboration features.',
        testing_link: 'https://play.google.com/store/apps/details?id=com.example.taskmaster',
        test_price: 10,
        instructions: 'Focus on testing the team collaboration features and project templates.',
        youtube_link: 'https://www.youtube.com/watch?v=example2',
        google_group_link: 'https://groups.google.com/example2',
        icon_url: 'https://via.placeholder.com/120x120/34a853/ffffff?text=TM'
      },
      {
        id: '3',
        user_id: userId,
        app_name: 'FitTracker',
        description: 'A fitness tracking app with workout plans and nutrition tracking. Test the new social features.',
        testing_link: 'https://testflight.apple.com/join/def456',
        test_price: 8,
        instructions: 'Please test the social features, workout sharing, and nutrition tracking accuracy.',
        youtube_link: 'https://www.youtube.com/watch?v=example3',
        google_group_link: 'https://groups.google.com/example3',
        icon_url: 'https://via.placeholder.com/120x120/ea4335/ffffff?text=FT'
      }
    ];

    for (const post of testPosts) {
      await db.run(
        `INSERT OR REPLACE INTO test_posts (id, user_id, app_name, description, testing_link, test_price, instructions, youtube_link, google_group_link, icon_url, status, max_testers, current_testers) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          post.id,
          post.user_id,
          post.app_name,
          post.description,
          post.testing_link,
          post.test_price,
          post.instructions,
          post.youtube_link,
          post.google_group_link,
          post.icon_url,
          'active',
          10,
          0
        ]
      );
    }

    const reviewId1 = uuidv4();
    const reviewId2 = uuidv4();
    
    await db.run(
      `INSERT OR REPLACE INTO reviews (id, test_post_id, reviewer_user_id, review_score, comment, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [reviewId1, '1', userId, 5, 'Great app! The AI background removal works perfectly.', 1]
    );

    await db.run(
      `INSERT OR REPLACE INTO reviews (id, test_post_id, reviewer_user_id, review_score, comment, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [reviewId2, '2', userId, 4, 'Good productivity features, but needs some UI improvements.', 0]
    );

    console.log('✅ Sample data inserted successfully');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
    throw error;
  }
}

module.exports = { insertSampleData };
