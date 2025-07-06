'use client'; // This directive is necessary for using hooks like useState

import type { FC } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/AppCard'; // Import the AppCard component
import { useAuth } from '@/hooks/useAuth';
import { useApps } from '@/hooks/useApps';
import { App } from '@/types'; // Import the App type from the explore page
import AppListCard from '@/components/AppListCard';


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
const ExplorePageContent: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { apps, loading, error, hasCache } = useApps({
    cacheKey: 'explore',
    endpoint: '/api/test-posts',
    requireAuth: false,
    autoFetch: true
  });
  
  const featuredApps = useMemo(() => apps.slice(0, 4), [apps]);
  
  const filteredApps = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) return apps;
    return apps.filter(app => {
      // App-Name aus verschiedenen möglichen Quellen
      const appName = (app.name || app.app_name || '').toLowerCase();
      
      // Creator-Name aus verschiedenen möglichen Quellen
      const creatorName = (
        app.creator?.name || 
        app.user_info?.username || 
        ''
      ).toLowerCase();
      
      return appName.includes(lowercasedQuery) || creatorName.includes(lowercasedQuery);
    });
  }, [searchQuery, apps]);

  return (
    <main className="flex-1 bg-gray-100 text-gray-800 overflow-y-auto animate-fade-in h-screen my-10">
      <div className="px-8 py-10">
        {loading && !hasCache ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-lg text-gray-600">Loading apps...</p>
          </div>
        ) : error && !hasCache ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Top Grid Section */}
            <section className="overflow-x-auto w-screen">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Featured Apps</h2>
                {hasCache && loading && (
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </div>
                )}
              </div>
              <div className="flex w-full gap-8 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
                {featuredApps.length > 0 ? (
                  featuredApps.map((app: App) => (
                    <AppCard key={app.id} app={app} />
                  ))
                ) : (
                  <p className="text-gray-500">No featured apps available.</p>
                )}
              </div>
            </section>

            <hr className="my-15 border-gray-200" />
            
            {/* Search & List Section */}
            <section className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">All Apps</h2>
              <div className="mb-6 bg-white">
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search by app name or creator..." 
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="space-y-3">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app: App) => (
                    <AppListCard key={app.id} app={app} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-lg text-gray-500">
                      {searchQuery 
                        ? `No apps found for "${searchQuery}"` 
                        : "No apps available."
                      }
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ExplorePage: Not authenticated, will redirect...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  console.log('ExplorePage: Authenticated, showing content...');
  return <ExplorePageContent />;
};

export default ExplorePage;