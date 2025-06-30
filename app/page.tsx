import Link from 'next/link';

export default function HomePage() {
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
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                            Get Started
                        </button>
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