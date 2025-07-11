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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Beta Testing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join the exclusive beta program and help shape the future of innovative apps
          </p>
        </div>

        {/* App Hero Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="px-8 py-10">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={app.iconUrl || app.icon_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNEE5MEUyIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwPC90ZXh0Pgo8L3N2Zz4K'}
                  alt={app.name || app.app_name || 'App Icon'}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">{app.name || app.app_name || 'Unknown App'}</h2>
                <p className="text-lg text-gray-600 mb-3">by {app.creator?.name || app.user_info?.username || 'Unknown Creator'}</p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Beta
                  </span>
                </div>
              </div>
            </div>

            {/* App Description */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Beta</h3>
              <p className="text-gray-700 leading-relaxed">
                Welcome to an exclusive beta testing experience! You&apos;re about to explore cutting-edge features
                before they reach the public. Your feedback will directly influence the final product.
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Step by Step</h3>
          
          {/* Step by Step Process */}
          <div className="space-y-4">
            {/* Step 1 - Join Beta Program */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">1</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Join Beta Program</h4>
                  <p className="text-gray-600">
                    Sign up to get early access to new features.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/test-instruction/${appId}/join`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Join
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 - Download & Setup */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 opacity-60">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">2</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-gray-500 mb-1">Download & Setup</h4>
                  <p className="text-gray-500">
                    Get the app and follow setup instructions.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/test-instruction/${appId}/download-guidelines`}
                    className="bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                  >
                    Download
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 3 - Test & Review */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 opacity-60">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">3</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-gray-500 mb-1">Test & Review</h4>
                  <p className="text-gray-500">
                    Try the app and share your feedback.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/test-instruction/${appId}/review-maker`}
                    className="bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                  >
                    Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionPage;
