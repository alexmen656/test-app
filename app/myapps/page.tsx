'use client';
import AppSquareCard from '@/components/AppSquareCard';
import React, { useState, useEffect } from 'react';
import type { App } from '@/types';
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
        onClick={() => window.location.href = `/myapps/detail/new`}
        className="flex items-center justify-center aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors duration-300"
    >
        <PlusIcon />
    </div>
);


// --- Main App Component ---

export default function App() {
    // --- State Management ---
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState({
        username: 'Username',
        profileImage: ''
    });

    // Fetch user profile data
    useEffect(() => {
        // Get user data from localStorage (set during login/authentication)
        const username = localStorage.getItem('betabay_username') || 'Username';
        const profileImage = localStorage.getItem('betabay_profile_image') || '';
        
        setUserProfile({
            username,
            profileImage
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
                
                // Überprüfen, ob data ein Array ist oder ein Objekt mit einer Array-Eigenschaft
                if (Array.isArray(data)) {
                    setApps(data);
                } else if (data && typeof data === 'object') {
                    // Suche nach einer Array-Eigenschaft in der Antwort
                    const possibleArrays = Object.values(data).filter(value => Array.isArray(value));
                    if (possibleArrays.length > 0) {
                        setApps(possibleArrays[0] as App[]);
                    } else {
                        // Fallback: Keine Arrays gefunden, versuche das ganze Objekt als App zu behandeln
                        if (data.id) {
                            setApps([data as App]);
                        } else {
                            // Keine erkennbare App-Struktur
                            setApps([]);
                        }
                    }
                } else {
                    // Keine erkennbare Datenstruktur
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

    // --- Event Handlers ---
    const handleAppClick = (app: App) => {
        // In a real app, you might navigate to the app's details page
        window.location.href = `/myapps/detail/${app.id}`;
    };

    // --- Render Method ---
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">

                {/* User Profile Section */}
                <header className="flex items-center mb-8 sm:mb-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full mr-4 sm:mr-6 overflow-hidden">
                        {userProfile.profileImage ? (
                            <img 
                                src={userProfile.profileImage} 
                                alt={userProfile.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            /* Fallback if no image is available */
                            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                                {userProfile.username.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{userProfile.username}</h1>
                </header>

                {/* Apps Section */}
                <main>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">My Apps</h2>

                    {loading ? (
                        <div className="text-center py-8">Loading your apps...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : (
                        /* Grid for the apps */
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                            {Array.isArray(apps) && apps.length > 0 ? (
                                // Apps anzeigen, wenn vorhanden
                                apps.map((app) => (
                                    <AppSquareCard key={app.id} app={app} />
                                ))
                            ) : (
                                // Nachricht anzeigen, wenn keine Apps vorhanden sind
                                <div className="col-span-full text-center py-8 text-gray-500">
                                    Du hast noch keine Apps erstellt.
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
