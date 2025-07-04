'use client'; // This directive is necessary for using hooks like useState

import type { FC } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/AppCard'; // Import the AppCard component
import { useAuth } from '@/hooks/useAuth';
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
  const [allApps, setAllApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('http://localhost:3002/api/apps', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('Failed to fetch apps');
        }
        
        const data = await response.json();
        
        // Transform the data to match our expected structure
        const transformedApps = data.map((app: {
          id: number;
          name: string;
          description: string;
          creator_name: string;
          creator_avatar: string;
          icon: string;
          ratings: number;
          reviews: number;
          downloads: number;
          coins: number;
          featured: boolean;
          tags?: string;
          rating?: number;
          price?: number;
          category?: string;
          size?: string;
          version?: string;
          screenshots?: string;
          features?: string;
          system_requirements?: string;
          release_date?: string;
          last_updated?: string;
          permissions?: string;
          whats_new?: string;
          publisher_website?: string;
          support_email?: string;
          privacy_policy?: string;
          terms_of_service?: string;
          package_name?: string;
        }) => ({
          id: app.id,
          name: app.name,
          description: app.description || '',
          creator: {
            name: app.creator_name || 'Unknown',
            avatar: app.creator_avatar || ''
          },
          icon: app.icon || '',
          tags: app.tags ? app.tags.split(',').map((tag: string) => tag.trim()) : [],
          downloads: app.downloads || 0,
          rating: app.rating || 0,
          reviews: app.reviews || 0,
          price: app.price || 0,
          category: app.category || 'General',
          size: app.size || '0 MB',
          version: app.version || '1.0.0',
          screenshots: app.screenshots ? app.screenshots.split(',').map((s: string) => s.trim()) : [],
          features: app.features ? app.features.split(',').map((f: string) => f.trim()) : [],
          systemRequirements: app.system_requirements || 'No requirements specified',
          releaseDate: app.release_date || new Date().toISOString(),
          lastUpdated: app.last_updated || new Date().toISOString(),
          permissions: app.permissions ? app.permissions.split(',').map((p: string) => p.trim()) : [],
          whatsNew: app.whats_new || 'Initial release',
          publisherWebsite: app.publisher_website || '',
          supportEmail: app.support_email || '',
          privacyPolicy: app.privacy_policy || '',
          termsOfService: app.terms_of_service || '',
          packageName: app.package_name || ''
        }));
        
        setAllApps(transformedApps);
        setError(null);
      } catch (err) {
        console.error('Error fetching apps:', err);
        setError('Failed to load apps. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const featuredApps = allApps.slice(0, 4);
  const filteredApps = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) return allApps;
    return allApps.filter((app: App) =>
      app.name.toLowerCase().includes(lowercasedQuery) ||
      app.creator.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, allApps]);

  if (loading) {
    return (
      <main className="flex-1 bg-gray-100 text-gray-800 overflow-y-auto animate-fade-in h-screen my-10">
        <div className="px-8 py-10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading apps...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 bg-gray-100 text-gray-800 overflow-y-auto animate-fade-in h-screen my-10">
        <div className="px-8 py-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-100 text-gray-800  overflow-y-auto animate-fade-in h-screen my-10">
      <div className="px-8 py-10">
        {/* Top Grid Section */}
            <section className="overflow-x-auto w-screen">
            <div className="flex w-full gap-8 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              {featuredApps.map((app: App) => (
              <AppCard key={app.id} app={app} />
              ))}
            </div>
            </section>

        <hr className="my-15  border-gray-200" />
        {/* Search & List Section */}
        <section className="mx-auto max-w-4xl">
          <div className="mb-6 bg-white">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by app name or creator..." className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-3">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <AppListCard key={app.id} app={app} />
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