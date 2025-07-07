'use client';

import { FC, use, useState, useEffect } from 'react';
import { allApps } from '@/public/MockData';
import Link from 'next/link';
import Image from 'next/image';
import { App } from '@/types';
import { getBackendUrl } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface ReviewMakerPageProps {
  params: Promise<{ id: string }>;
}

const ReviewMakerPage: FC<ReviewMakerPageProps> = ({ params }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const resolvedParams = use(params);
  const appId = resolvedParams.id;
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load existing reviews for this test post
  useEffect(() => {
    const fetchReviews = async () => {
      if (!app) return;

      try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/api/reviews/test-post/${appId}`);

        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [app, appId]);

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
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading app data...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-extralight text-gray-900 mb-6 tracking-tight">Review Maker</h1>
          <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Share your valuable feedback about {app.name || app.app_name || 'this app'} and help shape its future
          </p>
        </div>

        {/* App Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[40px] shadow-xl border border-white/50 overflow-hidden mb-16">
          <div className="px-12 py-12">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-[18px] overflow-hidden shadow-lg ring-4 ring-white/30">
                <Image
                  src={app.iconUrl || app.icon_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNEE5MEUyIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwPC90ZXh0Pgo8L3N2Zz4K'}
                  alt={app.name || app.app_name || 'App icon'}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{app.name || app.app_name || 'Unknown App'}</h2>
                <p className="text-xl text-gray-600 mb-4">by {app.creator?.name || app.user_info?.username || 'Unknown Creator'}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg">
                    Beta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Review Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Submit Your Review</h3>
          <form
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-[40px] border border-white/50 shadow-xl p-12 space-y-8"
            onSubmit={async (e) => {
              e.preventDefault();

              if (!isAuthenticated) {
                alert('Please sign in to submit a review.');
                return;
              }

              const formData = new FormData(e.currentTarget);
              const reviewScore = parseInt(formData.get('rating') as string);
              const comment = formData.get('reviewText') as string;

              if (!reviewScore || !comment.trim()) {
                alert('Please provide both a rating and review text.');
                return;
              }

              setSubmitting(true);

              try {
                const backendUrl = getBackendUrl();
                const token = localStorage.getItem('betabay_token');

                if (!token) {
                  alert('Authentication required. Please sign in again.');
                  return;
                }

                const response = await fetch(`${backendUrl}/api/reviews`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    test_post_id: appId,
                    review_score: reviewScore,
                    comment: comment.trim()
                  })
                });

                if (response.ok) {
                  const data = await response.json();

                  // Add the new review to the list
                  // Add the new review to the list
                  if (data.review) {
                    setReviews(prev => [data.review, ...prev]);
                  }
                  // Reset form
                  e.currentTarget.reset();

                  alert('Thank you for your review! Your feedback has been submitted successfully.');
                } else {
                  const errorData = await response.json();
                  alert(`Failed to submit review: ${errorData.error || 'Unknown error'}`);
                }
              } catch (error) {
                console.error('Error submitting review:', error);
                alert('Failed to submit review. Please try again.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div>
              <label htmlFor="rating" className="block text-lg font-bold text-gray-900 mb-4">
                Overall Rating
              </label>
              <select
                id="rating"
                name="rating"
                className="w-full px-6 py-4 border border-gray-200 rounded-[20px] shadow-sm focus:ring-green-500 focus:border-green-500 text-lg bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
                required
              >
                <option value="">Select a rating</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                <option value="4">⭐⭐⭐⭐ 4 - Good</option>
                <option value="3">⭐⭐⭐ 3 - Average</option>
                <option value="2">⭐⭐ 2 - Poor</option>
                <option value="1">⭐ 1 - Terrible</option>
              </select>
            </div>

            <div>
              <label htmlFor="reviewText" className="block text-lg font-bold text-gray-900 mb-4">
                Your Detailed Review
              </label>
              <textarea
                id="reviewText"
                name="reviewText"
                rows={8}
                className="w-full px-6 py-4 border border-gray-200 rounded-[20px] shadow-sm focus:ring-green-500 focus:border-green-500 text-lg bg-white/90 backdrop-blur-sm resize-none transition-all duration-200 hover:shadow-md"
                placeholder="Share your detailed feedback about the app. What did you like? What could be improved? Any bugs or issues you encountered?"
                required
              ></textarea>
            </div>

            {/* Review Guidelines */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-[24px] p-8 border border-green-200">
              <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Review Guidelines
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-green-800">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                    <span>Be specific about features you tested</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                    <span>Mention any bugs or crashes encountered</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                    <span>Include suggestions for improvements</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2.5 flex-shrink-0"></div>
                    <span>Keep feedback constructive and helpful</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={submitting || !isAuthenticated}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-[20px] transition-all duration-300 shadow-xl hover:shadow-2xl text-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {!isAuthenticated && (
                <p className="mt-4 text-red-600 text-sm">
                  Please sign in to submit a review.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Existing Reviews Section */}
        {reviews.length > 0 && (
          <div className="mb-20">
            <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Community Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/80 backdrop-blur-sm rounded-[24px] border border-white/50 shadow-lg p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {review.avatar_url ? (
                        <Image
                          src={review.avatar_url}
                          alt={review.display_name || review.username}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{(review.display_name || review.username).charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="font-semibold text-gray-900">
                          {review.display_name || review.username}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={i < review.review_score ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={i < review.review_score ? "text-yellow-400" : "text-gray-300"}
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            {review.review_score}/5
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Link
            href={`/test-instruction/${appId}/download-guidelines`}
            className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:-translate-x-1 transition-transform duration-300">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-lg">Back to Download</span>
          </Link>
        </div>
      </div>
    </div>
  );

};

export default ReviewMakerPage;
