'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

interface TransactionDetails {
    reviewId: string;
    testerId: string;
    testerName: string;
    amount: number;
    currency: string;
    transactionId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    timestamp: string;
}

const TransactionFinalizePage = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const reviewId = params.reviewId as string;
    const testerId = searchParams.get('testerId');
    const testerName = searchParams.get('testerName');

    const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulate transaction processing
    useEffect(() => {
        const processTransaction = async () => {
            setIsProcessing(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Mock transaction data
            const mockTransaction: TransactionDetails = {
                reviewId: reviewId,
                testerId: testerId || 'Unknown',
                testerName: testerName || 'Unknown Tester',
                amount: 50, // 50 coins payment for review confirmation
                currency: 'coins',
                transactionId: `TXN-${Date.now()}`,
                status: Math.random() > 0.1 ? 'completed' : 'failed', // 90% success rate
                timestamp: new Date().toISOString()
            };

            setTransaction(mockTransaction);
            setIsProcessing(false);

            if (mockTransaction.status === 'failed') {
                setError('Transaction failed. Please try again.');
            }
        };

        if (reviewId) {
            processTransaction();
        } else {
            setError('Invalid review ID');
            setIsProcessing(false);
        }
    }, [reviewId, testerId, testerName]);

    const handleRetryTransaction = () => {
        setError(null);
        setTransaction(null);
        setIsProcessing(true);

        // Retry after a short delay
        setTimeout(() => {
            const retryTransaction: TransactionDetails = {
                reviewId: reviewId,
                testerId: testerId || 'Unknown',
                testerName: testerName || 'Unknown Tester',
                amount: 50,
                currency: 'coins',
                transactionId: `TXN-${Date.now()}`,
                status: 'completed',
                timestamp: new Date().toISOString()
            };

            setTransaction(retryTransaction);
            setIsProcessing(false);
        }, 2000);
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
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Transaction</h1>
                        <p className="text-gray-600 mb-4">Please wait while we finalize the payment for the confirmed review...</p>
                        <div className="text-sm text-gray-500">
                            Review ID: {reviewId}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !transaction) {
        return (
            <div className="max-w-4xl mx-auto my-10 px-4">
                <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-red-900 mb-2">Transaction Failed</h1>
                        <p className="text-red-600 mb-6">{error}</p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleRetryTransaction}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Retry Transaction
                            </button>
                            <button
                                onClick={handleBackToReviews}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            >
                                Back to Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Success Header */}
                <div className="bg-green-50 border-b border-green-200 p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-green-900 mb-2">Transaction Completed</h1>
                        <p className="text-green-700">Payment has been successfully processed for the confirmed review.</p>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">Transaction ID</div>
                                <div className="font-mono text-lg font-medium text-gray-900">{transaction.transactionId}</div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">Review ID</div>
                                <div className="font-medium text-gray-900">#{transaction.reviewId}</div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">Tester</div>
                                <div className="font-medium text-gray-900">{transaction.testerName}</div>
                                <div className="text-sm text-gray-500">ID: {transaction.testerId}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">Amount Paid</div>
                                <div className="text-2xl font-bold text-green-600">
                                    {transaction.amount} coins
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">Status</div>
                                <div className="flex items-center">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                        ✓ {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">Processed At</div>
                                <div className="font-medium text-gray-900">
                                    {new Date(transaction.timestamp).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2">💡 What happens next?</h3>
                        <ul className="text-blue-800 text-sm space-y-1">
                            <li>• The tester will receive payment notification</li>
                            <li>• Review is marked as confirmed and valid</li>
                            <li>• Transaction record is saved to your account</li>
                            <li>• Receipt will be sent to your email</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleBackToReviews}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Back to {transaction.testerName}&apos;s Reviews
                        </button>
                        <button
                            onClick={handleBackToTesters}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                        >
                            View All Testers
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Print Receipt
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Need help? Contact support at support@betabay.com or call 1-800-BETABAY</p>
            </div>
        </div>
    );
};

export default TransactionFinalizePage;
