(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/Project/nextjs/beta-bay/components/FormField.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/FormField.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
/**
 * A reusable form field component for text inputs and textareas.
 */ const FormField = ({ label, id, type = 'text', placeholder, value, onChange, as })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "block text-sm font-medium text-gray-600 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/FormField.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this),
            as === 'textarea' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                id: id,
                name: id,
                rows: 4,
                className: "w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition",
                placeholder: placeholder,
                value: value,
                onChange: onChange
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/FormField.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                id: id,
                name: id,
                className: "w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition",
                placeholder: placeholder,
                value: value,
                onChange: onChange
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/FormField.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project/nextjs/beta-bay/components/FormField.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
_c = FormField;
const __TURBOPACK__default__export__ = FormField;
var _c;
__turbopack_context__.k.register(_c, "FormField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/ImageUpload.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
// --- Dependency Inlined to Fix Resolution Error ---
/**
 * A generic, reusable SVG icon component.
 */ const Icon = ({ path, className = "h-6 w-6" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: path
        }, void 0, false, {
            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
            lineNumber: 10,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
_c = Icon;
/**
 * A specific upload icon for the file input components.
 */ const UploadIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
        path: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
        className: "h-8 w-8 text-gray-400"
    }, void 0, false, {
        fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
        lineNumber: 17,
        columnNumber: 30
    }, this);
_c1 = UploadIcon;
/**
 * A reusable component for uploading and previewing images.
 */ const ImageUpload = ({ label, id, onChange, previewUrl, multiple = false })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-600 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1 text-center",
                    children: [
                        previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: previewUrl,
                            alt: "Preview",
                            className: "mx-auto h-24 w-24 object-cover rounded-md"
                        }, void 0, false, {
                            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadIcon, {}, void 0, false, {
                            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: id,
                                    className: "relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Upload a file"
                                        }, void 0, false, {
                                            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                                            lineNumber: 47,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: id,
                                            name: id,
                                            type: "file",
                                            className: "sr-only",
                                            onChange: onChange,
                                            multiple: multiple,
                                            accept: "image/*"
                                        }, void 0, false, {
                                            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                                            lineNumber: 48,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                                    lineNumber: 46,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "pl-1",
                                    children: "or drag and drop"
                                }, void 0, false, {
                                    fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                                    lineNumber: 50,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                            lineNumber: 45,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500",
                            children: "PNG, JPG, GIF up to 10MB"
                        }, void 0, false, {
                            fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                            lineNumber: 52,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
_c2 = ImageUpload;
const __TURBOPACK__default__export__ = ImageUpload;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Icon");
__turbopack_context__.k.register(_c1, "UploadIcon");
__turbopack_context__.k.register(_c2, "ImageUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Project/nextjs/beta-bay/lib/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getBackendUrl": (()=>getBackendUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
// Configure the default backend URL for local development
const DEFAULT_BACKEND_URL = 'https://betbay-backend.vercel.app';
function getBackendUrl() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BACKEND_URL2 || DEFAULT_BACKEND_URL;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/components/FormField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$ImageUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/components/ImageUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/public/MockData.tsx [app-client] (ecmascript)"); // Importing mock data for apps
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Project/nextjs/beta-bay/node_modules/next/router.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const NewAppPage = ({ onCancel, onCreate })=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const isEditing = params.id !== 'new';
    const app = __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"].find((app)=>app.id === parseInt(params.id)) ?? __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$public$2f$MockData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allApps"][0]; // Fallback to the first app if not found
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: app.name,
        description: app.description,
        videoUrl: app.videoUrl,
        iosLink: app.iosLink,
        androidLink: app.androidLink,
        googleGroupLink: app.googleGroupLink,
        testingInstruction: app.testingInstruction,
        price: parseInt(app.price),
        icon: null,
        coverImage: null,
        screenshots: []
    });
    const [previews, setPreviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        screenshots: []
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "NewAppPage.useEffect": ()=>{
            if (isEditing) {
                if (typeof app.iconUrl === 'string') {
                    setPreviews({
                        "NewAppPage.useEffect": (prev)=>({
                                ...prev,
                                icon: app.iconUrl
                            })
                    }["NewAppPage.useEffect"]);
                }
                if (typeof app.coverImageUrl === 'string') {
                    setPreviews({
                        "NewAppPage.useEffect": (prev)=>({
                                ...prev,
                                coverImage: app.coverImageUrl
                            })
                    }["NewAppPage.useEffect"]);
                }
                if (Array.isArray(app.screenshots)) {
                    setPreviews({
                        "NewAppPage.useEffect": (prev)=>({
                                ...prev,
                                screenshots: app.screenshots
                            })
                    }["NewAppPage.useEffect"]);
                } else if (typeof app.screenshots === 'string') {
                    setPreviews({
                        "NewAppPage.useEffect": (prev)=>({
                                ...prev,
                                screenshots: [
                                    URL.createObjectURL(new Blob([
                                        app.screenshots
                                    ], {
                                        type: 'image/png'
                                    }))
                                ]
                            })
                    }["NewAppPage.useEffect"]);
                }
                setData({
                    name: typeof app.name === 'string' ? app.name : '',
                    description: typeof app.description === 'string' ? app.description : '',
                    videoUrl: typeof app.videoUrl === 'string' ? app.videoUrl : '',
                    iosLink: typeof app.iosLink === 'string' ? app.iosLink : '',
                    androidLink: typeof app.androidLink === 'string' ? app.androidLink : '',
                    googleGroupLink: typeof app.googleGroupLink === 'string' ? app.googleGroupLink : '',
                    testingInstruction: typeof app.testingInstruction === 'string' ? app.testingInstruction : '',
                    price: typeof app.price === 'string' ? parseFloat(app.price) : 0,
                    screenshots: []
                });
            } else {
                setData({
                    name: '',
                    description: '',
                    videoUrl: '',
                    iosLink: '',
                    androidLink: '',
                    googleGroupLink: '',
                    testingInstruction: '',
                    price: 0,
                    icon: null,
                    coverImage: null,
                    screenshots: []
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["NewAppPage.useEffect"], [
        isEditing,
        app.name
    ]);
    const handleChange = (e)=>{
        const { name, value, type } = e.target;
        setData((prev)=>({
                ...prev,
                [name]: type === 'number' ? parseFloat(value) : value
            }));
    };
    const handleFileChange = (e)=>{
        const { name, files } = e.target;
        if (!files || files.length === 0) return;
        if (name === 'screenshots') {
            const newFiles = Array.from(files);
            setData((prev)=>({
                    ...prev,
                    screenshots: [
                        ...prev.screenshots,
                        ...newFiles
                    ]
                }));
            const newPreviews = newFiles.map((file)=>URL.createObjectURL(file));
            setPreviews((prev)=>({
                    ...prev,
                    screenshots: [
                        ...prev.screenshots,
                        ...newPreviews
                    ]
                }));
        } else {
            const file = files[0];
            setData((prev)=>({
                    ...prev,
                    [name]: file
                }));
            setPreviews((prev)=>({
                    ...prev,
                    [name]: URL.createObjectURL(file)
                }));
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!data.name.trim()) {
            alert("App Name is required.");
            return;
        }
        setIsSubmitting(true);
        try {
            const backendUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBackendUrl"])();
            // Prepare JSON data for upload
            const jsonData = {
                app_name: data.name,
                description: data.description,
                youtube_link: data.videoUrl,
                ios_link: data.iosLink,
                android_link: data.androidLink,
                google_group_link: data.googleGroupLink,
                testing_instruction: data.testingInstruction,
                test_price: data.price
            };
            // Optional: Get Token from localStorage if it exists
            const token = localStorage.getItem('betabay_token');
            const headers = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            // Send JSON data to backend
            const response = await fetch(`${backendUrl}/api/test-posts`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jsonData)
            });
            if (!response.ok) {
                throw new Error(`Error creating app: ${response.status}`);
            }
            const result = await response.json();
            console.log('App created successfully:', result);
            // Redirect to myapps page
            __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].push('/myapps');
        } catch (error) {
            console.error('Failed to create app:', error);
            alert('Failed to create app. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleCancel = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].push('/myapps'); // Redirect to the My Apps page
    };
    // Render the form with sections for core information, media & visuals, and testing & distribution
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-5xl mx-auto mb-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "my-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-gray-800",
                        children: isEditing ? 'Edit App' : 'Post a New App'
                    }, void 0, false, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                        lineNumber: 175,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 mt-1",
                        children: isEditing ? 'Update the details below to modify your app information.' : 'Fill in the details below to get your app ready for testing.'
                    }, void 0, false, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                        lineNumber: 178,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                lineNumber: 174,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 bg-white border border-gray-200 rounded-2xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold text-gray-700 mb-6",
                                children: "Core Information"
                            }, void 0, false, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 187,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$ImageUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            label: "App Icon",
                                            id: "icon",
                                            onChange: handleFileChange,
                                            previewUrl: previews.icon
                                        }, void 0, false, {
                                            fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "App Name",
                                                id: "name",
                                                placeholder: "My Awesome App",
                                                value: data.name,
                                                onChange: handleChange
                                            }, void 0, false, {
                                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                                lineNumber: 193,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Description",
                                                id: "description",
                                                as: "textarea",
                                                placeholder: "A brief, catchy description of your app.",
                                                value: data.description,
                                                onChange: handleChange
                                            }, void 0, false, {
                                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                                lineNumber: 194,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 188,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                        lineNumber: 186,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 bg-white border border-gray-200 rounded-2xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold text-gray-700 mb-6",
                                children: "Media & Visuals"
                            }, void 0, false, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 200,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$ImageUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Cover Image",
                                        id: "coverImage",
                                        onChange: handleFileChange,
                                        previewUrl: previews.coverImage
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$ImageUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Screenshots (Select multiple)",
                                        id: "screenshots",
                                        onChange: handleFileChange,
                                        multiple: true
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 25
                                    }, this),
                                    previews.screenshots.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2",
                                        children: previews.screenshots.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: src,
                                                className: "w-full h-auto object-cover rounded-md",
                                                alt: `Screenshot ${i + 1}`
                                            }, i, false, {
                                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 71
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "YouTube Link (Optional)",
                                        id: "videoUrl",
                                        placeholder: "https://youtube.com/watch?v=...",
                                        value: data.videoUrl ?? '',
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 201,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                        lineNumber: 199,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 bg-white border border-gray-200 rounded-2xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold text-gray-700 mb-6",
                                children: "Testing & Distribution"
                            }, void 0, false, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 214,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "iOS Test Link (TestFlight)",
                                        id: "iosLink",
                                        placeholder: "https://testflight.apple.com/join/...",
                                        value: data.iosLink ?? '',
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Android Test Link (Play Store)",
                                        id: "androidLink",
                                        placeholder: "https://play.google.com/apps/testing/...",
                                        value: data.androidLink ?? '',
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Google Group Link (Optional)",
                                        id: "googleGroupLink",
                                        placeholder: "https://groups.google.com/g/...",
                                        value: data.googleGroupLink ?? '',
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:col-span-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            label: "Testing Instructions",
                                            id: "testingInstruction",
                                            as: "textarea",
                                            placeholder: "e.g., 'Log in with user: test@test.com, pass: 1234. Then, navigate to the dashboard and try creating a new project.'",
                                            value: data.testingInstruction,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$components$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        label: "Price ($)",
                                        id: "price",
                                        type: "number",
                                        placeholder: "0.00",
                                        value: data.price,
                                        onChange: handleChange
                                    }, void 0, false, {
                                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 215,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                        lineNumber: 213,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end items-center gap-4 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCancel,
                                className: "px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 227,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition",
                                children: isEditing ? 'Update App' : 'Post App'
                            }, void 0, false, {
                                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                                lineNumber: 228,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                        lineNumber: 226,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
                lineNumber: 185,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Project/nextjs/beta-bay/app/myapps/detail/[id]/page.tsx",
        lineNumber: 173,
        columnNumber: 9
    }, this);
};
_s(NewAppPage, "noj4vcJdsb/IsAVRVKM4MkW6neE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Project$2f$nextjs$2f$beta$2d$bay$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = NewAppPage;
const __TURBOPACK__default__export__ = NewAppPage;
var _c;
__turbopack_context__.k.register(_c, "NewAppPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=Project_nextjs_beta-bay_3a1e86bc._.js.map