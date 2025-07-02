(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/AppSquareCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const AppSquareCard = ({ app, route })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative aspect-square bg-gray-200 rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
        onClick: ()=>window.location.href = route,
        children: [
            app.coverImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: app.coverImageUrl,
                alt: app.name,
                className: "w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/components/AppSquareCard.tsx",
                lineNumber: 13,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-white text-lg font-semibold",
                    children: app.name
                }, void 0, false, {
                    fileName: "[project]/components/AppSquareCard.tsx",
                    lineNumber: 20,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AppSquareCard.tsx",
                lineNumber: 19,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-0 left-0 right-0 p-4 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-lg mb-1",
                            children: app.name
                        }, void 0, false, {
                            fileName: "[project]/components/AppSquareCard.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm opacity-90 line-clamp-2",
                            children: app.description
                        }, void 0, false, {
                            fileName: "[project]/components/AppSquareCard.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AppSquareCard.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AppSquareCard.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AppSquareCard.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
};
_c = AppSquareCard;
const __TURBOPACK__default__export__ = AppSquareCard;
var _c;
__turbopack_context__.k.register(_c, "AppSquareCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/AppCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
const AppCard = ({ app })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>window.location.href = `/explore/detail/${app.id}`,
        className: "w-full ",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-xl group cursor-pointer bg-white pb-9 pt-9 px-5 rounded-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-64 w-full bg-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: app.coverImageUrl,
                        alt: `Screenshot of ${app.name}`,
                        layout: "fill",
                        objectFit: "cover",
                        className: " transition-opacity duration-300 group-hover:opacity-90"
                    }, void 0, false, {
                        fileName: "[project]/components/AppCard.tsx",
                        lineNumber: 10,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AppCard.tsx",
                    lineNumber: 9,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-semibold",
                            children: app.name
                        }, void 0, false, {
                            fileName: "[project]/components/AppCard.tsx",
                            lineNumber: 19,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between text-gray-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: app.creator.name
                                }, void 0, false, {
                                    fileName: "[project]/components/AppCard.tsx",
                                    lineNumber: 21,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: app.price
                                }, void 0, false, {
                                    fileName: "[project]/components/AppCard.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AppCard.tsx",
                            lineNumber: 20,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AppCard.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, this)
            ]
        }, app.id, true, {
            fileName: "[project]/components/AppCard.tsx",
            lineNumber: 8,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AppCard.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
};
_c = AppCard;
const __TURBOPACK__default__export__ = AppCard;
var _c;
__turbopack_context__.k.register(_c, "AppCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
 // Exporting both the component and the type
}}),
"[project]/components/AppListCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
const AppListCard = ({ app })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>window.location.href = `/explore/detail/${app.id}`,
        className: "flex items-center justify-between rounded-md border border-gray-200 p-4 hover:bg-gray-50 bg-white transition-colors duration-200 cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-12 w-12 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: app.iconUrl,
                            alt: `Icon for ${app.name}`,
                            layout: "fill",
                            objectFit: "cover"
                        }, void 0, false, {
                            fileName: "[project]/components/AppListCard.tsx",
                            lineNumber: 11,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/AppListCard.tsx",
                        lineNumber: 10,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-800",
                                children: app.name
                            }, void 0, false, {
                                fileName: "[project]/components/AppListCard.tsx",
                                lineNumber: 14,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: app.creator.name
                            }, void 0, false, {
                                fileName: "[project]/components/AppListCard.tsx",
                                lineNumber: 15,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AppListCard.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AppListCard.tsx",
                lineNumber: 9,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-medium text-gray-700",
                children: app.price
            }, void 0, false, {
                fileName: "[project]/components/AppListCard.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this)
        ]
    }, app.id, true, {
        fileName: "[project]/components/AppListCard.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, this);
};
_c = AppListCard;
const __TURBOPACK__default__export__ = AppListCard;
var _c;
__turbopack_context__.k.register(_c, "AppListCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/MockData.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "allApps": (()=>allApps)
});
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
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
 // Exporting the allApps array for use in other components
}}),
"[project]/app/explore/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AppCard.tsx [app-client] (ecmascript)"); // Import the AppCard component
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AppListCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/MockData.tsx [app-client] (ecmascript)"); // Import the mock data for apps
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client'; // This directive is necessary for using hooks like useState
;
;
;
;
;
;
// Define the structure for an app object
// Mock data for the apps. In a real application, you would fetch this from an API.
// --- DATA STRUCTURE AND MOCK DATA ---
// Expanded data structure for the app details page.
// Expanded mock data for the apps.
/**
 * ExplorePageContent Component
 * This component displays featured apps and a searchable list of all apps.
 * It's designed to be placed within a layout that already provides a header.
 */ const ExplorePageContent = ({ onSelectApp })=>{
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const featuredApps = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"].slice(0, 4);
    const filteredApps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ExplorePageContent.useMemo[filteredApps]": ()=>{
            const lowercasedQuery = searchQuery.toLowerCase();
            if (!lowercasedQuery) return __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"];
            return __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"].filter({
                "ExplorePageContent.useMemo[filteredApps]": (app)=>app.name.toLowerCase().includes(lowercasedQuery) || app.creator.name.toLowerCase().includes(lowercasedQuery)
            }["ExplorePageContent.useMemo[filteredApps]"]);
        }
    }["ExplorePageContent.useMemo[filteredApps]"], [
        searchQuery
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex-1 bg-gray-100 text-gray-800  overflow-y-auto animate-fade-in h-screen my-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-8 py-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "overflow-x-auto w-screen",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full gap-8 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
                        style: {
                            WebkitOverflowScrolling: 'touch'
                        },
                        children: featuredApps.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                app: app
                            }, app.id, false, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/explore/page.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/explore/page.tsx",
                    lineNumber: 45,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                    className: "my-15  border-gray-200"
                }, void 0, false, {
                    fileName: "[project]/app/explore/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mx-auto max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 bg-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Search by app name or creator...",
                                className: "w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/explore/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: filteredApps.length > 0 ? filteredApps.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppListCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    app: app
                                }, app.id, false, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-500",
                                    children: [
                                        'No apps found for "',
                                        searchQuery,
                                        '"'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 50
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/explore/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/explore/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/explore/page.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/explore/page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
};
_s(ExplorePageContent, "gF0fM+Ar0M8uEMFvtlxEf+Z2kCU=");
_c = ExplorePageContent;
// Wrapper component that handles authentication
const ExplorePage = ()=>{
    _s1();
    const { isAuthenticated, isLoading, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExplorePage.useEffect": ()=>{
            console.log('ExplorePage: isLoading =', isLoading, 'isAuthenticated =', isAuthenticated, 'user =', user);
            // Only redirect if we're done loading and definitely not authenticated
            if (!isLoading && !isAuthenticated) {
                console.log('ExplorePage: Redirecting to signin...');
                router.push('/signin');
            }
        }
    }["ExplorePage.useEffect"], [
        isAuthenticated,
        isLoading,
        router,
        user
    ]);
    if (isLoading) {
        console.log('ExplorePage: Showing loading state...');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/explore/page.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/explore/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/explore/page.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this);
    }
    if (!isAuthenticated) {
        console.log('ExplorePage: Not authenticated, will redirect...');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "Redirecting to sign in..."
                }, void 0, false, {
                    fileName: "[project]/app/explore/page.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/explore/page.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, this);
    }
    console.log('ExplorePage: Authenticated, showing content...');
    const handleSelectApp = (id)=>{
        router.push(`/explore/detail/${id}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExplorePageContent, {
        onSelectApp: handleSelectApp
    }, void 0, false, {
        fileName: "[project]/app/explore/page.tsx",
        lineNumber: 117,
        columnNumber: 10
    }, this);
};
_s1(ExplorePage, "UGkbzpeJOLBfWXlF0P6hHCfoRRA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = ExplorePage;
const __TURBOPACK__default__export__ = ExplorePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExplorePageContent");
__turbopack_context__.k.register(_c1, "ExplorePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/joined/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppSquareCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AppSquareCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$explore$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/explore/page.tsx [app-client] (ecmascript)"); // Importing mock data for apps
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// --- Helper Components ---
// Icon for the plus button, using SVG for a clean look
const PlusIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-gray-500",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 4v16m8-8H4"
        }, void 0, false, {
            fileName: "[project]/app/joined/page.tsx",
            lineNumber: 11,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/joined/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
_c = PlusIcon;
// A placeholder card for adding new apps
const AddNewAppCard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>window.location.href = `/myapps/detail/new`,
        className: "flex items-center justify-center aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-200transition-colors duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlusIcon, {}, void 0, false, {
            fileName: "[project]/app/joined/page.tsx",
            lineNumber: 30,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/joined/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
_c1 = AddNewAppCard;
function App() {
    _s();
    // --- State Management ---
    const [apps, setApps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Username');
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedApp, setSelectedApp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // --- Mock Data ---
    // In a real application, you would fetch this data from an API.
    const myApps = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$explore$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"].slice(2, 5); // Simulating a subset of apps for the user
    // --- Event Handlers ---
    const handleAppClick = (app)=>{
        setSelectedApp(app);
        // In a real app, you might navigate to the app's page
        // or open a more detailed modal here.
        alert(`You clicked on ${app.name}`);
    };
    const handleAddNewApp = ()=>{
        window.location.href = '/myapps/new';
    };
    // --- Render Method ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 text-gray-800 font-sans",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto p-4 sm:p-6 lg:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl sm:text-2xl font-semibold mb-6 sm:mb-8",
                        children: "Joined Tests"
                    }, void 0, false, {
                        fileName: "[project]/app/joined/page.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6",
                        children: [
                            myApps.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppSquareCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    app: app,
                                    route: `/test-instruction/${app.id}`
                                }, app.id, false, {
                                    fileName: "[project]/app/joined/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 29
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddNewAppCard, {}, void 0, false, {
                                fileName: "[project]/app/joined/page.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/joined/page.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/joined/page.tsx",
                lineNumber: 68,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/joined/page.tsx",
            lineNumber: 64,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/joined/page.tsx",
        lineNumber: 63,
        columnNumber: 9
    }, this);
}
_s(App, "mUD5d0ZO2CqTggRh8gkX0K+oxLA=");
_c2 = App;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PlusIcon");
__turbopack_context__.k.register(_c1, "AddNewAppCard");
__turbopack_context__.k.register(_c2, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_64c02499._.js.map