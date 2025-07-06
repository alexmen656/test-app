'use client'

import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { NewAppData } from '@/types';
import FormField from '@/components/FormField';
import ImageUpload from '@/components/ImageUpload';
import { useParams, useRouter } from 'next/navigation';
import { getBackendUrl } from '@/lib/api';
import { useSimpleFileUpload } from '@/hooks/useFileUpload';

/**
 * The page containing the form to post a new application.
 */
const NewAppPage: FC = () => {
    const router = useRouter();
    const params = useParams();
    const isEditing = params.id !== 'new';

    const [data, setData] = useState<NewAppData>({
        name: '',
        description: '',
        videoUrl: '',
        iosLink: '',
        androidLink: '',
        googleGroupLink: '',
        testingInstruction: '',
        price: 0,
        icon: null,
        coverImage: null,
        screenshots: []
    });
    const [previews, setPreviews] = useState<{ icon?: string; coverImage?: string; screenshots: string[] }>({ screenshots: [] });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrls, setUploadedUrls] = useState<{ icon?: string; coverImage?: string; screenshots: string[] }>({ screenshots: [] });
    const { upload, isUploading } = useSimpleFileUpload();

    useEffect(() => {
        const fetchAppData = async () => {
            if (!isEditing) return;

            setIsLoading(true);
            setError(null);

            try {
                const backendUrl = getBackendUrl();
                const postId = params.id;
                const token = localStorage.getItem('betabay_token');
                const headers: HeadersInit = {};

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${backendUrl}/api/test-posts/${postId}`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch app data: ${response.status}`);
                }

                const appData = await response.json();
                console.log('Fetched app data:', appData);

                setData({
                    name: appData.name || appData.app_name || '',
                    description: appData.description || '',
                    videoUrl: appData.videoUrl || appData.youtube_link || '',
                    iosLink: appData.iosLink || appData.ios_link || '',
                    androidLink: appData.androidLink || appData.android_link || '',
                    googleGroupLink: appData.googleGroupLink || appData.google_group_link || '',
                    testingInstruction: appData.testingInstruction || appData.testing_instruction || '',
                    price: typeof appData.price === 'string' ? parseFloat(appData.price) : (appData.price || 0),
                    icon: null,
                    coverImage: null,
                    screenshots: []
                });

                const previewsUpdate: { icon?: string; coverImage?: string; screenshots: string[] } = { screenshots: [] };
                const uploadedUrlsUpdate: { icon?: string; coverImage?: string; screenshots: string[] } = { screenshots: [] };

                if (appData.iconUrl || appData.icon_url) {
                    const iconUrl = appData.iconUrl || appData.icon_url;
                    previewsUpdate.icon = iconUrl;
                    uploadedUrlsUpdate.icon = iconUrl;
                }

                if (appData.coverImageUrl || appData.cover_image_url) {
                    const coverUrl = appData.coverImageUrl || appData.cover_image_url;
                    previewsUpdate.coverImage = coverUrl;
                    uploadedUrlsUpdate.coverImage = coverUrl;
                }

                if (Array.isArray(appData.screenshots) || Array.isArray(appData.screenshot_urls)) {
                    const screenshots = appData.screenshots || appData.screenshot_urls || [];
                    previewsUpdate.screenshots = screenshots;
                    uploadedUrlsUpdate.screenshots = screenshots;
                }

                setPreviews(previewsUpdate);
                setUploadedUrls(uploadedUrlsUpdate);

            } catch (err) {
                console.error('Error fetching app data:', err);
                setError('Failed to load app data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppData();
    }, [isEditing, params.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (!files || files.length === 0) return;

        try {
            if (name === 'screenshots') {
                const newFiles = Array.from(files);

                const newPreviews = newFiles.map(file => URL.createObjectURL(file));
                setPreviews(prev => ({ ...prev, screenshots: [...prev.screenshots, ...newPreviews] }));

                const uploadedScreenshots: string[] = [];
                for (const file of newFiles) {
                    try {
                        const url = await upload(file);
                        if (url) {
                            uploadedScreenshots.push(url);
                            console.log('Screenshot uploaded successfully:', url);
                        }
                    } catch (uploadError) {
                        console.error('Failed to upload screenshot:', uploadError);
                        alert(`Failed to upload one of the screenshots. Please try again.`);
                        return;
                    }
                }

                setUploadedUrls(prev => ({
                    ...prev,
                    screenshots: [...prev.screenshots, ...uploadedScreenshots]
                }));

                setData(prev => ({ ...prev, screenshots: [...prev.screenshots, ...newFiles] }));
            } else {
                const file = files[0];
                const previewUrl = URL.createObjectURL(file);
                setPreviews(prev => ({ ...prev, [name]: previewUrl }));

                try {
                    const url = await upload(file);
                    if (url) {
                        setUploadedUrls(prev => ({ ...prev, [name]: url }));
                        console.log(`${name} uploaded successfully:`, url);
                    } else {
                        throw new Error('Upload failed - no URL returned');
                    }
                } catch (uploadError) {
                    console.error(`Failed to upload ${name}:`, uploadError);
                    alert(`Failed to upload ${name}. Please try again.`);
                    setPreviews(prev => ({ ...prev, [name]: undefined }));
                    return;
                }

                setData(prev => ({ ...prev, [name]: file }));
            }
        } catch (error) {
            console.error('File upload failed:', error);
            alert('File upload failed. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.name.trim()) {
            alert("App Name is required.");
            return;
        }

        if (isUploading) {
            alert("Please wait for all file uploads to complete before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            const backendUrl = getBackendUrl();

            const jsonData = {
                app_name: data.name,
                description: data.description,
                youtube_link: data.videoUrl,
                ios_link: data.iosLink,
                android_link: data.androidLink,
                google_group_link: data.googleGroupLink,
                testing_instruction: data.testingInstruction,
                test_price: data.price,
                user_info: {
                    username: localStorage.getItem('betabay_username') || 'test',
                    profile_image: localStorage.getItem('betabay_profile_image') || 'https://example.com/test',
                    slack_user_id: localStorage.getItem('betabay_user_id') || 'test'
                },
                icon_url: uploadedUrls.icon || null,
                cover_image_url: uploadedUrls.coverImage || null,
                screenshot_urls: uploadedUrls.screenshots || []
            };

            console.log('Sending file URLs to backend:', {
                icon_url: jsonData.icon_url,
                cover_image_url: jsonData.cover_image_url,
                screenshot_urls: jsonData.screenshot_urls
            });

            const token = localStorage.getItem('betabay_token');
            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const endpoint = isEditing
                ? `${backendUrl}/api/test-posts/${params.id}`
                : `${backendUrl}/api/test-posts`;

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method: method,
                headers: headers,
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) {
                throw new Error(`Error ${isEditing ? 'updating' : 'creating'} app: ${response.status}`);
            }

            const result = await response.json();
            console.log(`App ${isEditing ? 'updated' : 'created'} successfully:`, result);

            router.push('/myapps');
        } catch (error) {
            console.error(`Failed to ${isEditing ? 'update' : 'create'} app:`, error);
            alert(`Failed to ${isEditing ? 'update' : 'create'} app. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/myapps');
    };

    return (
        <div className="max-w-5xl mx-auto md:px-5 px-2 mb-10">
            <header className="my-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        {isEditing ? 'Edit App' : 'Post a New App'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {isEditing
                            ? 'Update the details below to modify your app information.'
                            : 'Fill in the details below to get your app ready for testing.'
                        }
                    </p>
                </div>
                {isEditing && (
                    <button
                        onClick={() => router.push(`/detail/${params.id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        View Details
                    </button>
                )}
            </header>


            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="ml-3 text-lg text-gray-600">Loading app data...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                    <button
                        onClick={() => router.push('/myapps')}
                        className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                    >
                        Return to My Apps
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Upload Status Banner */}
                    {isUploading && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6">
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                                <p className="font-medium">Uploading files...</p>
                            </div>
                            <p className="text-sm mt-1">Please wait while your files are being uploaded.</p>
                        </div>
                    )}

                    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-700 mb-6">Core Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <ImageUpload
                                    label="App Icon"
                                    id="icon"
                                    onChange={handleFileChange}
                                    previewUrl={previews.icon}
                                />
                                {uploadedUrls.icon && (
                                    <div className="mt-2 text-sm text-green-600">
                                        ✅ Icon uploaded successfully
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <FormField label="App Name" id="name" placeholder="My Awesome App" value={data.name} onChange={handleChange} />
                                <FormField label="Description" id="description" as="textarea" placeholder="A brief, catchy description of your app." value={data.description} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-700 mb-6">Media & Visuals</h3>
                        <div className="space-y-6">
                            <div>
                                <ImageUpload
                                    label="Cover Image"
                                    id="coverImage"
                                    onChange={handleFileChange}
                                    previewUrl={previews.coverImage}
                                />
                                {uploadedUrls.coverImage && (
                                    <div className="mt-2 text-sm text-green-600">
                                        ✅ Cover image uploaded successfully
                                    </div>
                                )}
                            </div>

                            <div>
                                <ImageUpload
                                    label="Screenshots (Select multiple)"
                                    id="screenshots"
                                    onChange={handleFileChange}
                                    multiple
                                />
                                {uploadedUrls.screenshots.length > 0 && (
                                    <div className="mt-2 text-sm text-green-600">
                                        ✅ {uploadedUrls.screenshots.length} screenshot(s) uploaded successfully
                                    </div>
                                )}
                            </div>

                            {previews.screenshots.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                    {previews.screenshots.map((src, i) => (
                                        <div key={i} className="relative w-full aspect-square rounded-md overflow-hidden">
                                            <Image
                                                src={src}
                                                fill
                                                className="object-cover"
                                                alt={`Screenshot ${i + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <FormField label="YouTube Link (Optional)" id="videoUrl" placeholder="https://youtube.com/watch?v=..." value={data.videoUrl ?? ''} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-700 mb-6">Testing & Distribution</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="iOS Test Link (TestFlight)" id="iosLink" placeholder="https://testflight.apple.com/join/..." value={data.iosLink ?? ''} onChange={handleChange} />
                            <FormField label="Android Test Link (Play Store)" id="androidLink" placeholder="https://play.google.com/apps/testing/..." value={data.androidLink ?? ''} onChange={handleChange} />
                            <FormField label="Google Group Link (Optional)" id="googleGroupLink" placeholder="https://groups.google.com/g/..." value={data.googleGroupLink ?? ''} onChange={handleChange} />
                            <div className="md:col-span-2">
                                <FormField label="Testing Instructions" id="testingInstruction" as="textarea" placeholder="e.g., 'Log in with user: test@test.com, pass: 1234. Then, navigate to the dashboard and try creating a new project.'" value={data.testingInstruction} onChange={handleChange} />
                            </div>
                            <FormField label="Reward ($)" id="price" type="number" placeholder="0.00" value={data.price} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition disabled:opacity-50 disabled:transform-none"
                        >
                            {isUploading
                                ? 'Uploading files...'
                                : isSubmitting
                                    ? (isEditing ? 'Updating...' : 'Posting...')
                                    : (isEditing ? 'Update App' : 'Post App')
                            }
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default NewAppPage;