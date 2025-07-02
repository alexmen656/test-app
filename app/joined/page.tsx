'use client';
import AppSquareCard from '@/components/AppSquareCard';
import React, { useState, useEffect } from 'react';
import { allApps } from '@/app/explore/page'; // Importing mock data for apps

// --- Helper Components ---

// Icon for the plus button, using SVG for a clean look
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

// A single app card component
// Define the type for the app object
interface App {
    id: number;
    name: string;
    description: string;
}


// A placeholder card for adding new apps
const AddNewAppCard = () => (
    <div
        onClick={() => window.location.href = `/myapps/detail/new`}
        className="flex items-center justify-center aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-200transition-colors duration-300"
    >
        <PlusIcon />
    </div>
);


// --- Main App Component ---

export default function App() {
    // --- State Management ---
    const [apps, setApps] = useState<App[]>([]);
    const [username, setUsername] = useState('Username');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState<App | null>(null);

    // --- Mock Data ---
    // In a real application, you would fetch this data from an API.
    const myApps = allApps.slice(2,5); // Simulating a subset of apps for the user

    // --- Event Handlers ---
    const handleAppClick = (app: App) => {
        setSelectedApp(app);
        // In a real app, you might navigate to the app's page
        // or open a more detailed modal here.
        alert(`You clicked on ${app.name}`);
    };

    const handleAddNewApp = () => {
        window.location.href = '/myapps/new';
    }


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
                        <AddNewAppCard />
                    </div>
                </main>

            </div>
        </div>
    );
}
