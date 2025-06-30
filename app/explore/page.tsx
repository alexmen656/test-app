'use client'; // This directive is necessary for using hooks like useState

import Image from 'next/image';
import type { FC } from 'react';
import { useState, useMemo } from 'react';
import AppCard from '@/components/AppCard'; // Import the AppCard component

// Define the structure for an app object

// Mock data for the apps. In a real application, you would fetch this from an API.

// --- DATA STRUCTURE AND MOCK DATA ---
// Expanded data structure for the app details page.
interface App {
  id: number;
  name: string;
  creator: {
    name: string;
    avatarUrl: string;
  };
  price: string;
  coins?: number;
  coverImageUrl: string;
  iconUrl: string;
  description: string;
  screenshots: string[];
  videoUrl?: string;
  reviews: {
    id: number;
    reviewerName: string;
    score: number;
    comment: string;
  }[];
  joinedTesters: {
    id: number;
    name: string;
    avatarUrl: string;
  }[];
}
export type { App }; // Exporting the App type for use in other components  
// Expanded mock data for the apps.
const allApps: App[] = [
  {
    id: 1,
    name: 'Stellar Navigator',
    creator: { name: 'CosmoDev', avatarUrl: 'https://placehold.co/40x40/2D3748/FFFFFF?text=C' },
    price: '$4.99',
    coins: 500,
    coverImageUrl: 'https://placehold.co/1200x400/2D3748/FFFFFF?text=Stellar+Navigator',
    iconUrl: 'https://placehold.co/150x150/2D3748/FFFFFF?text=SN',
    description: 'Explore the vastness of space with Stellar Navigator. Chart new galaxies, discover unknown planets, and trade resources in this epic space exploration simulator. Built with a realistic physics engine and stunning visuals.',
    screenshots: [
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Galaxy+View',
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Planet+Surface',
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Trading+Post',
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Ship+Cockpit',
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    reviews: [
      { id: 1, reviewerName: 'GalacticGamer', score: 5, comment: 'Absolutely breathtaking! A must-have for any space enthusiast.' },
      { id: 2, reviewerName: 'AstroJunkie', score: 4, comment: 'Great game, but the trading system could be improved.' },
    ],
    joinedTesters: [
      { id: 1, name: 'TestPilot1', avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=T1' },
      { id: 2, name: 'ExplorerX', avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=EX' },
    ],
  },
  {
    id: 2,
    name: 'Aqua Planner',
    creator: { name: 'Oceanic Builds', avatarUrl: 'https://placehold.co/40x40/4A5568/FFFFFF?text=O' },
    price: 'Free',
    coverImageUrl: 'https://placehold.co/1200x400/4A5568/FFFFFF?text=Aqua+Planner',
    iconUrl: 'https://placehold.co/150x150/4A5568/FFFFFF?text=AP',
    description: 'Organize your life with Aqua Planner, the fluid and intuitive task manager. With a clean interface and powerful features, you can manage projects, set reminders, and collaborate with your team seamlessly.',
    screenshots: [
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Dashboard',
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Task+View',
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Calendar',
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Collaboration',
    ],
    reviews: [
      { id: 1, reviewerName: 'ProductivityPro', score: 5, comment: 'The best planner I have ever used. Changed my workflow completely.' },
    ],
    joinedTesters: [
      { id: 1, name: 'BetaUser', avatarUrl: 'https://placehold.co/40x40/A0AEC0/FFFFFF?text=BU' },
    ],
  },
  // Add more app objects here if needed...
];

/**
 * ExplorePageContent Component
 * This component displays featured apps and a searchable list of all apps.
 * It's designed to be placed within a layout that already provides a header.
 */
const ExplorePageContent: FC<{ onSelectApp: (id: number) => void }> = ({ onSelectApp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredApps = allApps.slice(0, 3);
  const filteredApps = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) return allApps;
    return allApps.filter(app =>
      app.name.toLowerCase().includes(lowercasedQuery) ||
      app.creator.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <main className="flex-1 bg-white text-gray-800 overflow-y-auto animate-fade-in">
      <div className="px-8 py-10">
        {/* Top Grid Section */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredApps.map((app) => (
           <AppCard key={app.id} app={app} />
          ))}
        </section>

        <hr className="my-12 border-gray-200" />

        {/* Search & List Section */}
        <section className="mx-auto max-w-4xl">
          <div className="mb-6">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by app name or creator..." className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-3">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <div key={app.id} onClick={() => onSelectApp(app.id)} className="flex items-center justify-between rounded-md border border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden">
                      <Image src={app.iconUrl} alt={`Icon for ${app.name}`} layout="fill" objectFit="cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.creator.name}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-700">{app.price}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10"><p className="text-lg text-gray-500">No apps found for &quot;{searchQuery}&quot;</p></div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};


export default ExplorePageContent;