'use client'; // This directive is necessary for using hooks like useState and managing state.

import Image from 'next/image';
import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, MessageSquare, Star, Gem } from 'lucide-react';
import { allApps } from '@/app/explore/page'; // Import the allApps array from the explore page
import AppCard, { App } from '@/components/AppCard'; // Import the AppCard component and type

const AppDetailPage: FC<{ app: App; onBack: () => void }> = ({ app, onBack }) => {
    const router = useRouter();
    const { id } = useParams() as { id: string }; // Extract the dynamic route parameter
    const appData = allApps[parseInt(id)-1];

    return (
        <div className="h-screen overflow-y-auto flex-1 bg-gray-50 text-gray-800 animate-fade-in">
            {/* Back button */}
            <button
                onClick={onBack}
                className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
            >
                <ChevronLeft size={16} />
                Back to Explore
            </button>

            {/* Cover Image */}
            <div className="relative h-56 md:h-72 w-full bg-gray-200">
                <Image
                    src={appData?.coverImageUrl}
                    alt={`${appData.name} cover image`}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white shadow-lg">
                        {appData?.name || app.name}
                    </h1>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3">
                        <Image
                            src={appData.creator.avatarUrl}
                            alt={appData.creator.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="font-semibold text-gray-600">{appData.creator.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300">
                            <MessageSquare size={16} /> Message
                        </button>
                        <div className="flex items-center gap-2 rounded-md bg-green-100 px-4 py-2">
                            <span className="font-bold text-green-700">{appData.price}</span>
                            {appData.coins && (
                                <div className="flex items-center gap-1 text-yellow-600">
                                    <Gem size={16} />
                                    <span className="font-semibold">{appData.coins}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <section>
                            <h2 className="text-xl font-bold mb-3">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{appData.description}</p>
                        </section>

                        {/* Screenshots */}
                        <section className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Screenshots</h2>
                            <div className="flex gap-4 overflow-x-auto">
                                {appData.screenshots.map((src, index) => (
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
                        </section>

                        {/* Video */}
                        {appData.videoUrl && (
                            <section className="mt-8">
                                <h2 className="text-xl font-bold mb-4">Video</h2>
                                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                                    <video
                                        src={appData.videoUrl}
                                        controls
                                        className="w-full h-full"
                                    ></video>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside>
                        {/* Join Test */}
                        <section className="rounded-lg border border-gray-200 bg-white p-4">
                            <h3 className="font-bold mb-3">Join Test</h3>
                            <button className="w-full rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700">
                                Join
                            </button>
                        </section>

                        {/* Joined Testers */}
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

                        {/* Reviews */}
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
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AppDetailPage;