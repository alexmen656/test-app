'use client';

import { FC, use, useState, useEffect } from 'react';
import { allApps } from '@/public/MockData';
import Image from 'next/image';
import { App } from '@/types';
import { getBackendUrl } from '@/lib/api';
import Link from 'next/link';

interface TestInstructionPageProps {
  params: Promise<{ id: string }>;
}

const TestInstructionPage: FC<TestInstructionPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const appId = resolvedParams.id;
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading app data...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  // If app not found, show error
  if (!app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">App Not Found</h1>
          <p className="text-xl text-gray-600">The requested app does not exist.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-extralight text-gray-900 mb-6 tracking-tight">Beta Testing</h1>
          <p className="text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
            Join the exclusive beta program and help shape the future of innovative apps
          </p>
        </div>

        {/* App Hero Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[40px] shadow-xl border border-white/50 overflow-hidden mb-16">
          <div className="px-12 py-16">
            <div className="flex items-center gap-10 mb-12">
              <div className="w-36 h-36 rounded-[24px] overflow-hidden shadow-lg ring-4 ring-white/30">
                <Image
                  src={app.iconUrl || app.icon_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNEE5MEUyIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwPC90ZXh0Pgo8L3N2Zz4K'}
                  alt={app.name || app.app_name || 'App Icon'}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">{app.name || app.app_name || 'Unknown App'}</h2>
                <p className="text-xl text-gray-600 mb-4">by {app.creator?.name || app.user_info?.username || 'Unknown Creator'}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg">
                    Beta
                  </span>
                </div>
              </div>
            </div>

            {/* App Description */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-[28px] p-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">About This Beta</h3>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Welcome to an exclusive beta testing experience! You&apos;re about to explore cutting-edge features
                    before they reach the public. Your feedback will directly influence the final product.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span className="text-gray-700 font-medium">Early access to premium features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      <span className="text-gray-700 font-medium">Direct line to development team</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                      <span className="text-gray-700 font-medium">Shape the final product</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Testing Duration</p>
                    <p className="text-3xl font-light text-gray-900">2-3 Weeks</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Commitment Level</p>
                    <p className="text-lg text-gray-600">Moderate - Test when convenient</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Reward</p>
                    <p className="text-lg text-gray-600">Free premium access & credits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Your Beta Testing Journey</h3>
          
          {/* Step by Step Process */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1 - Join Beta Program */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-xl mb-8">
              <div className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[20px] flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Join Beta Program</h4>
                  <p className="text-gray-600 text-lg mb-4">
                    Start your exclusive beta testing journey by joining the program first.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/test-instruction/${appId}/join`}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-[16px] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 - Download & Setup */}
            <div className="bg-white/60 backdrop-blur-sm rounded-[32px] p-8 border border-white/30 shadow-lg mb-8 opacity-75">
              <div className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-400 rounded-[20px] flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl font-bold text-gray-500 mb-2">Download & Setup</h4>
                  <p className="text-gray-500 text-lg mb-4">
                    Get the beta version and setup guidelines. Available after joining the program.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/test-instruction/${appId}/download-guidelines`}
                    className="bg-gray-400 text-white font-bold py-4 px-8 rounded-[16px] cursor-not-allowed opacity-50"
                  >
                    Download
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 3 - Test & Review */}
            <div className="bg-white/60 backdrop-blur-sm rounded-[32px] p-8 border border-white/30 shadow-lg opacity-75">
              <div className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-400 rounded-[20px] flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl font-bold text-gray-500 mb-2">Test & Submit Reviews</h4>
                  <p className="text-gray-500 text-lg mb-4">
                    Test the app and share your valuable feedback. Available after completing setup.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/test-instruction/${appId}/review-maker`}
                    className="bg-gray-400 text-white font-bold py-4 px-8 rounded-[16px] cursor-not-allowed opacity-50"
                  >
                    Submit Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Why Join This Beta?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[16px] flex items-center justify-center mb-6 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Exclusive Access</h4>
              <p className="text-gray-600 leading-relaxed">
                Be among the first to experience cutting-edge features before public release.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-[16px] flex items-center justify-center mb-6 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Direct Impact</h4>
              <p className="text-gray-600 leading-relaxed">
                Your feedback directly shapes the final product and influences development decisions.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[16px] flex items-center justify-center mb-6 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Premium Rewards</h4>
              <p className="text-gray-600 leading-relaxed">
                Earn lifetime premium access, exclusive badges, and priority access to future betas.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-[32px] p-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-yellow-900">Beta Tester Benefits</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-yellow-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                <span>Lifetime premium access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                <span>Exclusive beta tester badge</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                <span>Early access to future betas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                <span>Direct developer communication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionPage;
