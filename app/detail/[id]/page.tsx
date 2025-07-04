'use client'; // This directive is necessary for using hooks like useState and managing state.

import Image from 'next/image';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, MessageSquare, Star } from 'lucide-react';
import { App } from '@/types';
import { getBackendUrl } from '@/lib/api';

const AppDetailPage: FC = () => {
    const router = useRouter();
    const { id } = useParams() as { id: string }; // Extract the dynamic route parameter


    const [appData, setAppData] = useState<App | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const currentUserId = 'a135d7e0-3d80-4ed1-b80c-a2fc1444308f';
    const isCreator = appData?.creator?.id === currentUserId;

    // Laden der App-Daten vom Backend
    useEffect(() => {
        const fetchAppData = async () => {
            setLoading(true);
            setError(null);

            try {
                const backendUrl = getBackendUrl();

                // Token aus localStorage holen
                const token = localStorage.getItem('betabay_token');
                const headers: HeadersInit = {};

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                // Daten vom Backend abrufen
                const response = await fetch(`${backendUrl}/api/test-posts/${id}`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch app data: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched app detail data:', data);

                setAppData(data);
            } catch (err) {
                console.error('Error fetching app data:', err);
                setError('Failed to load app data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppData();
    }, [id]);

    return (
        <div className="h-screen overflow-y-auto flex-1 bg-gray-50 text-gray-800 animate-fade-in">
            {/* Back button */}
            <button
                onClick={() => {
                    if (isCreator) {
                        router.push('/myapps');
                    } else {
                        router.push('/');
                    }
                }}
                className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
            >
                <ChevronLeft size={16} />
                Back to Explore
            </button>

            {loading ? (
                <div className="flex justify-center items-center h-64 mt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="ml-3 text-lg text-gray-600">Loading app data...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md m-10">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                    <button
                        onClick={() => router.push('/explore')}
                        className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                    >
                        Return to Explore
                    </button>
                </div>
            ) : appData ? (
                <>
                    {/* Cover Image */}
                    <div className="relative h-56 md:h-72 w-full bg-gray-200">
                        <Image
                            src={appData.coverImageUrl || appData.cover_image_url || '/vercel.svg'}
                            alt={`${appData.name || appData.app_name || 'App'} cover image`}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h1 className="text-3xl md:text-5xl font-bold text-white shadow-lg">
                                {appData.name || appData.app_name || 'Unnamed App'}
                            </h1>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Header Info */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
                            <div className="flex items-center gap-3">
                                {(appData.creator?.avatarUrl || appData.user_info?.profile_image) ? (
                                    <Image
                                        src={appData.creator?.avatarUrl || appData.user_info?.profile_image || '/vercel.svg'}
                                        alt={appData.creator?.name || appData.user_info?.username || 'Creator'}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600 font-bold">
                                            {(appData.creator?.name || appData.user_info?.username || 'U').charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <span className="font-semibold text-gray-600">
                                    {appData.creator?.name || appData.user_info?.username || 'Unknown Creator'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                {(appData.creator?.slackLink) && (
                                    <button onClick={() => {
                                        window.open(appData.creator?.slackLink, '_blank');
                                    }} className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300">
                                        <MessageSquare size={16} /> Message
                                    </button>
                                )}
                                <div className="flex items-center bg-white border-2 border-yellow-400 text-gray-800 px-4 py-2 rounded-full transition-shadow">
                                    <span className="w-7 h-7 mr-2 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold text-lg">
                                        h
                                    </span>
                                    <span className="font-bold text-lg text-gray-900">
                                        {appData.price ? appData.price : 'Free'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                {/* Description */}
                                <section>
                                    <h2 className="text-xl font-bold mb-3">Description</h2>
                                    <p className="text-gray-600 leading-relaxed">{appData.description || 'No description available.'}</p>
                                </section>

                                {/* Screenshots */}
                                <section className="mt-8">
                                    <h2 className="text-xl font-bold mb-4">Screenshots</h2>
                                    {appData.screenshots?.length || appData.screenshot_urls?.length ? (
                                        <div className="flex gap-4 overflow-x-auto">
                                            {(appData.screenshots || appData.screenshot_urls || []).map((src, index) => (
                                                <div
                                                    key={index}
                                                    className="relative h-200 min-w-[400px] rounded-lg bg-gray-200 overflow-hidden"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`Screenshot ${index + 1}`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform duration-300 hover:scale-105"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No screenshots available.</p>
                                    )}
                                </section>

                                {/* Video */}
                                {(appData.videoUrl || appData.youtube_link) && (
                                    <section className="mt-8">
                                        <h2 className="text-xl font-bold mb-4">Video</h2>
                                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                                            <iframe
                                                src={appData.videoUrl || appData.youtube_link || ''}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Sidebar */}
                            <aside>
                                {/* Join Test */}
                                <section className="rounded-lg border border-gray-200 bg-white p-4">
                                    <h3 className="font-bold mb-3">
                                        {isCreator ? 'Manage App' : 'Join Test'}
                                    </h3>
                                    {isCreator ? (
                                        <button
                                            onClick={() => router.push(`/myapps/edit/${appData.id}`)}
                                            className="block w-full text-center rounded-md bg-green-600 py-2.5 font-semibold text-white transition-colors hover:bg-green-700"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <a href={`/test-instruction/${appData.id}`} className="block w-full text-center rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700">
                                            Join
                                        </a>
                                    )}
                                </section>

                                {/* Joined Testers */}
                                {appData.joinedTesters && appData.joinedTesters.length > 0 && (
                                    <section className="mt-6">
                                        <h3 className="text-lg font-bold mb-3">
                                            Joined Testers ({appData.joinedTesters.length})
                                        </h3>
                                        <div className="space-y-3">
                                            {appData.joinedTesters.map((tester) => (
                                                <div
                                                    key={tester.id}
                                                    className="flex items-center gap-3 rounded-md bg-gray-100 p-2"
                                                >
                                                    <Image
                                                        src={tester.avatarUrl}
                                                        alt={tester.name}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full"
                                                    />
                                                    <span className="font-medium text-gray-700">
                                                        {tester.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Reviews */}
                                {appData.reviews && appData.reviews.length > 0 && (
                                    <section className="mt-8">
                                        <h3 className="text-lg font-bold mb-4">
                                            Reviews ({appData.reviews.length})
                                        </h3>
                                        <div className="space-y-4">
                                            {appData.reviews.map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="rounded-lg bg-white border border-gray-200 p-3"
                                                >
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-semibold">
                                                            {review.reviewerName}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-yellow-500">
                                                            <span className="font-bold">
                                                                {review.score}
                                                            </span>
                                                            <Star
                                                                size={16}
                                                                fill="currentColor"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </aside>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-64 mt-20">
                    <p className="text-lg text-gray-600">App not found.</p>
                </div>
            )}
        </div>
    );
};

export default AppDetailPage;