'use client'

import React, { FC, useState, ChangeEvent } from 'react';
import { NewAppData } from '@/types';
import FormField from '@/components/FormField';
import ImageUpload from '@/components/ImageUpload';
import { useParams, useRouter } from 'next/navigation';
import { getBackendUrl } from '@/lib/api';



/**
 * The page containing the form to post a new application.
 */
const NewAppPage: FC = () => {
    const router = useRouter();
    const params = useParams();
    const isEditing = params.id !== 'new';
    
    const [data, setData] = useState<NewAppData>({
        name: '', description: '', youtubeLink: '', iosLink: '', androidLink: '',
        googleGroupLink: '', testingInstruction: '', price: 0, icon: null,
        coverImage: null, screenshots: []
    });
    const [previews, setPreviews] = useState<{ icon?: string; coverImage?: string; screenshots: string[] }>({ screenshots: [] });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (!files || files.length === 0) return;

        if (name === 'screenshots') {
            const newFiles = Array.from(files);
            setData(prev => ({ ...prev, screenshots: [...prev.screenshots, ...newFiles] }));
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews(prev => ({ ...prev, screenshots: [...prev.screenshots, ...newPreviews] }));
        } else {
            const file = files[0];
            setData(prev => ({ ...prev, [name]: file }));
            setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.name.trim()) {
            alert("App Name is required.");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const backendUrl = getBackendUrl();
            
            // Prepare JSON data for upload
            const jsonData = {
                app_name: data.name,
                description: data.description,
                youtube_link: data.youtubeLink,
                //ios_link: data.iosLink,
                //android_link: data.androidLink,
                google_group_link: data.googleGroupLink,
                /*testing_instruction: data.testingInstruction,*/
                /*price: data.price,*/
                
                // We'll need to handle file uploads separately or convert them to base64
                // For this JSON implementation, we'll assume the backend can accept these as null
                // or you would need to implement a separate file upload endpoint
                /*icon_url: null,*/
                /*cover_image_url: null,*/
                /*screenshot_urls: []*/
            };
            
            // Optional: Get Token from localStorage if it exists
            const token = localStorage.getItem('betabay_token');
            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            // Send JSON data to backend
            const response = await fetch(`${backendUrl}/api/test-posts`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jsonData)
            });
            
            if (!response.ok) {
                throw new Error(`Error creating app: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('App created successfully:', result);
            
            // Redirect to myapps page
            router.push('/myapps');
        } catch (error) {
            console.error('Failed to create app:', error);
            alert('Failed to create app. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
       router.push('/myapps'); // Redirect to the My Apps page
    };

    return (
        <div className="max-w-5xl mx-auto mb-10">
            <header className="my-10">
                <h1 className="text-4xl font-bold text-gray-800">
                    {isEditing ? 'Edit App' : 'Post a New App'}
                </h1>
                <p className="text-gray-500 mt-1">
                    {isEditing 
                        ? 'Update the details below to modify your app information.' 
                        : 'Fill in the details below to get your app ready for testing.'
                    }
                </p>
            </header>
            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 mb-6">Core Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <ImageUpload label="App Icon" id="icon" onChange={handleFileChange} previewUrl={previews.icon} />
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
                        <ImageUpload label="Cover Image" id="coverImage" onChange={handleFileChange} previewUrl={previews.coverImage} />
                        <ImageUpload label="Screenshots (Select multiple)" id="screenshots" onChange={handleFileChange} multiple />
                        {previews.screenshots.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                {previews.screenshots.map((src, i) => <img key={i} src={src} className="w-full h-auto object-cover rounded-md" alt={`Screenshot ${i + 1}`} />)}
                            </div>
                        )}
                        <FormField label="YouTube Link (Optional)" id="youtubeLink" placeholder="https://youtube.com/watch?v=..." value={data.youtubeLink} onChange={handleChange} />
                    </div>
                </div>

                <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 mb-6">Testing & Distribution</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="iOS Test Link (TestFlight)" id="iosLink" placeholder="https://testflight.apple.com/join/..." value={data.iosLink} onChange={handleChange} />
                        <FormField label="Android Test Link (Play Store)" id="androidLink" placeholder="https://play.google.com/apps/testing/..." value={data.androidLink} onChange={handleChange} />
                        <FormField label="Google Group Link (Optional)" id="googleGroupLink" placeholder="https://groups.google.com/g/..." value={data.googleGroupLink} onChange={handleChange} />
                        <div className="md:col-span-2">
                            <FormField label="Testing Instructions" id="testingInstruction" as="textarea" placeholder="e.g., 'Log in with user: test@test.com, pass: 1234. Then, navigate to the dashboard and try creating a new project.'" value={data.testingInstruction} onChange={handleChange} />
                        </div>
                        <FormField label="Price ($)" id="price" type="number" placeholder="0.00" value={data.price} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex justify-end items-center gap-4 pt-4">
                    <button type="button" onClick={handleCancel} className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition">
                        {isEditing ? 'Update App' : 'Post App'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewAppPage;
