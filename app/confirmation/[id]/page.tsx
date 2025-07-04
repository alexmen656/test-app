'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface TestLog {
    id: number;
    timestamp: string;
    action: string;
    details: string;
    duration: string;
}

interface Review {
    id: number;
    comment: string;
    score: number;
    flagged: boolean;
    confirmed: boolean;
    submittedAt: string;
    testDuration: string;
    deviceInfo: string;
    osVersion: string;
    appVersion: string;
    testLogs: TestLog[];
    screenshots: string[];
    bugReports: string[];
}

interface Tester {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    joinedAt: string;
    status: 'active' | 'completed' | 'inactive';
    testingProgress: number;
    deviceInfo: string;
    lastActive: string;
    reviews: Review[];
    totalBugsReported: number;
    averageScore: number | null;
}

// Mock data - in real app this would come from API
const mockTesterData: { [key: string]: Tester } = {
    'T001': {
        id: 'T001',
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        avatarUrl: '/default-avatar.svg',
        joinedAt: '2025-01-15T10:00:00Z',
        status: 'completed',
        testingProgress: 100,
        deviceInfo: 'iPhone 15 Pro',
        lastActive: '2025-01-15T14:45:00Z',
        totalBugsReported: 0,
        averageScore: 5,
        reviews: [
            {
                id: 1,
                comment: 'Great app! Very intuitive interface and smooth performance. Love the new features in the latest update.',
                score: 5,
                flagged: false,
                confirmed: false,
                submittedAt: '2025-01-15T14:30:00Z',
                testDuration: '45 minutes',
                deviceInfo: 'iPhone 15 Pro',
                osVersion: 'iOS 17.2',
                appVersion: '2.1.0',
                testLogs: [
                    { id: 1, timestamp: '14:30:15', action: 'App Launch', details: 'Successfully launched app', duration: '2.3s' },
                    { id: 2, timestamp: '14:32:20', action: 'User Registration', details: 'Completed signup flow', duration: '3.5s' },
                    { id: 3, timestamp: '14:35:45', action: 'Feature Testing', details: 'Tested main navigation', duration: '8.2s' },
                    { id: 4, timestamp: '14:40:12', action: 'Payment Flow', details: 'Tested in-app purchase', duration: '12.1s' },
                ],
                screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
                bugReports: []
            }
        ]
    },
    'T002': {
        id: 'T002',
        name: 'Bob Martinez',
        email: 'bob.martinez@email.com',
        avatarUrl: '/default-avatar.svg',
        joinedAt: '2025-01-14T14:00:00Z',
        status: 'completed',
        testingProgress: 100,
        deviceInfo: 'Samsung Galaxy S24',
        lastActive: '2025-01-14T16:47:00Z',
        totalBugsReported: 3,
        averageScore: 3,
        reviews: [
            {
                id: 2,
                comment: 'App has potential but needs improvement. Found several UI issues and performance lag.',
                score: 3,
                flagged: false,
                confirmed: false,
                submittedAt: '2025-01-14T16:15:00Z',
                testDuration: '32 minutes',
                deviceInfo: 'Samsung Galaxy S24',
                osVersion: 'Android 14',
                appVersion: '2.1.0',
                testLogs: [
                    { id: 1, timestamp: '16:15:10', action: 'App Launch', details: 'App crashed on first launch', duration: 'Failed' },
                    { id: 2, timestamp: '16:16:30', action: 'App Launch', details: 'Second launch successful', duration: '5.2s' },
                    { id: 3, timestamp: '16:20:15', action: 'Navigation Test', details: 'Menu button unresponsive', duration: '15.3s' },
                    { id: 4, timestamp: '16:25:40', action: 'Form Submission', details: 'Form validation errors', duration: '8.7s' },
                ],
                screenshots: ['bug_screenshot1.jpg', 'bug_screenshot2.jpg', 'ui_issue.jpg'],
                bugReports: ['App crashes on launch', 'Menu button lag', 'Form validation issues']
            }
        ]
    },
    'T003': {
        id: 'T003',
        name: 'Carol Williams',
        email: 'carol.williams@email.com',
        avatarUrl: '/default-avatar.svg',
        joinedAt: '2025-01-13T09:00:00Z',
        status: 'completed',
        testingProgress: 100,
        deviceInfo: 'iPad Air 5th Gen',
        lastActive: '2025-01-13T11:13:00Z',
        totalBugsReported: 4,
        averageScore: 2,
        reviews: [
            {
                id: 3,
                comment: 'Encountered multiple bugs and crashes. App is not ready for production.',
                score: 2,
                flagged: false,
                confirmed: false,
                submittedAt: '2025-01-13T10:45:00Z',
                testDuration: '28 minutes',
                deviceInfo: 'iPad Air 5th Gen',
                osVersion: 'iPadOS 17.1',
                appVersion: '2.1.0',
                testLogs: [
                    { id: 1, timestamp: '10:45:05', action: 'App Launch', details: 'Successful launch', duration: '3.1s' },
                    { id: 2, timestamp: '10:47:20', action: 'Feature Test', details: 'Camera feature not working', duration: 'Failed' },
                    { id: 3, timestamp: '10:50:35', action: 'Data Sync', details: 'Sync failed multiple times', duration: 'Failed' },
                    { id: 4, timestamp: '10:55:12', action: 'Settings Menu', details: 'Settings page crash', duration: 'Failed' },
                ],
                screenshots: ['crash_report1.jpg', 'error_screen.jpg'],
                bugReports: ['Camera feature broken', 'Data sync failures', 'Settings page crashes', 'Memory leak detected']
            }
        ]
    }
};

const TesterDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const testerId = params.id as string;

    const [tester] = useState<Tester | null>(mockTesterData[testerId] || null);
    const [expandedReview, setExpandedReview] = useState<number | null>(null);

    if (!tester) {
        return (
            <div className="max-w-4xl mx-auto my-10 px-4">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Tester Not Found</h1>
                    <p className="text-gray-600 mb-4">The requested tester could not be found.</p>
                    <button
                        onClick={() => router.push('/confirmation')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Testers
                    </button>
                </div>
            </div>
        );
    }

    const handleConfirm = (reviewId: number) => {
        // Navigate to finalization page instead of just updating state
        const currentTester = tester;
        if (currentTester) {
            router.push(`/confirmation/${currentTester.id}/finalize/${reviewId}?testerId=${currentTester.id}&testerName=${encodeURIComponent(currentTester.name)}`);
        }
    };

    const handleFlag = (reviewId: number) => {
        // Navigate to decline page instead of just updating state
        const currentTester = tester;
        if (currentTester) {
            router.push(`/confirmation/${currentTester.id}/decline/${reviewId}?testerId=${currentTester.id}&testerName=${encodeURIComponent(currentTester.name)}`);
        }
    };

    const toggleExpanded = (reviewId: number) => {
        setExpandedReview(expandedReview === reviewId ? null : reviewId);
    };

    const getScoreColor = (score: number) => {
        if (score >= 4) return 'text-green-600';
        if (score >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBg = (score: number) => {
        if (score >= 4) return 'bg-green-100';
        if (score >= 3) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push('/confirmation')}
                    className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                    ← Back to All Testers
                </button>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-6">
                                <span className="text-2xl font-bold text-gray-600">
                                    {tester.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{tester.name}</h1>
                                <p className="text-gray-600 text-lg">{tester.email}</p>
                                <p className="text-gray-500">Tester ID: {tester.id}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tester.status)}`}>
                            {tester.status}
                        </span>
                    </div>

                    {/* Tester Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{tester.reviews.length}</div>
                            <div className="text-sm text-gray-500">Reviews Submitted</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{tester.totalBugsReported}</div>
                            <div className="text-sm text-gray-500">Bugs Reported</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{tester.testingProgress}%</div>
                            <div className="text-sm text-gray-500">Progress</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">
                                {tester.averageScore ? `${tester.averageScore}/5` : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">Avg. Score</div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="text-sm">
                            <span className="text-gray-500">Device:</span>
                            <span className="ml-2 font-medium">{tester.deviceInfo}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Joined:</span>
                            <span className="ml-2 font-medium">{new Date(tester.joinedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Last Active:</span>
                            <span className="ml-2 font-medium">{new Date(tester.lastActive).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Reviews & Test Logs</h2>

                {tester.reviews.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-xl font-medium text-gray-900 mb-2">No reviews submitted yet</p>
                        <p className="text-gray-500">This tester hasn&#39;t submitted any reviews.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {tester.reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`border-2 rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 ${review.flagged ? 'border-red-300 bg-red-50' :
                                    review.confirmed ? 'border-green-300 bg-green-50' : 'border-gray-200'
                                    }`}
                            >
                                {/* Review Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold">Review #{review.id}</h3>
                                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(review.score)} ${getScoreColor(review.score)}`}>
                                                    {review.score}/5 ⭐
                                                </div>
                                            </div>
                                            <p className="text-gray-800 text-lg leading-relaxed">{review.comment.replace(/'/g, "&#39;")}</p>
                                        </div>

                                        <div className="flex flex-col gap-2 ml-6">
                                            <button
                                                onClick={() => handleConfirm(review.id)}
                                                disabled={review.confirmed}
                                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${review.confirmed
                                                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                            >
                                                {review.confirmed ? '✓ Confirmed' : 'Confirm Valid'}
                                            </button>
                                            <button
                                                onClick={() => handleFlag(review.id)}
                                                disabled={review.flagged}
                                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${review.flagged
                                                    ? 'bg-red-100 text-red-700 cursor-not-allowed'
                                                    : 'text-red-500 hover:bg-red-100'
                                                    }`}
                                            >
                                                {review.flagged ? '🚩 Declined' : 'Decline Review'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Test Summary */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">Test Duration</div>
                                            <div className="font-medium">{review.testDuration}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">Device</div>
                                            <div className="font-medium">{review.deviceInfo}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">OS Version</div>
                                            <div className="font-medium">{review.osVersion}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm text-gray-500">App Version</div>
                                            <div className="font-medium">{review.appVersion}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleExpanded(review.id)}
                                        className="w-full py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                    >
                                        {expandedReview === review.id ? '▲ Hide Details' : '▼ Show Test Logs & Details'}
                                    </button>
                                </div>

                                {/* Expanded Details */}
                                {expandedReview === review.id && (
                                    <div className="p-6 bg-gray-50">
                                        {/* Test Logs */}
                                        <div className="mb-6">
                                            <h4 className="text-xl font-semibold mb-4">📋 Test Logs</h4>
                                            <div className="space-y-3">
                                                {review.testLogs.map((log) => (
                                                    <div key={log.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className="font-medium text-gray-900">{log.action}</div>
                                                            <div className="text-sm text-gray-500">{log.timestamp}</div>
                                                        </div>
                                                        <div className="text-gray-700 mb-1">{log.details}</div>
                                                        <div className={`text-sm ${log.duration === 'Failed' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                                            Duration: {log.duration}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bug Reports */}
                                        {review.bugReports.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-xl font-semibold mb-4 text-red-600">🐛 Bug Reports</h4>
                                                <div className="space-y-2">
                                                    {review.bugReports.map((bug, index) => (
                                                        <div key={index} className="bg-red-50 border border-red-200 p-3 rounded-lg">
                                                            <span className="text-red-800">{bug}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Screenshots */}
                                        {review.screenshots.length > 0 && (
                                            <div>
                                                <h4 className="text-xl font-semibold mb-4">📸 Screenshots & Evidence</h4>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {review.screenshots.map((screenshot, index) => (
                                                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                                                            <div className="w-full h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                                                                <span className="text-gray-500">📷</span>
                                                            </div>
                                                            <div className="text-sm text-gray-600">{screenshot}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Submission Info */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="text-sm text-gray-500">
                                                Submitted: {new Date(review.submittedAt).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Status Indicators */}
                                {(review.flagged || review.confirmed) && (
                                    <div className="px-6 py-3 border-t border-gray-200">
                                        {review.confirmed && (
                                            <div className="text-green-700 font-medium">✅ Review confirmed as valid</div>
                                        )}
                                        {review.flagged && (
                                            <div className="text-red-700 font-medium">🚩 Review Declined for inspection</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TesterDetailPage;
