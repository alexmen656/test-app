'use client';

import React from 'react'
import { initialNotifications } from '@/public/MockData'

interface NotificationDetailPageProps {
    params: Promise<{ id: string }>
}

const page = async ({ params }: NotificationDetailPageProps) => {
    const { id } = await Promise.resolve(params)
    const allNotifications = initialNotifications
    const notification = allNotifications.find(n => n.id === id)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Notification Detail</h1>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Title:</span>
                        <p className="text-lg">{notification?.title}</p>
                    </div>
                    
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Message:</span>
                        <p className="text-base">{notification?.message}</p>
                    </div>
                    
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Date:</span>
                        <p className="text-base">{notification?.timestamp}</p>
                    </div>
                    
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                            {notification?.read ? 'Read' : 'Unread'}
                        </span>
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => {
                            if (notification) {
                                notification.read = true;
                                // Update the notification status in the state or backend as needed
                                window.location.href = '/notification';
                            }
                        }}>
                            Mark as Read
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => {
                            if (notification) {
                                // Delete the notification
                                window.location.href = '/notification';
                            }
                        }}> 
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page