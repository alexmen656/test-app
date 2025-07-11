'use client';
import AppSquareCard from '@/components/AppSquareCard';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { App } from '@/types';
import { useApps } from '@/hooks/useApps';
import { getBackendUrl } from '@/lib/api';

// --- Helper Components ---

// Icon for the plus button, using SVG for a clean look
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

// A placeholder card for adding new apps
const AddNewAppCard = () => (
    <div
        onClick={() => window.location.href = `/myapps/edit/new`}
        className="flex items-center justify-center aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors duration-300"
    >
        <PlusIcon />
    </div>
);


// --- Main App Component ---

export default function App() {
    // --- State Management ---
    const { apps, loading, error, hasCache } = useApps({
        cacheKey: 'myApps',
        endpoint: '/api/test-posts/user/mine',
        requireAuth: true,
        autoFetch: true
    });
    
    const [userProfile, setUserProfile] = useState({
        username: 'Username',
        profileImage: ''
    });
    const [coinBalance, setCoinBalance] = useState<number>(0);
    const [coinLoading, setCoinLoading] = useState(true);

    useEffect(() => {
        const username = localStorage.getItem('betabay_username') || 'Username';
        const profileImage = localStorage.getItem('betabay_profile_image') || '';

        setUserProfile({
            username,
            profileImage
        });
    }, []);

    useEffect(() => {
        async function fetchCoinBalance() {
            try {
                setCoinLoading(true);
                const backendUrl = getBackendUrl();
                const token = localStorage.getItem('betabay_token');

                if (!token) {
                    setCoinLoading(false);
                    return;
                }

                const response = await fetch(`${backendUrl}/api/coins/balance`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCoinBalance(data.balance || 0);
                } else {
                    console.log('Failed to fetch coin balance:', response.status);
                }
            } catch (error) {
                console.error('Error fetching coin balance:', error);
            } finally {
                setCoinLoading(false);
            }
        }

        fetchCoinBalance();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">

                {/* User Profile Section */}
                <header className="flex items-center justify-between mb-8 sm:mb-12">
                    <div className="flex items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full mr-4 sm:mr-6 overflow-hidden relative">
                            {userProfile.profileImage ? (
                                <Image
                                    src={userProfile.profileImage}
                                    alt={userProfile.username}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                /* Fallback if no image is available */
                                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                                    {userProfile.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{userProfile.username}</h1>
                    </div>

                    {/* Coin Balance Display */}
                    <div className="flex items-center bg-white border-2 border-yellow-400 text-gray-800 px-4 py-2 rounded-full transition-shadow">
                        <span className="w-7 h-7 mr-2 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold text-lg">
                            h
                        </span>
                        <span className="font-bold text-lg text-gray-900">
                            {coinLoading ? '...' : coinBalance.toLocaleString()}
                        </span>
                    </div>
                </header>

                {/* Apps Section */}
                <main>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold">My Apps</h2>
                        {hasCache && loading && (
                            <div className="flex items-center text-sm text-blue-600">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                Updating...
                            </div>
                        )}
                    </div>

                    {loading && !hasCache ? (
                        <div className="text-center py-8">Loading your apps...</div>
                    ) : error && !hasCache ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : (
                        /* Grid for the apps */
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                            {Array.isArray(apps) && apps.length > 0 ? (
                                // Apps anzeigen, wenn vorhanden
                                apps.map((app) => (
                                    <AppSquareCard key={app.id} app={app} route={`/myapps/edit/${app.id}`} />
                                ))
                            ) : (
                                // Nachricht anzeigen, wenn keine Apps vorhanden sind
                                <div className="col-span-full text-center py-8 text-gray-500">
                                    You have no Apps yet.
                                </div>
                            )}
                            <AddNewAppCard />
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}