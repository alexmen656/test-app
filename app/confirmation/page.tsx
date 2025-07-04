'use client';
import React, { useState } from 'react';

interface TestLog {
    id: number;
    timestamp: string;
    action: string;
    details: string;
    duration: string;
}

interface Review {
    id: number;
    testerName: string;
    testerEmail: string;
    testerId: string;
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

const mockReviews: Review[] = [
    {
        id: 1,
        testerName: 'Alice Johnson',
        testerEmail: 'alice.johnson@email.com',
        testerId: 'T001',
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
    },
    {
        id: 2,
        testerName: 'Bob Martinez',
        testerEmail: 'bob.martinez@email.com',
        testerId: 'T002',
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
    },
    {
        id: 3,
        testerName: 'Carol Williams',
        testerEmail: 'carol.williams@email.com',
        testerId: 'T003',
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
];

const ReviewsPage = () => {
    const [reviews, setReviews] = useState(mockReviews);

    const handleConfirm = (id: number) => {
        alert(`Review ${id} confirmed as valid.`);
    };

    const handleFlag = (id: number) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === id ? { ...review, flagged: true } : review
            )
        );
        alert(`Review ${id} flagged for further inspection.`);
    };
    return (
        <div className="max-w-4xl mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">Testers</h1>
            <ul className="space-y-4">
                {reviews.map((review) => (
                    <li
                        key={review.id}
                        className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{review.testerName}</h2>
                            <p className="text-gray-600">{review.testerEmail}</p>
                            <p className="text-gray-500">Device: {review.deviceInfo}</p>
                        </div>
                        <div>
                            <a
                                href={`/confirmation/${review.testerId}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                View Review
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewsPage;
