'use client';
import AppSquareCard from '@/components/AppSquareCard';
import React, { useEffect, useState } from 'react';
import { App } from '@/types';
import { getBackendUrl } from '@/lib/api';


export default function JoinedPage() {
    // --- State Management ---
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState({
        username: 'Username',
        profileImage: '',
        userId: '0'
    });



    // Fetch user profile data
    useEffect(() => {
        // Get user data from localStorage (set during login/authentication)
        const username = localStorage.getItem('betabay_username') || 'Username';
        const profileImage = localStorage.getItem('betabay_profile_image') || '';
        const userId = localStorage.getItem('betabay_user_id') || '0'; // Default to '0' if not set

        setUserProfile({
            username,
            profileImage,
            userId
        });
    }, []);

    // Fetch apps from the backend
    useEffect(() => {
        async function fetchApps() {
            try {
                setLoading(true);
                const backendUrl = getBackendUrl();

                // Optional: Get token from localStorage if it exists
                const token = localStorage.getItem('betabay_token');
                const headers: HeadersInit = {};

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${backendUrl}/api/test-posts/user/joined`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error(`Error fetching apps: ${response.status}`);
                }

                const data = await response.json();
                console.log("API response:", data); // Debugging
                console.log("User ID:", userProfile.userId); // Debugging

                if (Array.isArray(data)) {
                    data.forEach(item => {
                        console.log("joinedUserIds:", item.joinedUserIds); // Debugging
                        if (item.joinedUserIds && Array.isArray(item.joinedUserIds) && item.joinedUserIds.includes(userProfile.userId)) {
                            setApps(prev => [...prev, item]);
                        }
                    });
                } else if (data && typeof data === 'object') {

                    const possibleArrays = Object.values(data).filter(value => Array.isArray(value));
                    if (possibleArrays.length > 0) {
                        possibleArrays.forEach((arrayOfApps) => {
                            arrayOfApps.forEach(item => {
                                if (item.joinedUserIds && Array.isArray(item.joinedUserIds) && item.joinedUserIds.includes(userProfile.userId)) {
                                    setApps(prev => [...prev, item]);
                                }
                            });
                        });
                    } else {

                        if (data.id) {

                            data.forEach((item: App) => {
                                if (item.joinedUserIds && Array.isArray(item.joinedUserIds) && item.joinedUserIds.includes(userProfile.userId)) {
                                    setApps(prev => [...prev, item]);
                                }
                            });
                        } else {
                            setApps([]);
                        }
                    }
                } else {
                    setApps([]);
                }

                setError(null);
            } catch (error) {
                console.error('Failed to fetch apps:', error);
                setError('Failed to load apps. Please try again.');
                // Fallback to empty array if fetch fails
                setApps([]);
            } finally {
                setLoading(false);
            }
        }

        // Fetch apps if we have authentication
        const token = localStorage.getItem('betabay_token');
        if (token) {
            fetchApps();
        } else {
            setLoading(false);
        }
    }, [userProfile]);
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {/* Apps Section */}
                <main>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Joined Tests</h2>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <span className="ml-4 text-gray-600">Loading your joined tests...</span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-800">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && apps.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No joined tests yet</h3>
                            <p className="text-gray-500">You haven&apos;t joined any beta tests yet. Explore available apps to get started!</p>
                        </div>
                    )}

                    {/* Grid for the apps */}
                    {!loading && !error && apps.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                            {apps.map(app => (
                                <AppSquareCard key={app.id} app={app} route={`/test-instruction/${app.id}`} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}