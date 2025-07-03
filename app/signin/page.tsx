'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Create a component that uses searchParams
function SignInContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authStatus = searchParams.get('auth');
    const token = searchParams.get('token');
    
    if (authStatus === 'success' && token) {
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      // Die Benutzerdaten werden im useAuth-Hook aus der API geladen
      // und im localStorage gespeichert, nachdem der Token gesetzt wurde
      
      // Redirect to explore page or dashboard
      router.push('/');
    } else if (authStatus === 'error') {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams, router]);

  const handleSlackSignIn = () => {
    setIsLoading(true);
    setError('');
    
    const backendUrl = 'https://betabay.vercel.app';//process.env.NEXT_PUBLIC_BACKEND_URL || 
    
    window.location.href = `${backendUrl}/api/auth/slack`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-white">BB</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Beta Bay
          </h2>
          <p className="text-gray-600">
            Sign in to start testing amazing apps
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleSlackSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.1a2.528 2.528 0 0 1 2.52 2.542 2.528 2.528 0 0 1-2.52 2.523zM18.958 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 18.958 10.1a2.528 2.528 0 0 1 2.52 2.542 2.528 2.528 0 0 1-2.52 2.523z"/>
                  <path d="M12 2.042c-.965 0-1.75.757-1.75 1.693v6.849c0 .936.785 1.693 1.75 1.693s1.75-.757 1.75-1.693V3.735c0-.936-.785-1.693-1.75-1.693z"/>
                  <path d="M5.042 1.948C4.077 1.948 3.292 2.705 3.292 3.641v6.849c0 .936.785 1.693 1.75 1.693s1.75-.757 1.75-1.693V3.641c0-.936-.785-1.693-1.75-1.693zM18.958 1.948c-.965 0-1.75.757-1.75 1.693v6.849c0 .936.785 1.693 1.75 1.693s1.75-.757 1.75-1.693V3.641c0-.936-.785-1.693-1.75-1.693z"/>
                </svg>
              )}
              <span className="font-medium text-gray-700">
                {isLoading ? 'Signing in...' : 'Continue with Slack'}
              </span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have Slack?{' '}
                <a 
                  href="https://slack.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Get Slack for free
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to home
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
