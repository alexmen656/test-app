'use client'; // This directive is necessary for using hooks like useState

import Image from 'next/image';
import type { FC } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/AppCard'; // Import the AppCard component
import { useAuth } from '@/hooks/useAuth';
import { App } from '@/types'; // Import the App type from the explore page
import AppListCard from '@/components/AppListCard';
import { allApps } from '@/public/MockData'; // Import the mock data for apps


// Define the structure for an app object

// Mock data for the apps. In a real application, you would fetch this from an API.

// --- DATA STRUCTURE AND MOCK DATA ---
// Expanded data structure for the app details page.
 
// Expanded mock data for the apps.


/**
 * ExplorePageContent Component
 * This component displays featured apps and a searchable list of all apps.
 * It's designed to be placed within a layout that already provides a header.
 */
const ExplorePageContent: FC<{ onSelectApp: (id: number) => void }> = ({ onSelectApp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredApps = allApps.slice(0, 4);
  const filteredApps = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) return allApps;
    return allApps.filter(app =>
      app.name.toLowerCase().includes(lowercasedQuery) ||
      app.creator.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <main className="flex-1 text-gray-800 overflow-y-auto h-screen">
      <div className="pb-10">
        {/* Cover Image Section */}
        <section className="mb-12">
          <div className="relative w-screen h-64 md:h-80 lg:h-96">
            <Image
              src="/cover_image.jpg"
              alt="Cover Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Discover Amazing Apps
              </h1>
              <p className="text-white/90 text-lg">
                Find the perfect app for your needs
              </p>
            </div>
          </div>
        </section>

        {/* Featured Apps Section */}
        <section className="mb-12 px-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Apps</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4 min-w-max">
              {featuredApps.map((app) => (
                <div key={app.id} className="min-w-[280px] transform hover:scale-105 transition-all duration-300">
                  <AppCard app={app} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search & List Section */}
        <section className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by app name or creator..."
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-lg text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredApps.length > 0 ? (
              <div className="grid gap-4">
                {filteredApps.map((app) => (
                  <div key={app.id} className="transform hover:translate-y-[-2px] transition-all duration-200">
                    <AppListCard app={app} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xl font-medium text-gray-900 mb-2">No apps found</p>
                <p className="text-gray-500">Try adjusting your search for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

// Wrapper component that handles authentication
const ExplorePage: FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ExplorePage: isLoading =', isLoading, 'isAuthenticated =', isAuthenticated, 'user =', user);
    
    // Only redirect if we're done loading and definitely not authenticated
    if (!isLoading && !isAuthenticated) {
      console.log('ExplorePage: Redirecting to signin...');
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading) {
    console.log('ExplorePage: Showing loading state...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your apps...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ExplorePage: Not authenticated, will redirect...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  console.log('ExplorePage: Authenticated, showing content...');
  const handleSelectApp = (id: number) => {
    router.push(`/explore/detail/${id}`);
  };

  return <ExplorePageContent onSelectApp={handleSelectApp} />;
};

export default ExplorePage;