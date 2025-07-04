const db = require('./database');
const { v4: uuidv4 } = require('uuid');

// Realistische Test-Apps-Daten
const testApps = [
  {
    app_name: "TaskMaster Pro",
    description: "A revolutionary productivity app that helps you manage tasks, set priorities, and track progress with AI-powered insights. Features include smart scheduling, collaboration tools, and detailed analytics.",
    testing_link: "https://testflight.apple.com/join/taskmaster",
    ios_link: "https://testflight.apple.com/join/taskmaster-ios",
    android_link: "https://play.google.com/store/apps/testing/taskmaster",
    testing_instruction: "Please test the following key features:\n1. Create and organize tasks with different priorities\n2. Test the AI scheduling recommendations\n3. Try the collaboration features by sharing tasks\n4. Check the analytics dashboard\n5. Test notifications and reminders\n\nPay special attention to performance and any UI/UX issues.",
    test_price: 25,
    instructions: "Focus on productivity workflows and collaboration features",
    youtube_link: "https://youtube.com/watch?v=taskmaster-demo",
    max_testers: 15,
    icon_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop&crop=center",
    cover_image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=600&fit=crop"
    ],
    user_info: {
      username: "taskmaster_dev",
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      slack_user_id: "U01TASKMASTER123"
    }
  },
  {
    app_name: "FitTracker Elite",
    description: "Next-generation fitness tracking app with personalized workout plans, nutrition tracking, and social challenges. Integrates with all major fitness devices and provides detailed health insights.",
    testing_link: "https://testflight.apple.com/join/fittracker",
    ios_link: "https://testflight.apple.com/join/fittracker-ios",
    android_link: "https://play.google.com/store/apps/testing/fittracker",
    testing_instruction: "Key testing areas:\n1. Workout creation and tracking\n2. Nutrition logging and calorie tracking\n3. Social features and challenges\n4. Device synchronization\n5. Progress charts and analytics\n6. Goal setting and achievements\n\nTest with different workout types and check data accuracy.",
    test_price: 30,
    instructions: "Test all fitness tracking features and device integrations",
    youtube_link: "https://youtube.com/watch?v=fittracker-preview",
    max_testers: 20,
    icon_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center",
    cover_image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=600&fit=crop"
    ],
    user_info: {
      username: "fitness_innovate",
      profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      slack_user_id: "U02FITNESS456"
    }
  },
  {
    app_name: "StudyBuddy AI",
    description: "AI-powered study companion that creates personalized learning plans, generates practice quizzes, and helps students organize their academic life. Perfect for high school and university students.",
    testing_link: "https://testflight.apple.com/join/studybuddy",
    ios_link: "https://testflight.apple.com/join/studybuddy-ios",
    android_link: "https://play.google.com/store/apps/testing/studybuddy",
    testing_instruction: "Testing focus areas:\n1. Create study plans for different subjects\n2. Test the AI quiz generation feature\n3. Try the flashcard system\n4. Test note-taking and organization\n5. Check calendar integration\n6. Test progress tracking\n\nPlease test with various academic subjects.",
    test_price: 20,
    instructions: "Focus on AI features and study organization tools",
    youtube_link: "https://youtube.com/watch?v=studybuddy-ai",
    max_testers: 12,
    icon_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&crop=center",
    cover_image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=600&fit=crop"
    ],
    user_info: {
      username: "edutech_labs",
      profile_image: "https://images.unsplash.com/photo-1494790108755-2616b25a4b7a?w=150&h=150&fit=crop&crop=face",
      slack_user_id: "U04EDU012345"
    }
  },
  {
    app_name: "PhotoEdit Master",
    description: "Professional photo editing app with AI-powered tools, advanced filters, and creative effects. Features RAW support, batch processing, and seamless cloud synchronization.",
    testing_link: "https://testflight.apple.com/join/photoedit",
    ios_link: "https://testflight.apple.com/join/photoedit-ios",
    android_link: "https://play.google.com/store/apps/testing/photoedit",
    testing_instruction: "Testing priorities:\n1. Basic editing tools (crop, rotate, adjust)\n2. AI-powered auto-enhancement features\n3. Filter and effect application\n4. RAW file support and processing\n5. Batch editing capabilities\n6. Cloud sync and backup\n7. Export quality and formats\n\nTest with various image types and sizes.",
    test_price: 35,
    instructions: "Test all editing features with different image types",
    youtube_link: "https://youtube.com/watch?v=photoedit-demo",
    max_testers: 18,
    icon_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=150&h=150&fit=crop&crop=center",
    cover_image_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=400&fit=crop",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=300&h=600&fit=crop"
    ],
    user_info: {
      username: "creative_studio",
      profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      slack_user_id: "U03CREATIVE789"
    }
  },
  {
    app_name: "MindMeditator",
    description: "Comprehensive meditation and mindfulness app with guided sessions, breathing exercises, sleep stories, and progress tracking. Features personalized recommendations and offline content.",
    testing_link: "https://testflight.apple.com/join/mindmeditator",
    ios_link: "https://testflight.apple.com/join/mindmeditator-ios", 
    android_link: "https://play.google.com/store/apps/testing/mindmeditator",
    testing_instruction: "Test these key features:\n1. Guided meditation sessions of various lengths\n2. Breathing exercise tools\n3. Sleep stories and sounds\n4. Progress tracking and streaks\n5. Personalized recommendations\n6. Offline download functionality\n7. Reminder and notification settings\n\nFocus on audio quality and user experience.",
    test_price: 15,
    instructions: "Test meditation features and audio quality",
    youtube_link: "https://youtube.com/watch?v=mindmeditator-guide",
    max_testers: 10,
    icon_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center",
    cover_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?w=300&h=600&fit=crop"
    ],
    user_info: {
      username: "zen_developers",
      profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      slack_user_id: "U05ZEN678901"
    }
  },
  {
    app_name: "RecipeGenius",
    description: "Smart cooking companion that generates personalized recipes based on available ingredients, dietary preferences, and cooking skills. Features step-by-step instructions and nutritional information.",
    testing_link: "https://testflight.apple.com/join/recipegenius",
    ios_link: "https://testflight.apple.com/join/recipegenius-ios",
    android_link: "https://play.google.com/store/apps/testing/recipegenius",
    testing_instruction: "Testing focus:\n1. Ingredient-based recipe suggestions\n2. Dietary filter functionality (vegan, gluten-free, etc.)\n3. Step-by-step cooking instructions\n4. Nutritional information display\n5. Shopping list generation\n6. Recipe saving and favorites\n7. Cooking timer integration\n\nTest with various ingredient combinations.",
    test_price: 22,
    instructions: "Test recipe generation and cooking guidance features",
    youtube_link: "https://youtube.com/watch?v=recipegenius-cooking",
    max_testers: 14,
    icon_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center",
    cover_image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300&h=600&fit=crop"
    ],
    user_info: {
      username: "culinary_tech",
      profile_image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=150&h=150&fit=crop&crop=face",
      slack_user_id: "U06CULINARY234"
    }
  }
];

async function addTestApps() {
  try {
    console.log('🚀 Starting to add test apps to database...');
    
    for (const app of testApps) {
      const testPostId = uuidv4();
      const slackUserId = app.user_info.slack_user_id;
      let userId = uuidv4(); // Generate a unique user ID
      
      // First, ensure user exists
      const existingUser = await db.findOne('users', { slack_user_id: slackUserId });
      if (!existingUser) {
        try {
          await db.insert('users', {
            id: userId,
            slack_user_id: slackUserId,
            username: app.user_info.username,
            display_name: app.user_info.username,
            email: `${app.user_info.username}@slack.local`,
            avatar_url: app.user_info.profile_image,
            owned_coins: 100,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          });
          console.log(`✅ Created user: ${app.user_info.username} (Slack: ${slackUserId})`);
        } catch (userError) {
          if (userError.code === 11000) {
            // Duplicate key error - user might already exist with different slack_user_id
            console.log(`⚠️ User ${app.user_info.username} already exists, using existing user`);
            const existingByUsername = await db.findOne('users', { username: app.user_info.username });
            if (existingByUsername) {
              userId = existingByUsername.id;
            }
          } else {
            throw userError;
          }
        }
      } else {
        // Use existing user's ID
        userId = existingUser.id;
        console.log(`✅ Using existing user: ${app.user_info.username} (Slack: ${slackUserId})`);
      }
      
      // Create the test post
      await db.insert('test_posts', {
        id: testPostId,
        user_id: userId,
        app_name: app.app_name,
        description: app.description,
        testing_link: app.testing_link,
        android_link: app.android_link,
        ios_link: app.ios_link,
        testing_instruction: app.testing_instruction,
        test_price: app.test_price,
        instructions: app.instructions,
        youtube_link: app.youtube_link,
        google_group_link: null,
        max_testers: app.max_testers,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        icon_url: app.icon_url,
        cover_image_url: app.cover_image_url,
        screenshot_urls: app.screenshot_urls,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      });
      
      console.log(`✅ Created test post: ${app.app_name} (ID: ${testPostId}) for Slack user: ${slackUserId}`);
    }
    
    console.log('🎉 Successfully added all test apps!');
    console.log(`📊 Total apps added: ${testApps.length}`);
    
  } catch (error) {
    console.error('❌ Error adding test apps:', error);
  }
}

// Run the script
addTestApps().then(() => {
  console.log('✅ Script completed!');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
