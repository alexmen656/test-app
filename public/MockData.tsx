import { App, Notification } from '@/types';
//for just testing, you can remove whenever you want


const allApps: App[] = [
    {
        id: 1,
        name: 'Stellar Navigator',
        creator: { name: 'CosmoDev', avatarUrl: 'https://placehold.co/40x40/2D3748/FFFFFF?text=C', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
        price: '$4.99',
        coins: 500,
        coverImageUrl: 'https://placehold.co/1200x400/2D3748/FFFFFF?text=Stellar+Navigator',
        iconUrl: 'https://placehold.co/150x150/2D3748/FFFFFF?text=SN',
        description: 'Explore the vastness of space with Stellar Navigator. Chart new galaxies, discover unknown planets, and trade resources in this epic space exploration simulator. Built with a realistic physics engine and stunning visuals.',
        screenshots: [
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Galaxy+View',
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Planet+Surface',
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Trading+Post',
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Ship+Cockpit',
        ],
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        reviews: [
            { id: 1, reviewerName: 'GalacticGamer', score: 5, comment: 'Absolutely breathtaking! A must-have for any space enthusiast.' },
            { id: 2, reviewerName: 'AstroJunkie', score: 4, comment: 'Great game, but the trading system could be improved.' },
        ],
        joinedTesters: [
            { id: 1, name: 'TestPilot1', avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=T1' },
            { id: 2, name: 'ExplorerX', avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=EX' },
        ],
        iosLink: 'https://apps.apple.com/app/id1234567890',
        testingInstruction: '',
        androidLink: 'https://play.google.com/store/apps/details?id=com.stellarnavigator',
        googleGroupLink: 'https://groups.google.com/g/stellar-navigator-testers',
        testingFocus: 'Space exploration mechanics and galaxy navigation',
        focusAreas: [
            'Galaxy navigation and exploration features',
            'Planet discovery and resource trading',
            'Spacecraft controls and physics simulation',
            'Visual effects and stellar rendering'
        ],
        subtitle: 'Help us perfect the next generation of space exploration',
        createdAt: '2023-10-01T12:00:00Z',
        testPeriod: '14 Days',
        feedbackInstructions: 'Submit daily feedback via Google Forms',
    },
    {
        id: 2,
        name: 'Aqua Planner',
        creator: { name: 'Oceanic Builds', avatarUrl: 'https://placehold.co/40x40/4A5568/FFFFFF?text=O', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
        price: 'Free',
        coverImageUrl: 'https://placehold.co/1200x400/4A5568/FFFFFF?text=Aqua+Planner',
        iconUrl: 'https://placehold.co/150x150/4A5568/FFFFFF?text=AP',
        description: 'Organize your life with Aqua Planner, the fluid and intuitive task manager. With a clean interface and powerful features, you can manage projects, set reminders, and collaborate with your team seamlessly.',
        screenshots: [
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Dashboard',
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Task+View',
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Calendar',
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Collaboration',
        ],
        reviews: [
            { id: 1, reviewerName: 'ProductivityPro', score: 5, comment: 'The best planner I have ever used. Changed my workflow completely.' },
        ],
        joinedTesters: [
            { id: 1, name: 'BetaUser', avatarUrl: 'https://placehold.co/40x40/A0AEC0/FFFFFF?text=BU' },
        ],
        iosLink: 'https://apps.apple.com/app/id2345678901',
        testingInstruction: '',
        androidLink: 'https://play.google.com/store/apps/details?id=com.aquaplanner',
        googleGroupLink: 'https://groups.google.com/g/aqua-planner-testers',
        testingFocus: 'Task management and productivity features',
        focusAreas: [
            'Task creation and organization',
            'Calendar integration and reminders',
            'Team collaboration features',
            'Interface responsiveness and usability'
        ],
        subtitle: 'Help us create the ultimate productivity experience',
        createdAt: '2023-10-01T12:00:00Z',
        testPeriod: '14 Days',
        feedbackInstructions: 'Submit daily feedback via Google Forms',
    },
    {
        id: 3,
        name: 'Neon Racer',
        creator: { name: 'SpeedForge', avatarUrl: 'https://placehold.co/40x40/7C3AED/FFFFFF?text=SF', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
        price: '$9.99',
        coins: 750,
        coverImageUrl: 'https://placehold.co/1200x400/7C3AED/FFFFFF?text=Neon+Racer',
        iconUrl: 'https://placehold.co/150x150/7C3AED/FFFFFF?text=NR',
        description: 'Experience high-speed cyberpunk racing in Neon Racer. Navigate through futuristic cityscapes, customize your vehicles, and compete in underground tournaments. Features stunning neon visuals and electronic soundtrack.',
        screenshots: [
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=Night+Race',
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=Car+Garage',
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=City+Track',
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=Tournament',
        ],
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        reviews: [
            { id: 1, reviewerName: 'SpeedDemon', score: 5, comment: 'The graphics are insane! Best racing game this year.' },
            { id: 2, reviewerName: 'CyberPunkFan', score: 4, comment: 'Love the aesthetic and music, controls could be tighter.' },
            { id: 3, reviewerName: 'RaceKing', score: 5, comment: 'Addictive gameplay, spent hours customizing my ride!' },
        ],
        joinedTesters: [
            { id: 1, name: 'TurboTester', avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=TT' },
            { id: 2, name: 'NeonFan', avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=NF' },
            { id: 3, name: 'RaceReviewer', avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=RR' },
        ],
        iosLink: 'https://apps.apple.com/app/id3456789012',
        testingInstruction: '',
        androidLink: 'https://play.google.com/store/apps/details?id=com.neonracer',
        googleGroupLink: 'https://groups.google.com/g/neon-racer-testers',
        testingFocus: 'Racing mechanics and cyberpunk visual effects',
        focusAreas: [
            'High-speed racing mechanics and controls',
            'Cyberpunk visual effects and neon lighting',
            'Vehicle customization and upgrades',
            'Underground tournament gameplay'
        ],
        subtitle: 'Help us perfect the ultimate cyberpunk racing experience',
        createdAt: '2023-10-01T12:00:00Z',
        testPeriod: '14 Days',
        feedbackInstructions: 'Submit daily feedback via Google Forms',
    },
    {
        id: 4,
        name: 'Mindful Meditation',
        creator: { name: 'Zen Studios', avatarUrl: 'https://placehold.co/40x40/059669/FFFFFF?text=ZS', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
        price: '$2.99',
        coins: 200,
        coverImageUrl: 'https://placehold.co/1200x400/059669/FFFFFF?text=Mindful+Meditation',
        iconUrl: 'https://placehold.co/150x150/059669/FFFFFF?text=MM',
        description: 'Find inner peace with Mindful Meditation. Guided sessions, breathing exercises, and nature sounds help you reduce stress and improve focus. Perfect for beginners and experienced practitioners alike.',
        screenshots: [
            'https://placehold.co/600x400/059669/FFFFFF?text=Meditation+Timer',
            'https://placehold.co/600x400/059669/FFFFFF?text=Guided+Sessions',
            'https://placehold.co/600x400/059669/FFFFFF?text=Nature+Sounds',
            'https://placehold.co/600x400/059669/FFFFFF?text=Progress+Track',
        ],
        reviews: [
            { id: 1, reviewerName: 'CalmSeeker', score: 5, comment: 'This app has genuinely improved my mental health. Highly recommend!' },
            { id: 2, reviewerName: 'StressedOut', score: 4, comment: 'Great for daily meditation, love the nature sounds feature.' },
        ],
        joinedTesters: [
            { id: 1, name: 'ZenMaster', avatarUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=ZM' },
            { id: 2, name: 'PeacefulSoul', avatarUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=PS' },
        ],
        iosLink: 'https://apps.apple.com/app/id4567890123',
        testingInstruction: '',
        androidLink: 'https://play.google.com/store/apps/details?id=com.mindfulmeditation',
        googleGroupLink: 'https://groups.google.com/g/mindful-meditation-testers',
        testingFocus: 'Meditation techniques and user experience',
        focusAreas: [
            'Guided meditation session effectiveness',
            'Breathing exercises usability',
            'Nature sounds quality and variety',
            'User interface and experience'
        ],
        subtitle: 'Help us create a calming meditation experience',
        createdAt: '2023-10-01T12:00:00Z',
        testPeriod: '14 Days',
        feedbackInstructions: 'Submit daily feedback via Google Forms',
    },
    {
        id: 5,
        name: 'Code Quest',
        creator: { name: 'DevAcademy', avatarUrl: 'https://placehold.co/40x40/DC2626/FFFFFF?text=DA', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
        price: 'Free',
        coverImageUrl: 'https://placehold.co/1200x400/DC2626/FFFFFF?text=Code+Quest',
        iconUrl: 'https://placehold.co/150x150/DC2626/FFFFFF?text=CQ',
        description: 'Learn programming through gamification with Code Quest. Solve coding challenges, unlock achievements, and progress through different difficulty levels. Supports multiple programming languages including Python, JavaScript, and Java.',
        screenshots: [
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Challenge+Mode',
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Code+Editor',
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Progress+Map',
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Leaderboard',
        ],
        reviews: [
            { id: 1, reviewerName: 'CodeNewbie', score: 5, comment: 'Finally learning to code is fun! Great for beginners.' },
            { id: 2, reviewerName: 'DevMentor', score: 4, comment: 'Good concept, would love to see more advanced challenges.' },
            { id: 3, reviewerName: 'StudentCoder', score: 5, comment: 'This helped me pass my programming course!' },
        ],
        joinedTesters: [
            { id: 1, name: 'BugHunter', avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=BH' },
            { id: 2, name: 'CodeMaster', avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=CM' },
            { id: 3, name: 'AlgorithmAce', avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=AA' },
        ],
        iosLink: 'https://apps.apple.com/app/id5678901234',
        testingInstruction: '',
        androidLink: 'https://play.google.com/store/apps/details?id=com.codequest',
        googleGroupLink: 'https://groups.google.com/g/code-quest-testers',
        testingFocus: 'Learning mechanics and coding challenges',
        focusAreas: [
            'Coding challenge difficulty progression',
            'Code editor functionality',
            'Achievement and progress systems',
            'Educational content quality'
        ],
        subtitle: 'Help us make coding education more engaging',
        createdAt: '2023-10-01T12:00:00Z',
        testPeriod: '14 Days',
        feedbackInstructions: 'Submit daily feedback via Google Forms',
    },
    {
        id: 6,
        name: 'Chef\'s Kitchen',
        creator: { name: 'Culinary Craft', avatarUrl: 'https://placehold.co/40x40/EA580C/FFFFFF?text=CC', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
        price: '$6.99',
        coins: 450,
        coverImageUrl: 'https://placehold.co/1200x400/EA580C/FFFFFF?text=Chef+Kitchen',
        iconUrl: 'https://placehold.co/150x150/EA580C/FFFFFF?text=CK',
        description: 'Master the art of cooking with Chef\'s Kitchen. Follow step-by-step recipes, learn cooking techniques, and manage your own virtual restaurant. Features realistic food physics and ingredient interactions.',
        screenshots: [
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Recipe+Book',
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Cooking+Station',
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Restaurant+View',
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Ingredient+Prep',
        ],
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        reviews: [
            { id: 1, reviewerName: 'FoodLover', score: 5, comment: 'Amazing cooking simulator! The recipes actually work in real life.' },
            { id: 2, reviewerName: 'ChefWannabe', score: 4, comment: 'Great for learning cooking basics, very detailed tutorials.' },
            { id: 3, reviewerName: 'RestaurantOwner', score: 5, comment: 'Love the restaurant management aspect!' },
        ],
        joinedTesters: [
            { id: 1, name: 'SousChef', avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=SC' },
            { id: 2, name: 'FoodCritic', avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=FC' },
            { id: 3, name: 'CulinaryStudent', avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=CS' },
        ],
        iosLink: 'https://apps.apple.com/app/id6789012345',
        testingInstruction: '',
        androidLink: 'https://play.google.com/store/apps/details?id=com.chefskitchen',
        googleGroupLink: 'https://groups.google.com/g/chefs-kitchen-testers',
        testingFocus: 'Cooking simulation and restaurant management',
        focusAreas: [
            'Recipe creation and management',
            'Cooking techniques and tutorials',
            'Restaurant layout and design',
            'Customer interaction and feedback'
        ],
        subtitle: 'Help us create the ultimate cooking experience',
        createdAt: '2023-10-01T12:00:00Z',
        testPeriod: '14 Days',
        feedbackInstructions: 'Submit daily feedback via Google Forms',
    },
];

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "New message from John",
        message: "Hey, are you available for a call?",
        timestamp: "2023-10-01T12:00:00Z",
        read: false
    },
    {
        id: "2",
        title: "Your app has been approved",
        message: "Congratulations! Your app is now live.",
        timestamp: "2023-10-02T08:30:00Z",
        read: true
    },
    {
        id: "3",
        title: "Reminder: Meeting at 3 PM",
        message: "Don't forget about the meeting later today.",
        timestamp: "2023-10-02T10:00:00Z",
        read: false
    }
];

export { allApps, initialNotifications }; // Exporting the allApps array and initialNotifications for use in other components