'use client';

import { FC, use, useState, useEffect } from 'react';
import { allApps } from '@/public/MockData';
import Image from 'next/image';
import { App } from '@/types';
import { getBackendUrl } from '@/lib/api';
import Link from 'next/link';

interface JoinBetaPageProps {
  params: Promise<{ id: string }>;
}

const JoinBetaPage: FC<JoinBetaPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const appId = resolvedParams.id;
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

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

  const handleJoinBeta = async () => {
    setIsJoining(true);

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
        // Success handled by the UI state change
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to join the test');
      }
    } catch (error) {
      console.error('Error joining test:', error);
      alert('Failed to join the test. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleAppleClick = async () => {
    if (!app) return;
    const iosLink = app.iosLink || app.ios_link;
    if (iosLink) {
      window.open(iosLink, '_blank');
    } else {
      // Fallback to TestFlight if no specific link
      window.open('https://testflight.apple.com', '_blank');
    }
  };

  const handleGoogleClick = async () => {
    if (!app) return;
    const androidLink = app.androidLink || app.android_link;
    if (androidLink) {
      window.open(androidLink, '_blank');
    } else {
      // Fallback to Play Store if no specific link
      window.open('https://play.google.com/store', '_blank');
    }
  };

  const handleGitHubClick = async () => {
    window.open('https://github.com', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading app data...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            href={`/test-instruction/${appId}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Overview
          </Link>

          <h1 className="text-5xl font-extralight text-gray-900 mb-6 tracking-tight">Join Beta Program</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to become an exclusive beta tester? Join the program and get early access to cutting-edge features.
          </p>
        </div>

        {/* App Info Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-xl border border-white/50 p-8 mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-[16px] overflow-hidden shadow-lg ring-4 ring-white/30">
              <Image
                src={app.iconUrl || app.icon_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNEE5MEUyIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwPC90ZXh0Pgo8L3N2Zz4K'}
                alt={app.name || app.app_name || 'App Icon'}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{app.name || app.app_name || 'Unknown App'}</h2>
              <p className="text-lg text-gray-600">by {app.creator?.name || app.user_info?.username || 'Unknown Creator'}</p>
              <span className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold">
                Beta Program
              </span>
            </div>
          </div>
        </div>

        {!joined ? (
          /* Join Form */
          <div className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-xl border border-white/50 p-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join the beta program to get early access and help shape the future of this app.
              </p>
              
              <button
                onClick={handleJoinBeta}
                disabled={isJoining}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-12 rounded-[20px] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed text-xl"
              >
                {isJoining ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Joining Program...
                  </div>
                ) : (
                  'Join Beta Program'
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-[32px] shadow-xl border border-green-200 p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Beta Program!</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Congratulations! You&apos;re In! Waiting for your Feedbacks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto">
              <Link
                href={`/test-instruction/${appId}`}
                className="group bg-white text-gray-700 hover:text-gray-900 font-semibold py-4 px-8 rounded-[16px] transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Overview
              </Link>
              
              <Link
                href={`/test-instruction/${appId}`}
                className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:-translate-x-1 transition-transform duration-300">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Download & Setup
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinBetaPage;
