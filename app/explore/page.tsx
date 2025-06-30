'use client'; // This directive is necessary for using hooks like useState

import Image from 'next/image';
import type { FC } from 'react';
import { useState, useMemo } from 'react';
import AppCard, { App } from '@/components/AppCard'; // Import the AppCard component

// Define the structure for an app object

// Mock data for the apps. In a real application, you would fetch this from an API.
const allApps: App[] = [
  { id: 1, name: 'Stellar Navigator', testerName: 'CosmoDev', price: '$4.99', imageUrl: 'https://placehold.co/600x400/2D3748/FFFFFF?text=Stellar', iconUrl: 'https://placehold.co/150x150/2D3748/FFFFFF?text=SN' },
  { id: 2, name: 'Aqua Planner', testerName: 'Oceanic Builds', price: 'Free', imageUrl: 'https://placehold.co/600x400/4A5568/FFFFFF?text=Aqua', iconUrl: 'https://placehold.co/150x150/4A5568/FFFFFF?text=AP' },
  { id: 3, name: 'BioSphere Tracker', testerName: 'Eco Scripters', price: '$9.99', imageUrl: 'https://placehold.co/600x400/2F855A/FFFFFF?text=BioSphere', iconUrl: 'https://placehold.co/150x150/2F855A/FFFFFF?text=BT' },
  { id: 4, name: 'Recipe Genie', testerName: 'Kitchen Coders', price: 'Free', imageUrl: 'https://placehold.co/600x400/C53030/FFFFFF?text=Recipe', iconUrl: 'https://placehold.co/150x150/C53030/FFFFFF?text=RG' },
  { id: 5, name: 'FitFlow', testerName: 'Gym Junkies', price: '$12.99', imageUrl: 'https://placehold.co/600x400/6B46C1/FFFFFF?text=FitFlow', iconUrl: 'https://placehold.co/150x150/6B46C1/FFFFFF?text=FF' },
  { id: 6, name: 'Code Canvas', testerName: 'Syntax Artisans', price: '$24.99', imageUrl: 'https://placehold.co/600x400/1A202C/FFFFFF?text=Code', iconUrl: 'https://placehold.co/150x150/1A202C/FFFFFF?text=CC' },
];


/**
 * ExplorePageContent Component
 * This component displays featured apps and a searchable list of all apps.
 * It's designed to be placed within a layout that already provides a header.
 */
const ExplorePageContent: FC = () => {
  // State to hold the user's search query
  const [searchQuery, setSearchQuery] = useState('');

  // Featured apps are the first 3 from the list
  const featuredApps = allApps.slice(0, 6);

  // Filter the apps based on the search query.
  // useMemo ensures this only recalculates when the searchQuery changes.
  const filteredApps = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) {
      return allApps; // Show all apps if search is empty
    }
    return allApps.filter(app =>
      app.name.toLowerCase().includes(lowercasedQuery) ||
      app.testerName.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    // Main container is set to be a flex column and allows vertical scrolling
    <main className="flex-1 bg-white text-gray-800 my-13 overflow-y-auto h-screen">
      <div className="px-8 py-10">
        {/* Top Grid Section for featured apps */}
        <section className="overflow-x-auto pb-4">
          <div className="flex gap-8 min-w-max">
            {featuredApps.map((app) => (
              <div key={app.id} className="flex-shrink-0 w-120">
          <AppCard app={app} />
              </div>
            ))}
          </div>
        </section>

        <hr className="my-12 border-gray-200" />

        {/* Search & List Section */}
        <section className="mx-auto max-w-4xl">
          {/* Search Input Box */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by app name or tester..."
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* List Container */}
          <div className="space-y-3">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between rounded-md border border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden">
                      <Image
                        src={app.iconUrl}
                        alt={`Icon for ${app.name}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.testerName}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-700">{app.price}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No apps found for &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ExplorePageContent;