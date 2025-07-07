"use client";
import React, { FC, useState } from 'react';
import { initialNotifications } from '@/public/MockData';
import { Notification } from '@/types';

// --- NOTIFICATION ITEM COMPONENT ---
interface NotificationItemProps {
    notification: Notification;
    onClick?: (id: string) => void;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification, onClick }) => (
    <div
        className={`relative flex items-start p-4 sm:p-6 border-b border-gray-100 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${notification.read ? 'opacity-60' : ''
            }`}
        onClick={onClick ? () => onClick(notification.id) : undefined}
    >
        {/* Unread indicator */}
        {!notification.read && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
        )}

        {/* Icon */}
        <div className="flex-shrink-0 mr-3 sm:mr-4 ml-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="sm:w-5 sm:h-5">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
            </div>
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between">
                <div className="flex-grow pr-2">
                    <h3 className={`text-base sm:text-lg font-semibold text-gray-900 mb-1 ${notification.read ? 'font-medium' : 'font-bold'
                        }`}>
                        {notification.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                        {notification.message}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                        {notification.timestamp}
                    </p>
                </div>

                {/* Chevron */}
                <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 sm:w-5 sm:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
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

    const handleNotificationClick = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-900 mb-3 sm:mb-4 tracking-tight">
                        Notifications
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 px-4">
                        {unreadCount > 0
                            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                            : 'You\'re all caught up'
                        }
                    </p>
                </div>

                {/* Mark All Read Button */}
                {unreadCount > 0 && (
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <button
                            onClick={handleMarkAllRead}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                            Mark All as Read
                        </button>
                    </div>
                )}

                {/* Notifications */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onClick={handleNotificationClick}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 sm:py-20 px-4 sm:px-8">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 sm:w-8 sm:h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                                No notifications yet
                            </h3>
                            <p className="text-gray-600 text-base sm:text-lg">
                                When you have new notifications, they&apos;ll appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;
