'use client';

import { FC, use, useState, useEffect } from 'react';
import { allApps } from '@/public/MockData';
import { App } from '@/types';
import { getBackendUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface DownloadGuidelinesPageProps {
  params: Promise<{ id: string }>;
}

const DownloadGuidelinesPage: FC<DownloadGuidelinesPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const appId = resolvedParams.id;
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  // Try to fetch app data from backend first, fallback to mock data
  useEffect(() => {
    const fetchAppData = async () => {
      setLoading(true);
      setError(null);

      try {
        // First try to parse as numeric ID for mock data
        const numericId = parseInt(appId);
        if (!isNaN(numericId)) {
          const mockApp = allApps.find(a => a.id === numericId);
          if (mockApp) {
            setApp(mockApp);
            setLoading(false);

            // Check if user is already joined (for mock data, assume not joined)
            const userId = localStorage.getItem('betabay_user_id');
            if (userId && mockApp.joinedUserIds && mockApp.joinedUserIds.includes(userId)) {
              setJoined(true);
            }
            return;
          }
        }

        // If not found in mock data or not numeric, try backend API
        const backendUrl = getBackendUrl();
        const token = localStorage.getItem('betabay_token');
        const headers: HeadersInit = {};

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        try {
          const response = await fetch(`${backendUrl}/api/test-posts/${appId}`, {
            method: 'GET',
            headers: headers,
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`Failed to fetch app data: ${response.status}`);
          }

          const data = await response.json();
          setApp(data);
          setLoading(false);

          
          // Check if user is already joined
          const userId = localStorage.getItem('betabay_user_id');
          if (userId && data.joinedUserIds && data.joinedUserIds.includes(userId)) {
            setJoined(true);
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      } catch (err) {
        console.error('Error fetching app data:', err);
        setError('Failed to load app data');
        setLoading(false);
      }
    };

    fetchAppData();
  }, [appId]);

  // Function to join the test
  const joinTest = async () => {
    if (joining || joined) return;

    setJoining(true);
    try {
      const backendUrl = getBackendUrl();
      const token = localStorage.getItem('betabay_token');

      if (!token) {
        alert('Please log in to join the test');
        return;
      }

      const response = await fetch(`${backendUrl}/api/test-posts/${appId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setJoined(true);
        alert('Successfully joined the test! You can now download and start testing.');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to join the test');
      }
    } catch (error) {
      console.error('Error joining test:', error);
      alert('Failed to join the test. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading app data...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">App Not Found</h1>
          <p className="text-xl text-gray-600">{error || 'The requested app does not exist.'}</p>
          <Link
            href="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAppleClick = async () => {
    await joinTest();
    const iosLink = app.iosLink || app.ios_link;
    if (iosLink) {
      window.open(iosLink, '_blank');
    } else {
      // Fallback to TestFlight if no specific link
      window.open('https://testflight.apple.com', '_blank');
    }
  };

  const handleGoogleClick = async () => {
    await joinTest();
    const androidLink = app.androidLink || app.android_link;
    if (androidLink) {
      window.open(androidLink, '_blank');
    } else {
      // Fallback to Play Store if no specific link
      window.open('https://play.google.com/store', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Download & Setup</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get started with {app.name || app.app_name || 'this app'} beta testing in just a few simple steps
          </p>
        </div>

        {/* App Info Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="px-8 py-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                <Image 
                  src={app.iconUrl || app.icon_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNEE5MEUyIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwPC90ZXh0Pgo8L3N2Zz4K'} 
                  alt={app.name || app.app_name || 'App icon'}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{app.name || app.app_name || 'Unknown App'}</h2>
                <p className="text-lg text-gray-600 mb-3">by {app.creator?.name || app.user_info?.username || 'Unknown Creator'}</p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Beta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Choose Your Platform</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Apple TestFlight Download */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">iOS / macOS</h4>
              <p className="text-gray-600 text-center text-sm mb-6 leading-relaxed">
                Download through TestFlight. Accept the invitation and install directly.
              </p>
              <button
                onClick={handleAppleClick}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>TestFlight</span>
              </button>
            </div>

            {/* Android Download */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Android</h4>
              <p className="text-gray-600 text-center text-sm mb-6 leading-relaxed">
                Join the beta program through Google Play Store and download the latest version.
              </p>
              <button
                onClick={handleGoogleClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span>Play Store</span>
              </button>
            </div>

            {/* GitHub Download */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">GitHub</h4>
              <p className="text-gray-600 text-center text-sm mb-6 leading-relaxed">
                Download source code and releases directly from the repository.
              </p>
              <button 
                onClick={() => window.open('https://github.com', '_blank')}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>



        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/test-instruction/${appId}`}
            className="group bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back to Overview</span>
          </Link>

          <Link
            href={`/test-instruction/${appId}/review-maker`}
            className="group bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>Submit Reviews</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadGuidelinesPage;
