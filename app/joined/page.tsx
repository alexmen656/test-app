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

                const response = await fetch(`${backendUrl}/api/test-posts`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error(`Error fetching apps: ${response.status}`);
                }

                const data = await response.json();
                console.log("API response:", data); // Debugging
                console.log("User Profile:", userProfile); // Debugging

                if (Array.isArray(data)) {
                    data.forEach(item => {
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

                            data.forEach((item: any) => {
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

        fetchApps();
    }, []);
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                {/* Apps Section */}
                <main>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Joined Tests</h2>

                    {/* Grid for the apps */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {apps.map(app => (
                            <AppSquareCard key={app.id} app={app} route={`/test-instruction/${app.id}`} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}