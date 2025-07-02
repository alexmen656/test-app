'use client';

import Link from 'next/link';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Create a client component that uses the search params
function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuthToken, debugStorage } = useAuth();

    useEffect(() => {
        const authStatus = searchParams.get('auth');
        const token = searchParams.get('token');
        
        console.log('HomePage: authStatus =', authStatus, 'token =', token ? 'present' : 'missing');
        
        // Debug localStorage
        debugStorage();
        
        if (authStatus === 'success' && token) {
            console.log('HomePage: Storing token and redirecting...');
            console.log('HomePage: Token preview =', token.substring(0, 50) + '...');
            
            // Use the auth hook to set the token
            setAuthToken(token);
            
            // Redirect to explore page after a short delay
            setTimeout(() => {
                router.push('/explore');
            }, 1000);
        }
    }, [searchParams, router, setAuthToken, debugStorage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="container mx-auto px-6 py-8">
                <nav className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800">
                        Beta Bay
                    </div>
                    <div className="space-x-6">
                        <Link href="/features" className="text-gray-600 hover:text-gray-800">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-gray-800">
                            Pricing
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                            Contact
                        </Link>
                        <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Sign In
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">
                        Welcome to Beta Bay
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        The ultimate platform for testing and launching your next big idea. 
                        Get early feedback, iterate quickly, and build something amazing.
                    </p>
                    <div className="space-x-4">
                        <Link href="/signin" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-block">
                            Get Started
                        </Link>
                        <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-blue-600 text-3xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold mb-3">Fast Deployment</h3>
                        <p className="text-gray-600">
                            Deploy your beta versions in minutes with our streamlined process.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-blue-600 text-3xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
                        <p className="text-gray-600">
                            Get instant insights on user behavior and feedback.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-blue-600 text-3xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold mb-3">Community Feedback</h3>
                        <p className="text-gray-600">
                            Connect with beta testers and gather valuable insights.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 mt-24">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 Beta Bay. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

// Main page component that uses Suspense boundary
export default function HomePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600 text-lg">Loading...</p>
            </div>
        </div>}>
            <HomeContent />
        </Suspense>
    );
}