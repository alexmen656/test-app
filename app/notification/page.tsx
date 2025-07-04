"use client";
import React, { FC, useState } from 'react';

// --- TYPE DEFINITIONS (for self-containment) ---
export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

// --- HELPER COMPONENTS (for self-containment) ---
const Icon: FC<{ path: string; className?: string }> = ({ path, className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "New message from John",
        message: "Hey, are you available for a call?",
        timestamp: "2023-10-01T12:00:00Z",
        read: false
    },
    {
        id: "2",
        title: "Your app has been approved",
        message: "Congratulations! Your app is now live.",
        timestamp: "2023-10-02T08:30:00Z",
        read: true
    },
    {
        id: "3",
        title: "Reminder: Meeting at 3 PM",
        message: "Don&apos;t forget about the meeting later today.",
        timestamp: "2023-10-02T10:00:00Z",
        read: false
    }
];

// --- NOTIFICATION ITEM COMPONENT ---
interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => (
    <div
        className={`flex items-start p-4 border-b border-gray-200 cursor-pointer transition-colors duration-200 ${notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
    >
        {/* Status Dot */}
        {!notification.read && (
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1.5 mr-4 flex-shrink-0"></div>
        )}
        {/* Icon */}
        <div className={`mr-4 flex-shrink-0 ${notification.read ? 'ml-[26px]' : ''}`}>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="h-5 w-5 text-gray-500" />
            </div>
        </div>
        {/* Content */}
        <div className="flex-grow">
            <h4 className="font-semibold text-gray-800">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
        </div>
    </div>
);

// --- NOTIFICATION PAGE COMPONENT ---
const NotificationPage: FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(prev =>
            prev.map(n => n.read ? n : { ...n, read: true })
        );
    };

    // onBack is not used in this example, but you can add it if needed

    return (
        <div className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Notifications</h1>
                    <p className="text-gray-500 mt-1">You have {unreadCount} unread messages.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleMarkAllRead}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={unreadCount === 0}
                    >
                        Mark all as read
                    </button>
                </div>
            </header>
            <main className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <div className="text-center p-12 text-gray-500">
                        <Icon path="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium">No notifications yet</h3>
                        <p className="mt-1 text-sm">We&apos;ll let you know when something new comes up.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NotificationPage;
