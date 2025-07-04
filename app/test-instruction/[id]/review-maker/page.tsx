'use client';

import { FC, use, useState } from 'react';
import { allApps } from '@/public/MockData';
import Link from 'next/link';
import Image from 'next/image';

interface ReviewMakerPageProps {
  params: Promise<{ id: string }>;
}

const ReviewMakerPage: FC<ReviewMakerPageProps> = ({ params }) => {
  const [reviews, setReviews] = useState<{ name: string; text: string; rating: string }[]>([]);
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-extralight text-gray-900 mb-6 tracking-tight">Review Maker</h1>
          <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Share your valuable feedback about {app.name} and help shape its future
          </p>
        </div>
        
        {/* App Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[40px] shadow-xl border border-white/50 overflow-hidden mb-16">
          <div className="px-12 py-12">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-[18px] overflow-hidden shadow-lg ring-4 ring-white/30">
                <Image 
                  src={app.iconUrl ?? '/default-app-icon.png'}
                  alt={app.name ?? 'App icon'}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h2>
                <p className="text-xl text-gray-600 mb-4">by {app.creator?.name}</p>
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
              
              // Show success message
              alert('Thank you for your review! Your feedback has been submitted successfully.');
            }}
          >
            <div>
              <label htmlFor="reviewerName" className="block text-lg font-bold text-gray-900 mb-4">
                Your Name
              </label>
              <input
                type="text"
                id="reviewerName"
                name="reviewerName"
                className="w-full px-6 py-4 border border-gray-200 rounded-[20px] shadow-sm focus:ring-green-500 focus:border-green-500 text-lg bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
                placeholder="Enter your name"
                required
              />
            </div>
            
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
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-[20px] transition-all duration-300 shadow-xl hover:shadow-2xl text-lg transform hover:-translate-y-1"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>

        {/* Review History Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Your Review History</h3>
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-[40px] border border-white/50 shadow-xl p-12">
            {reviews.length > 0 ? (
              <div className="space-y-8">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xl font-bold text-gray-900">{review.name}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < parseInt(review.rating) ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>
                            ⭐
                          </span>
                        ))}
                        <span className="ml-2 text-lg text-gray-600 font-semibold">({review.rating}/5)</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <p className="text-gray-600 text-xl mb-3">No reviews submitted yet.</p>
                <p className="text-gray-500 text-lg">Your reviews will appear here after submission.</p>
              </div>
            )}
          </div>
        </div>

        {/* Complete Testing Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-[40px] p-12 max-w-4xl mx-auto mb-8 shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-green-900">Ready to Complete?</h3>
            </div>
            <p className="text-green-800 mb-10 leading-relaxed text-xl">
              Once you finish your reviews, you&apos;ll be moved to your completed testing apps and the developer will be notified of your valuable feedback.
            </p>
            <button
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-[20px] transition-all duration-300 shadow-xl hover:shadow-2xl text-lg transform hover:-translate-y-1"
              onClick={() => {
                if (window.confirm('Are you sure you want to finish your reviews and complete the testing process?')) {
                  setReviews([]); // Clear reviews if needed
                  window.location.href = '/joined';
                  console.log('Thank you for completing your reviews!');
                  // TODO: Delete the app from joined testing
                  // TODO: Send in-app notification to app developer
                }
              }}
            >
              🎉 Finish Testing & Submit All Reviews
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Link
            href={`/test-instruction/${appId}/download-guidelines`}
            className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="group-hover:-translate-x-1 transition-transform duration-300">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-lg">Back to Download</span>
          </Link>

          <Link
            href={`/test-instruction/${appId}/download-guidelines`}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 px-10 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <span className="text-lg">Back to Download</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewMakerPage;
