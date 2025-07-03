'use client'; // This directive is necessary for using hooks like useState

import Image from 'next/image';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppCard from '@/components/AppCard'; // Import the AppCard component
import { useAuth } from '@/hooks/useAuth';
import AppListCard from '@/components/AppListCard'; // Import the AppListCard component

// Create a client component that uses the search params
function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
  const { setAuthToken, debugStorage } = useAuth();
  
    const featuredApps = useMemo(() => [
        { id: 1, name: 'App One', creator: { id: 'creatorA', name: 'Creator A', avatarUrl: '/avatars/creatorA.jpg' } },
        { id: 2, name: 'App Two', creator: { id: 'creatorB', name: 'Creator B', avatarUrl: '/avatars/creatorB.jpg' } },
        { id: 3, name: 'App Three', creator: { id: 'creatorC', name: 'Creator C', avatarUrl: '/avatars/creatorC.jpg' } },
    ], []);//mockdata
  
    const [searchQuery, setSearchQuery] = useState(''); // Add state for searchQuery

    // Filter apps based on the search query
    const filteredApps = useMemo(() => {
        return featuredApps.filter(app =>
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, featuredApps]);

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
                <p className="text-gray-500">Try adjusting your search for &quot;{searchQuery}&quot;</p>
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