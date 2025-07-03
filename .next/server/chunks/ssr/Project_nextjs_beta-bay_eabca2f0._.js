module.exports = {

"[project]/Project/nextjs/beta-bay/.next-internal/server/app/notification/detail/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/Project/nextjs/beta-bay/public/MockData.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "allApps": (()=>allApps),
    "initialNotifications": (()=>initialNotifications)
});
//for just testing, you can remove whenever you want
const allApps = [
    {
        id: 1,
        name: 'Stellar Navigator',
        creator: {
            name: 'CosmoDev',
            avatarUrl: 'https://placehold.co/40x40/2D3748/FFFFFF?text=C',
            slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1'
        },
        price: '$4.99',
        coins: 500,
        coverImageUrl: 'https://placehold.co/1200x400/2D3748/FFFFFF?text=Stellar+Navigator',
        iconUrl: 'https://placehold.co/150x150/2D3748/FFFFFF?text=SN',
        description: 'Explore the vastness of space with Stellar Navigator. Chart new galaxies, discover unknown planets, and trade resources in this epic space exploration simulator. Built with a realistic physics engine and stunning visuals.',
        screenshots: [
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Galaxy+View',
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Planet+Surface',
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Trading+Post',
            'https://placehold.co/600x400/2D3748/FFFFFF?text=Ship+Cockpit'
        ],
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        reviews: [
            {
                id: 1,
                reviewerName: 'GalacticGamer',
                score: 5,
                comment: 'Absolutely breathtaking! A must-have for any space enthusiast.'
            },
            {
                id: 2,
                reviewerName: 'AstroJunkie',
                score: 4,
                comment: 'Great game, but the trading system could be improved.'
            }
        ],
        joinedTesters: [
            {
                id: 1,
                name: 'TestPilot1',
                avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=T1'
            },
            {
                id: 2,
                name: 'ExplorerX',
                avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=EX'
            }
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
        feedbackInstructions: 'Submit daily feedback via Google Forms'
    },
    {
        id: 2,
        name: 'Aqua Planner',
        creator: {
            name: 'Oceanic Builds',
            avatarUrl: 'https://placehold.co/40x40/4A5568/FFFFFF?text=O',
            slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1'
        },
        price: 'Free',
        coverImageUrl: 'https://placehold.co/1200x400/4A5568/FFFFFF?text=Aqua+Planner',
        iconUrl: 'https://placehold.co/150x150/4A5568/FFFFFF?text=AP',
        description: 'Organize your life with Aqua Planner, the fluid and intuitive task manager. With a clean interface and powerful features, you can manage projects, set reminders, and collaborate with your team seamlessly.',
        screenshots: [
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Dashboard',
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Task+View',
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Calendar',
            'https://placehold.co/600x400/4A5568/FFFFFF?text=Collaboration'
        ],
        reviews: [
            {
                id: 1,
                reviewerName: 'ProductivityPro',
                score: 5,
                comment: 'The best planner I have ever used. Changed my workflow completely.'
            }
        ],
        joinedTesters: [
            {
                id: 1,
                name: 'BetaUser',
                avatarUrl: 'https://placehold.co/40x40/A0AEC0/FFFFFF?text=BU'
            }
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
        feedbackInstructions: 'Submit daily feedback via Google Forms'
    },
    {
        id: 3,
        name: 'Neon Racer',
        creator: {
            name: 'SpeedForge',
            avatarUrl: 'https://placehold.co/40x40/7C3AED/FFFFFF?text=SF',
            slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1'
        },
        price: '$9.99',
        coins: 750,
        coverImageUrl: 'https://placehold.co/1200x400/7C3AED/FFFFFF?text=Neon+Racer',
        iconUrl: 'https://placehold.co/150x150/7C3AED/FFFFFF?text=NR',
        description: 'Experience high-speed cyberpunk racing in Neon Racer. Navigate through futuristic cityscapes, customize your vehicles, and compete in underground tournaments. Features stunning neon visuals and electronic soundtrack.',
        screenshots: [
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=Night+Race',
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=Car+Garage',
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=City+Track',
            'https://placehold.co/600x400/7C3AED/FFFFFF?text=Tournament'
        ],
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        reviews: [
            {
                id: 1,
                reviewerName: 'SpeedDemon',
                score: 5,
                comment: 'The graphics are insane! Best racing game this year.'
            },
            {
                id: 2,
                reviewerName: 'CyberPunkFan',
                score: 4,
                comment: 'Love the aesthetic and music, controls could be tighter.'
            },
            {
                id: 3,
                reviewerName: 'RaceKing',
                score: 5,
                comment: 'Addictive gameplay, spent hours customizing my ride!'
            }
        ],
        joinedTesters: [
            {
                id: 1,
                name: 'TurboTester',
                avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=TT'
            },
            {
                id: 2,
                name: 'NeonFan',
                avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=NF'
            },
            {
                id: 3,
                name: 'RaceReviewer',
                avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=RR'
            }
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
        feedbackInstructions: 'Submit daily feedback via Google Forms'
    },
    {
        id: 4,
        name: 'Mindful Meditation',
        creator: {
            name: 'Zen Studios',
            avatarUrl: 'https://placehold.co/40x40/059669/FFFFFF?text=ZS',
            slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1'
        },
        price: '$2.99',
        coins: 200,
        coverImageUrl: 'https://placehold.co/1200x400/059669/FFFFFF?text=Mindful+Meditation',
        iconUrl: 'https://placehold.co/150x150/059669/FFFFFF?text=MM',
        description: 'Find inner peace with Mindful Meditation. Guided sessions, breathing exercises, and nature sounds help you reduce stress and improve focus. Perfect for beginners and experienced practitioners alike.',
        screenshots: [
            'https://placehold.co/600x400/059669/FFFFFF?text=Meditation+Timer',
            'https://placehold.co/600x400/059669/FFFFFF?text=Guided+Sessions',
            'https://placehold.co/600x400/059669/FFFFFF?text=Nature+Sounds',
            'https://placehold.co/600x400/059669/FFFFFF?text=Progress+Track'
        ],
        reviews: [
            {
                id: 1,
                reviewerName: 'CalmSeeker',
                score: 5,
                comment: 'This app has genuinely improved my mental health. Highly recommend!'
            },
            {
                id: 2,
                reviewerName: 'StressedOut',
                score: 4,
                comment: 'Great for daily meditation, love the nature sounds feature.'
            }
        ],
        joinedTesters: [
            {
                id: 1,
                name: 'ZenMaster',
                avatarUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=ZM'
            },
            {
                id: 2,
                name: 'PeacefulSoul',
                avatarUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=PS'
            }
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
        feedbackInstructions: 'Submit daily feedback via Google Forms'
    },
    {
        id: 5,
        name: 'Code Quest',
        creator: {
            name: 'DevAcademy',
            avatarUrl: 'https://placehold.co/40x40/DC2626/FFFFFF?text=DA',
            slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1'
        },
        price: 'Free',
        coverImageUrl: 'https://placehold.co/1200x400/DC2626/FFFFFF?text=Code+Quest',
        iconUrl: 'https://placehold.co/150x150/DC2626/FFFFFF?text=CQ',
        description: 'Learn programming through gamification with Code Quest. Solve coding challenges, unlock achievements, and progress through different difficulty levels. Supports multiple programming languages including Python, JavaScript, and Java.',
        screenshots: [
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Challenge+Mode',
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Code+Editor',
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Progress+Map',
            'https://placehold.co/600x400/DC2626/FFFFFF?text=Leaderboard'
        ],
        reviews: [
            {
                id: 1,
                reviewerName: 'CodeNewbie',
                score: 5,
                comment: 'Finally learning to code is fun! Great for beginners.'
            },
            {
                id: 2,
                reviewerName: 'DevMentor',
                score: 4,
                comment: 'Good concept, would love to see more advanced challenges.'
            },
            {
                id: 3,
                reviewerName: 'StudentCoder',
                score: 5,
                comment: 'This helped me pass my programming course!'
            }
        ],
        joinedTesters: [
            {
                id: 1,
                name: 'BugHunter',
                avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=BH'
            },
            {
                id: 2,
                name: 'CodeMaster',
                avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=CM'
            },
            {
                id: 3,
                name: 'AlgorithmAce',
                avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=AA'
            }
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
        feedbackInstructions: 'Submit daily feedback via Google Forms'
    },
    {
        id: 6,
        name: 'Chef\'s Kitchen',
        creator: {
            name: 'Culinary Craft',
            avatarUrl: 'https://placehold.co/40x40/EA580C/FFFFFF?text=CC',
            slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1'
        },
        price: '$6.99',
        coins: 450,
        coverImageUrl: 'https://placehold.co/1200x400/EA580C/FFFFFF?text=Chef+Kitchen',
        iconUrl: 'https://placehold.co/150x150/EA580C/FFFFFF?text=CK',
        description: 'Master the art of cooking with Chef\'s Kitchen. Follow step-by-step recipes, learn cooking techniques, and manage your own virtual restaurant. Features realistic food physics and ingredient interactions.',
        screenshots: [
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Recipe+Book',
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Cooking+Station',
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Restaurant+View',
            'https://placehold.co/600x400/EA580C/FFFFFF?text=Ingredient+Prep'
        ],
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        reviews: [
            {
                id: 1,
                reviewerName: 'FoodLover',
                score: 5,
                comment: 'Amazing cooking simulator! The recipes actually work in real life.'
            },
            {
                id: 2,
                reviewerName: 'ChefWannabe',
                score: 4,
                comment: 'Great for learning cooking basics, very detailed tutorials.'
            },
            {
                id: 3,
                reviewerName: 'RestaurantOwner',
                score: 5,
                comment: 'Love the restaurant management aspect!'
            }
        ],
        joinedTesters: [
            {
                id: 1,
                name: 'SousChef',
                avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=SC'
            },
            {
                id: 2,
                name: 'FoodCritic',
                avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=FC'
            },
            {
                id: 3,
                name: 'CulinaryStudent',
                avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=CS'
            }
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
        feedbackInstructions: 'Submit daily feedback via Google Forms'
    }
];
const initialNotifications = [
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
;
 // Exporting the allApps array and initialNotifications for use in other components
}}),
"[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/public/MockData.tsx [app-rsc] (ecmascript)");
;
;
const page = ({ params })=>{
    const { id } = params;
    const allNotifications = __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initialNotifications"];
    const notification = allNotifications.find((n)=>n.id === id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-6",
                    children: "Notification Detail"
                }, void 0, false, {
                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: "Title:"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg",
                                    children: notification?.title
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 23,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                            lineNumber: 21,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: "Message:"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 27,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base",
                                    children: notification?.message
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 28,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                            lineNumber: 26,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: "Date:"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 32,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base",
                                    children: notification?.timestamp
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 33,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: "Status:"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 37,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full",
                                    children: notification?.read ? 'Read' : 'Unread'
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                            lineNumber: 36,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                                    onClick: ()=>{
                                        if (notification) {
                                            notification.read = true;
                                            window.location.href = '/notification';
                                        }
                                    },
                                    children: "Mark as Read"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300",
                                    children: "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
            lineNumber: 17,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
};
const __TURBOPACK__default__export__ = page;
}}),
"[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript, Next.js server utility)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)"));}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript)"));
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript)"));
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript)"));
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)"));}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript, Next.js server utility)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript)"));}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <module evaluation>": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript) <module evaluation>"));}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => \"[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "__next_app__": (()=>__next_app__),
    "pages": (()=>pages),
    "routeModule": (()=>routeModule),
    "tree": (()=>tree)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i('[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => "[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)" } [app-rsc] (structured image object, ecmascript, Next.js server component)');
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <module evaluation>");
;
;
;
;
;
;
;
;
;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = [
    "",
    {
        "children": [
            "notification",
            {
                "children": [
                    "detail",
                    {
                        "children": [
                            "[id]",
                            {
                                "children": [
                                    "__PAGE__",
                                    {},
                                    {
                                        metadata: {},
                                        "page": [
                                            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
                                            "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx"
                                        ]
                                    }
                                ]
                            },
                            {
                                metadata: {}
                            }
                        ]
                    },
                    {
                        metadata: {}
                    }
                ]
            },
            {
                metadata: {}
            }
        ]
    },
    {
        metadata: {
            icon: [
                async (props)=>[
                        {
                            url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["fillMetadataSegment"])("//", await props.params, "favicon.ico") + `?${__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__["default"].src.split("/").splice(-1)[0]}`,
                            sizes: `${__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__["default"].width}x${__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__["default"].height}`,
                            type: `image/x-icon`
                        }
                    ]
            ]
        },
        "layout": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/Project/nextjs/beta-bay/app/layout.tsx"
        ],
        "not-found": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js"
        ],
        "forbidden": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js"
        ],
        "unauthorized": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js"
        ]
    }
];
const pages = [
    "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx"
];
;
;
const __next_app_require__ = __turbopack_context__.r;
const __next_app_load_chunk__ = __turbopack_context__.l;
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};
;
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppPageRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
        page: "/notification/detail/[id]/page",
        pathname: "/notification/detail/[id]",
        // The following aren't used in production.
        bundlePath: '',
        filename: '',
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
}); //# sourceMappingURL=app-page.js.map
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => \"[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i('[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => "[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)" } [app-rsc] (structured image object, ecmascript, Next.js server component)');
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => "[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <locals>');
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript)"));}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => \"[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientPageRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ClientPageRoot"]),
    "ClientSegmentRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ClientSegmentRoot"]),
    "GlobalError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["default"]),
    "HTTPAccessFallbackBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["HTTPAccessFallbackBoundary"]),
    "LayoutRouter": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["LayoutRouter"]),
    "MetadataBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["MetadataBoundary"]),
    "OutletBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["OutletBoundary"]),
    "Postpone": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["Postpone"]),
    "RenderFromTemplateContext": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RenderFromTemplateContext"]),
    "ViewportBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ViewportBoundary"]),
    "__next_app__": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__next_app__"]),
    "actionAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["actionAsyncStorage"]),
    "collectSegmentData": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["collectSegmentData"]),
    "createMetadataComponents": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createMetadataComponents"]),
    "createPrerenderParamsForClientSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createPrerenderParamsForClientSegment"]),
    "createPrerenderSearchParamsForClientPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createPrerenderSearchParamsForClientPage"]),
    "createServerParamsForServerSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createServerParamsForServerSegment"]),
    "createServerSearchParamsForServerPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createServerSearchParamsForServerPage"]),
    "createTemporaryReferenceSet": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createTemporaryReferenceSet"]),
    "decodeAction": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeAction"]),
    "decodeFormState": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeFormState"]),
    "decodeReply": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeReply"]),
    "pages": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["pages"]),
    "patchFetch": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["patchFetch"]),
    "preconnect": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preconnect"]),
    "preloadFont": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preloadFont"]),
    "preloadStyle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preloadStyle"]),
    "prerender": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["prerender"]),
    "renderToReadableStream": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["renderToReadableStream"]),
    "routeModule": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["routeModule"]),
    "serverHooks": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["serverHooks"]),
    "taintObjectReference": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["taintObjectReference"]),
    "tree": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tree"]),
    "workAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["workAsyncStorage"]),
    "workUnitAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["workUnitAsyncStorage"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => "[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <locals>');
}}),
"[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => \"[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientPageRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ClientPageRoot"]),
    "ClientSegmentRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ClientSegmentRoot"]),
    "GlobalError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["GlobalError"]),
    "HTTPAccessFallbackBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["HTTPAccessFallbackBoundary"]),
    "LayoutRouter": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["LayoutRouter"]),
    "MetadataBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["MetadataBoundary"]),
    "OutletBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["OutletBoundary"]),
    "Postpone": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Postpone"]),
    "RenderFromTemplateContext": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["RenderFromTemplateContext"]),
    "ViewportBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ViewportBoundary"]),
    "__next_app__": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["__next_app__"]),
    "actionAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["actionAsyncStorage"]),
    "collectSegmentData": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["collectSegmentData"]),
    "createMetadataComponents": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createMetadataComponents"]),
    "createPrerenderParamsForClientSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createPrerenderParamsForClientSegment"]),
    "createPrerenderSearchParamsForClientPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createPrerenderSearchParamsForClientPage"]),
    "createServerParamsForServerSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createServerParamsForServerSegment"]),
    "createServerSearchParamsForServerPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createServerSearchParamsForServerPage"]),
    "createTemporaryReferenceSet": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createTemporaryReferenceSet"]),
    "decodeAction": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["decodeAction"]),
    "decodeFormState": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["decodeFormState"]),
    "decodeReply": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["decodeReply"]),
    "pages": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["pages"]),
    "patchFetch": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["patchFetch"]),
    "preconnect": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["preconnect"]),
    "preloadFont": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["preloadFont"]),
    "preloadStyle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["preloadStyle"]),
    "prerender": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["prerender"]),
    "renderToReadableStream": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["renderToReadableStream"]),
    "routeModule": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["routeModule"]),
    "serverHooks": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["serverHooks"]),
    "taintObjectReference": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["taintObjectReference"]),
    "tree": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["tree"]),
    "workAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["workAsyncStorage"]),
    "workUnitAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["workUnitAsyncStorage"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => "[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$notification$2f$detail$2f5b$id$5d2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$app$2f$notification$2f$detail$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/Project/nextjs/beta-bay/node_modules/next/dist/esm/build/templates/app-page.js?page=/notification/detail/[id]/page { METADATA_0 => "[project]/Project/nextjs/beta-bay/app/favicon.ico.mjs { IMAGE => \\"[project]/Project/nextjs/beta-bay/app/favicon.ico (static in ecmascript)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/Project/nextjs/beta-bay/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/Project/nextjs/beta-bay/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/Project/nextjs/beta-bay/app/notification/detail/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <exports>');
}}),

};

//# sourceMappingURL=Project_nextjs_beta-bay_eabca2f0._.js.map