(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const AppSquareCard = ({ app, route })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative aspect-square bg-gray-200 rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
        onClick: ()=>window.location.href = route,
        children: [
            app.coverImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: app.coverImageUrl,
                alt: app.name,
                className: "w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                lineNumber: 13,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-white text-lg font-semibold",
                    children: app.name
                }, void 0, false, {
                    fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                    lineNumber: 20,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                lineNumber: 19,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-0 left-0 right-0 p-4 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-lg mb-1",
                            children: app.name
                        }, void 0, false, {
                            fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm opacity-90 line-clamp-2",
                            children: app.description
                        }, void 0, false, {
                            fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx",
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
"[project]/Project/nextjs/beta-bay/app/joined/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$AppSquareCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/components/AppSquareCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/public/MockData.tsx [app-client] (ecmascript)"); // Importing mock data for apps
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// --- Helper Components ---
// Icon for the plus button, using SVG for a clean look
const PlusIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-gray-500",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 4v16m8-8H4"
        }, void 0, false, {
            fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
            lineNumber: 11,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
_c = PlusIcon;
// A placeholder card for adding new apps
const AddNewAppCard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>window.location.href = `/myapps/detail/new`,
        className: "flex items-center justify-center aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-200transition-colors duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlusIcon, {}, void 0, false, {
            fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
            lineNumber: 30,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
_c1 = AddNewAppCard;
function App() {
    _s();
    // --- State Management ---
    const [apps, setApps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Username');
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedApp, setSelectedApp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // --- Mock Data ---
    // In a real application, you would fetch this data from an API.
    const myApps = __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"].slice(2, 5); // Simulating a subset of apps for the user
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 text-gray-800 font-sans",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto p-4 sm:p-6 lg:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl sm:text-2xl font-semibold mb-6 sm:mb-8",
                        children: "Joined Tests"
                    }, void 0, false, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6",
                        children: myApps.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$AppSquareCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                app: app,
                                route: `/test-instruction/${app.id}`
                            }, app.id, false, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
                                lineNumber: 74,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
                lineNumber: 68,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
            lineNumber: 64,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project/nextjs/beta-bay/app/joined/page.tsx",
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
}]);

//# sourceMappingURL=Project_nextjs_beta-bay_a5d5343d._.js.map