'use client'; // This directive is necessary for using hooks like useState

import Image from 'next/image';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppCard from '@/components/AppCard'; // Import the AppCard component
import { useAuth } from '@/hooks/useAuth';
import AppListCard from '@/components/AppListCard'; // Import the AppListCard component
import type { App } from '@/types';
import { getBackendUrl } from '@/lib/api';

// Create a client component that uses the search params
function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuthToken, debugStorage } = useAuth();
    
    // State für Apps und Loading
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(''); // Add state for searchQuery

    // Filter apps based on the search query
    const filteredApps = useMemo(() => {
        return apps.filter(app => {
            const appName = app.name || app.app_name || '';
            const creatorName = app.creator?.name || app.user_info?.username || '';
            
            return appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   creatorName.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [searchQuery, apps]);

    // Fetch apps from the backend API
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
                console.log("Home Page API response:", data); // Debugging
                
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

    useEffect(() => {
        const authStatus = searchParams.get('auth');
        const token = searchParams.get('token');
        
        console.log('HomePage: authStatus =', authStatus, 'token =', token ? 'present' : 'missing');
        
        // Debug localStorage
        debugStorage();
        
        if (authStatus === 'success' && token) {
            console.log('HomePage: Storing token and redirecting...');
            console.log('HomePage: Token preview =', token.substring(0, 50) + '...');
            
            // Use the auth hook to set the token
            setAuthToken(token);
            
            // Redirect to explore page after a short delay
            setTimeout(() => {
                router.push('/explore');
            }, 1000);
        }
    }, [searchParams, router, setAuthToken, debugStorage]);

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
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600">Loading apps...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex gap-6 pb-4 min-w-max">
                {apps.slice(0, 6).map((app) => (
                  <div key={app.id} className="min-w-[280px] transform hover:scale-105 transition-all duration-300">
                    <AppCard app={app} />
                  </div>
                ))}
                {apps.length === 0 && (
                  <div className="text-center py-8 w-full">
                    <p className="text-gray-500">No apps available yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
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
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600">Loading apps...</p>
              </div>
            ) : filteredApps.length > 0 ? (
              <div className="grid gap-4">
                {filteredApps.map((app) => (
                  <div key={app.id} className="transform hover:translate-y-[-2px] transition-all duration-200">
                    <AppListCard app={app} />
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xl font-medium text-gray-900 mb-2">No apps found</p>
                <p className="text-gray-500">Try adjusting your search for &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xl font-medium text-gray-900 mb-2">No apps available</p>
                <p className="text-gray-500">Be the first to add an app to BetaBay!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

  // Main page component that uses Suspense boundary
  export default function HomePage() {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>}>
        <HomeContent />
      </Suspense>
    );
  }