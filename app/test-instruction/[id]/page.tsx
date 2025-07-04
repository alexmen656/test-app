'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { App } from '@/types';
import { useParams } from 'next/navigation';
import { getBackendUrl } from '@/lib/api';

// Since this component doesn't currently need props, we can remove the interface
// and use React.FC directly

const TestInstructionPage: FC = () => {
  const [reviews, setReviews] = useState<{ name: string; text: string; rating: string }[]>([]);
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { id } = useParams() as { id: string };
  const appId = parseInt(id);
  
  // Fetch app data from backend
  useEffect(() => {
    const fetchAppData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const backendUrl = getBackendUrl();
        
        // Get token from localStorage
        const token = localStorage.getItem('betabay_token');
        const headers: HeadersInit = {};
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Fetch data from backend
        const response = await fetch(`${backendUrl}/api/test-posts/${appId}`, {
          method: 'GET',
          headers: headers
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch app data: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched app data for test instructions:', data);
        
        setApp(data);
      } catch (err) {
        console.error('Error fetching app data:', err);
        setError('Failed to load app data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppData();
  }, [appId]);
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading app data...</p>
        </div>
      </div>
    );
  }
  
  // If error, show error state
  if (error || !app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">App Not Found</h1>
          <p className="text-xl text-gray-600">{error || "The requested app does not exist."}</p>
        </div>
      </div>
    );
  }

  const testInstructionData = app;
  const handleAppleClick = () => {
    window.open(testInstructionData?.iosLink || testInstructionData?.ios_link || '#', '_blank');
  };

  const handleGoogleClick = () => {
    window.open(testInstructionData?.androidLink || testInstructionData?.android_link || '#', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Beta Testing</h1>
          <p className="text-xl text-gray-600 font-light">{testInstructionData?.subtitle || 'Test this application'}</p>
        </div>
        
        {/* App Hero Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="px-8 py-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md relative">
                <Image 
                  src={app?.iconUrl || app?.icon_url || '/vercel.svg'} 
                  alt={app?.name || app?.app_name || 'App icon'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">{app?.name || app?.app_name || 'Unnamed App'}</h2>
                <p className="text-lg text-gray-600 mb-1">by {app?.creator?.name || app?.user_info?.username || 'Unknown Creator'}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">Beta</span>
                </div>
              </div>
            </div>
            
            {/* Instructions Card */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing Instructions</h3>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Welcome to the beta testing program for {app?.name || app?.app_name || 'this app'}!</p>
                    <div>
                      <p className="font-medium mb-2">Focus Areas:</p>
                      <ul className="space-y-1 text-gray-600">
                        {testInstructionData?.focusAreas?.map((area, index) => (
                          <li key={index}>• {area}</li>
                        )) || <li>• General app testing</li>}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-2xl font-light text-gray-900">{testInstructionData?.testPeriod || '2 weeks'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Feedback</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{testInstructionData?.feedbackInstructions || 'Please provide detailed feedback on any issues you encounter.'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Focus</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{testInstructionData?.testingFocus || 'General usability and feature testing'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Testing Process</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[16px] flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">Download & Setup</h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Get the beta version and follow our comprehensive setup guidelines for the best testing experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-[16px] flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">Explore & Test</h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Use the app naturally while focusing on key features. Note any bugs, crashes, or improvement areas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Testing Guidelines</h3>
              <ul className="text-blue-800 space-y-2 leading-relaxed">
                <li>This is a pre-release version with potential bugs and incomplete features</li>
                <li>Focus on {(testInstructionData?.testingFocus || 'general usability').toLowerCase()}</li>
                <li>Report crashes or major issues immediately through the feedback channels</li>
                <li>Save progress may not transfer to the final release version</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center max-w-4xl mx-auto">
          <Link
            href={`/test-instruction/${appId}/download-guidelines`}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <span className="text-lg">Download & Guidelines</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <Link
            href={`/test-instruction/${appId}/review-maker`}
            className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="text-lg">Submit Reviews</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-[32px] p-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
