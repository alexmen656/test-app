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
        
        // Fetch data from backend using the ID directly (no parsing needed)
        const response = await fetch(`${backendUrl}/api/test-posts/${id}`, {
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
    
    if (id) {
      fetchAppData();
    }
  }, [id]);
  
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

  // Use the real app data from API
  const testInstructionData = app;
  const appName = app?.name || app?.app_name || 'Unnamed App';
  const creatorName = app?.creator?.name || app?.user_info?.username || 'Unknown Creator';
  const iconUrl = app?.iconUrl || app?.icon_url;
  const coverImageUrl = app?.coverImageUrl || app?.cover_image_url;
  const iosLink = app?.iosLink || app?.ios_link;
  const androidLink = app?.androidLink || app?.android_link;
  const testingInstruction = app?.testingInstruction || app?.testing_instruction;
  const description = app?.description;
  
  const handleAppleClick = () => {
    if (iosLink) {
      window.open(iosLink, '_blank');
    } else {
      alert('iOS testing link is not available for this app.');
    }
  };

  const handleGoogleClick = () => {
    if (androidLink) {
      window.open(androidLink, '_blank');
    } else {
      alert('Android testing link is not available for this app.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Beta Testing</h1>
          <p className="text-xl text-gray-600 font-light">{description || `Test ${appName}`}</p>
        </div>
        
        {/* App Hero Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="px-8 py-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md relative bg-gray-100">
                {iconUrl ? (
                  <Image 
                    src={iconUrl} 
                    alt={`${appName} icon`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                    <span className="text-white text-lg font-semibold">
                      {appName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">{appName}</h2>
                <p className="text-lg text-gray-600 mb-1">by {creatorName}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">Beta</span>
                  {app?.test_price && (
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">
                      ${app.test_price} reward
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Instructions Card */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing Instructions</h3>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Welcome to the beta testing program for {appName}!</p>
                    
                    {testingInstruction ? (
                      <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="font-medium mb-2">Specific Instructions:</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{testingInstruction}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-2">General Testing Guidelines:</p>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Test all major features and functionality</li>
                          <li>• Report any bugs or crashes you encounter</li>
                          <li>• Provide feedback on user experience</li>
                          <li>• Check app performance and loading times</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Reward</p>
                    <p className="text-2xl font-light text-gray-900">
                      {app?.test_price ? `$${app.test_price}` : 'Free'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">App Type</p>
                    <div className="space-y-1">
                      {iosLink && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-2">
                          iOS
                        </span>
                      )}
                      {androidLink && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Android
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Focus</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Please focus on overall usability, feature functionality, and report any bugs or issues you encounter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-light text-gray-900 mb-8">Download</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            {iosLink && (
              <button 
                onClick={handleAppleClick}
                className="bg-black hover:bg-gray-800 text-white font-medium py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>Join the beta for iOS</span>
              </button>
            )}
            {androidLink && (
              <button 
                onClick={handleGoogleClick}
                className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200 shadow-lg hover:shadow-xl"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Join the beta for Android</span>
              </button>
            )}
            {!iosLink && !androidLink && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No download links are currently available for this app.</p>
                <p className="text-gray-400 text-sm mt-2">Please contact the app developer for testing access.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Testing Guidelines</h3>
              <ul className="text-blue-800 space-y-2 leading-relaxed">
                <li>This is a pre-release version with potential bugs and incomplete features</li>
                <li>Focus on general usability and report any issues you encounter</li>
                <li>Report crashes or major issues immediately through the feedback channels</li>
                <li>Your feedback will help improve the final release version</li>
                {app?.test_price && (
                  <li>Complete testing to receive your ${app.test_price} reward</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Review Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">Submit Your Review</h3>
          <form
            className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newReview = {
          name: formData.get('reviewerName') as string,
          text: formData.get('reviewText') as string,
          rating: formData.get('rating') as string,
              };
              console.log('Review submitted:', newReview);
              setReviews((prevReviews) => [...prevReviews, newReview]);
              e.currentTarget.reset();
            }}
          >
            <div>
              <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-2">
          Your Name
              </label>
              <input
          type="text"
          id="reviewerName"
          name="reviewerName"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
          required
              />
            </div>
            <div>
              <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
              </label>
              <textarea
          id="reviewText"
          name="reviewText"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Share your feedback about the app"
          required
              ></textarea>
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating
              </label>
              <select
          id="rating"
          name="rating"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
              >
          <option value="">Select a rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
              </select>
            </div>
            <div className="text-center">
              <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200"
              >
          Submit Review
              </button>
            </div>
          </form>

          {/* Review History Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">Review History</h3>
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
              {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <p className="text-lg font-medium text-gray-900">{review.name}</p>
              <p className="text-sm text-gray-600">{review.text}</p>
              <p className="text-sm text-yellow-500">Rating: {review.rating} / 5</p>
            </div>
          ))
              ) : (
          <p className="text-center text-gray-600">No reviews submitted yet.</p>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200"
              onClick={() => {
                if (window.confirm('Are you sure you want to finish your reviews?')) {
                  setReviews([]); // Clear reviews if needed
                  window.location.href = '/joined';
                  console.log('Thank you for completing your reviews!');
                  //Delete the app from joined testing
                  //send in-app notification to app developer
              }
              }}
            >
              Finish Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionPage;
