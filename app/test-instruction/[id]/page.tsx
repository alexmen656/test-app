'use client';

import { FC, use } from 'react';
import { App } from '@/types';
import { allApps } from '@/public/MockData';
import Link from 'next/link';

interface TestInstructionPageProps {
  params: Promise<{ id: string }>;
}

const TestInstructionPage: FC<TestInstructionPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const appId = parseInt(resolvedParams.id);
  const app = allApps.find(a => a.id === appId);
  
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
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
                <img 
                  src={app.iconUrl} 
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">{app.name}</h2>
                <p className="text-xl text-gray-600 mb-4">by {app.creator.name}</p>
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
                    Welcome to an exclusive beta testing experience! You're about to explore cutting-edge features 
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

            {/* Step 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-600 rounded-[16px] flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">Share Feedback</h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Submit detailed reviews and suggestions that will help make the final product even better.
              </p>
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
