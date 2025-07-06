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
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Confirm Your Beta Participation</h3>

            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">What You&apos;ll Get:</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Early access to all beta features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Direct communication with developers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Lifetime premium access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Exclusive beta tester badge</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Your Commitment:</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </div>
                    <span className="text-gray-700">2-3 weeks of testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Regular app usage and testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Provide detailed feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Report bugs and suggestions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
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

              <p className="text-sm text-gray-500 mt-4">
                By joining, you agree to provide constructive feedback and help improve the app.
              </p>
            </div>
          </div>
        ) : (
          /* Success State with Download & Setup */
          <div className="space-y-16">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-[32px] shadow-xl border border-green-200 p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Beta Program!</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Congratulations! You&apos;re now part of an exclusive group of beta testers.
                Let&apos;s get you started with downloading and setting up the app.
              </p>
            </div>

            {/* Download Section */}
            <div>
              <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Choose Your Platform</h3>
              <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                {/* Apple TestFlight Download */}
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[32px] p-10 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-[16px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Apple Platforms</h4>
                  <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                    Download the beta version through TestFlight. You&apos;ll need to accept the invitation and install the app directly.
                  </p>
                  <button
                    onClick={handleAppleClick}
                    className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-[16px] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[60px]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-lg">Download from TestFlight</span>
                  </button>
                </div>

                {/* Android Download */}
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[32px] p-10 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-[16px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl border-2 border-gray-100">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Android</h4>
                  <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                    Access the beta through Google Play Store. Join the testing program and download the latest beta version.
                  </p>
                  <button
                    onClick={handleGoogleClick}
                    className="w-full bg-gradient-to-r from-blue-600 via-red-500 to-green-600 hover:from-blue-700 hover:via-red-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-[16px] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[60px]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-lg">Download the Beta</span>
                  </button>
                </div>

                {/* GitHub Download */}
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[32px] p-10 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[16px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">GitHub</h4>
                  <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                    Download the source code and beta releases directly from GitHub. Access the repository and follow the installation instructions.
                  </p>
                  <button
                    onClick={handleGitHubClick}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold py-4 px-8 rounded-[16px] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[60px]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-lg">Download from GitHub</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Setup Guidelines */}
            <div>
              <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Setup Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Installation Steps */}
                <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-10 border border-white/50 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[12px] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Installation Steps</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Click Download Button</h5>
                        <p className="text-gray-600">Choose your platform and click the download button above</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Accept Beta Invitation</h5>
                        <p className="text-gray-600">Follow the platform-specific instructions to join the beta program</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Install & Launch</h5>
                        <p className="text-gray-600">Download and install the beta version, then launch the app</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Start Testing</h5>
                        <p className="text-gray-600">Begin exploring the app and testing its features</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testing Guidelines */}
                <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-10 border border-white/50 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-[12px] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Testing Guidelines</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-3 flex-shrink-0"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Test Core Features</h5>
                        <p className="text-gray-600">Focus on the main functionality and user flows</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-3 flex-shrink-0"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Report Issues</h5>
                        <p className="text-gray-600">Document any crashes, bugs, or unexpected behavior</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-3 flex-shrink-0"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Test Edge Cases</h5>
                        <p className="text-gray-600">Try unusual scenarios and boundary conditions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-3 flex-shrink-0"></div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Provide Feedback</h5>
                        <p className="text-gray-600">Share your thoughts on usability and feature improvements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-amber-200 rounded-[32px] p-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-6">Important Beta Testing Notes</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-amber-800">
                    <div>
                      <h4 className="font-semibold mb-3">⚠️ Beta Limitations</h4>
                      <ul className="space-y-2">
                        <li>• This is a pre-release version with potential bugs</li>
                        <li>• Some features may be incomplete or experimental</li>
                        <li>• Performance may not reflect the final product</li>
                        <li>• Data may not transfer to the final release</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">🔒 Privacy & Security</h4>
                      <ul className="space-y-2">
                        <li>• Your testing data is handled with care</li>
                        <li>• Report any security concerns immediately</li>
                        <li>• Don&apos;t share beta builds with non-testers</li>
                        <li>• Feedback may be used to improve the app</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center">
              <Link
                href={`/test-instruction/${appId}`}
                className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:-translate-x-1 transition-transform duration-300">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="text-lg">Back to Overview</span>
              </Link>

              <Link
                href={`/test-instruction/${appId}/review-maker`}
                className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-lg">Submit Reviews</span>
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
