'use client';
import AppSquareCard from '@/components/AppSquareCard';
import React from 'react';
import { allApps } from '@/public/MockData'; // Importing mock data for apps

// Define the type for the app object
interface App {
    id: number;
    name: string;
    description: string;
}


export default function App() {
    // --- Mock Data ---
    // In a real application, you would fetch this data from an API.
    const myApps = allApps.slice(2,5); // Simulating a subset of apps for the user


    // --- Render Method ---
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">


                {/* Apps Section */}
                <main>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Joined Tests</h2>

                    {/* Grid for the apps */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {myApps.map(app => (
                            <AppSquareCard key={app.id} app={app} route={`/test-instruction/${app.id}`} />
                        ))}
                    </div>
                </main>

            </div>
        </div>
    );
}
