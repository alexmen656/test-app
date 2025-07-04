'use client';
import React, { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

interface DeclineDetails {
    reviewId: string;
    testerId: string;
    testerName: string;
    declineReason: string;
    actionTaken: string;
    timestamp: string;
    status: 'processing' | 'completed' | 'failed';
}

const DeclineReasonOptions = [
    { value: 'invalid_review', label: 'Invalid or fake review', description: 'Review appears to be fraudulent or not genuine' },
    { value: 'inappropriate_content', label: 'Inappropriate content', description: 'Review contains offensive or inappropriate language' },
    { value: 'spam', label: 'Spam or promotional', description: 'Review is spam or contains promotional content' },
    { value: 'off_topic', label: 'Off-topic review', description: 'Review is not relevant to the app being tested' },
    { value: 'insufficient_testing', label: 'Insufficient testing', description: 'Evidence shows inadequate testing was performed' },
    { value: 'duplicate', label: 'Duplicate review', description: 'This review duplicates a previous submission' },
    { value: 'other', label: 'Other reason', description: 'Custom reason specified below' }
];

const ReviewDeclinePage = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const reviewId = params.reviewId as string;
    const testerId = searchParams.get('testerId');
    const testerName = searchParams.get('testerName');

    const [selectedReason, setSelectedReason] = useState<string>('');
    const [customReason, setCustomReason] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [declineDetails, setDeclineDetails] = useState<DeclineDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDeclineSubmit = async () => {
        if (!selectedReason) {
            setError('Please select a reason for declining the review.');
            return;
        }

        if (selectedReason === 'other' && !customReason.trim()) {
            setError('Please provide a custom reason for declining the review.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const reasonText = selectedReason === 'other'
            ? customReason
            : DeclineReasonOptions.find(option => option.value === selectedReason)?.label || 'Unknown reason';

        const mockDeclineDetails: DeclineDetails = {
            reviewId: reviewId,
            testerId: testerId || 'Unknown',
            testerName: testerName || 'Unknown Tester',
            declineReason: reasonText,
            actionTaken: 'Review flagged and marked as invalid',
            timestamp: new Date().toISOString(),
            status: Math.random() > 0.05 ? 'completed' : 'failed' // 95% success rate
        };

        setDeclineDetails(mockDeclineDetails);
        setIsProcessing(false);

        if (mockDeclineDetails.status === 'failed') {
            setError('Failed to process decline. Please try again.');
        }
    };

    const handleBackToReviews = () => {
        router.push(`/confirmation/${testerId}`);
    };

    const handleBackToTesters = () => {
        router.push('/confirmation');
    };

    if (isProcessing) {
        return (
            <div className="max-w-4xl mx-auto my-10 px-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Decline</h1>
                        <p className="text-gray-600 mb-4">Please wait while we process the review decline...</p>
                        <div className="text-sm text-gray-500">
                            Review ID: {reviewId}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (declineDetails && declineDetails.status === 'completed') {
        return (
            <div className="max-w-4xl mx-auto my-10 px-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Decline Header */}
                    <div className="bg-red-50 border-b border-red-200 p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-700 font-extrabold" fill="none" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-red-900 mb-2">Review Declined</h1>
                            <p className="text-red-700">The review has been flagged and marked as invalid.</p>
                        </div>
                    </div>

                    {/* Decline Details */}
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Decline Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Review ID</div>
                                    <div className="font-medium text-gray-900">#{declineDetails.reviewId}</div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Tester</div>
                                    <div className="font-medium text-gray-900">{declineDetails.testerName}</div>
                                    <div className="text-sm text-gray-500">ID: {declineDetails.testerId}</div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Status</div>
                                    <div className="flex items-center">
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                                            🚩 Declined
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                    <div className="text-sm text-red-500 mb-1">Decline Reason</div>
                                    <div className="font-medium text-red-900">{declineDetails.declineReason}</div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Action Taken</div>
                                    <div className="font-medium text-gray-900">{declineDetails.actionTaken}</div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Processed At</div>
                                    <div className="font-medium text-gray-900">
                                        {new Date(declineDetails.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Consequences Info */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ What happens when a review is declined?</h3>
                            <ul className="text-yellow-800 text-sm space-y-1">
                                <li>• No payment will be processed for this review</li>
                                <li>• Tester will be notified about the decline reason</li>
                                <li>• Review is flagged in the system for quality control</li>
                                <li>• Tester&apos;s overall rating may be affected</li>
                                <li>• Record is kept for future reference and pattern analysis</li>
                            </ul>
                        </div>

                        {/* Developer Flag Warning */}
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-orange-900 mb-2">🚨 Important Notice</h3>
                            <p className="text-orange-800 text-sm mb-2">
                                <strong>The tester will receive a notification with an option to flag you (the developer) if they believe this decline is unfair or retaliatory.</strong>
                            </p>
                            <p className="text-orange-700 text-xs">
                                This system ensures fairness and prevents abuse of the review process. Please only decline reviews that genuinely violate quality standards.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleBackToReviews}
                                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Back to {declineDetails.testerName}&apos;s Reviews
                            </button>
                            <button
                                onClick={handleBackToTesters}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            >
                                View All Testers
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Questions about review quality? Contact support at support@betabay.com</p>
                </div>
            </div>
        );
    }

    // Show reason selection form
    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Decline Review</h1>
                    <p className="text-gray-600">Please specify the reason for declining this review</p>
                    <div className="mt-2 text-sm text-gray-500">
                        Review ID: #{reviewId} | Tester: {testerName}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="text-red-800">{error}</div>
                    </div>
                )}

                {/* Reason Selection */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select decline reason:</h3>
                    <div className="space-y-3">
                        {DeclineReasonOptions.map((option) => (
                            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="decline_reason"
                                    value={option.value}
                                    checked={selectedReason === option.value}
                                    onChange={(e) => setSelectedReason(e.target.value)}
                                    className="mt-1 text-red-600 focus:ring-red-500"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{option.label}</div>
                                    <div className="text-sm text-gray-600">{option.description}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Custom Reason Input */}
                {selectedReason === 'other' && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Please specify the reason:
                        </label>
                        <textarea
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                            placeholder="Enter detailed reason for declining this review..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                )}

                {/* Warning Before Decline */}
                {selectedReason && (
                    <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                            <div>
                                <h4 className="font-medium text-orange-900 mb-1">⚠️ Fair Review Policy Warning</h4>
                                <p className="text-orange-800 text-sm mb-2">
                                    When you decline this review, <strong>{testerName}</strong> will be notified and given the option to flag you as a developer if they believe the decline is unfair or retaliatory.
                                </p>
                                <p className="text-orange-700 text-xs">
                                    Please ensure your decline reason is justified and based on legitimate quality concerns. Unfair declines may result in developer account penalties.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleDeclineSubmit}
                        disabled={!selectedReason || (selectedReason === 'other' && !customReason.trim())}
                        className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        Decline Review
                    </button>
                    <button
                        onClick={handleBackToReviews}
                        className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDeclinePage;
