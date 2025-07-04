'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MdNotificationsNone } from "react-icons/md"
import { useAuth } from '@/hooks/useAuth'
import { initialNotifications } from '@/public/MockData' 

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className='flex bg-white shadow-md items-center h-15 absolute w-full top-0 left-0 pl-2 pr-12 justify-between'
    >
      <button className="flex items-center space-x-2" onClick={() => window.location.href = '/'}>
        <Image
          src="/BetaBay-Landscape.jpg"
          alt="Logo"
          width={60}
          height={30}
          className="relative"
        />
      </button>
      <Link href="/explore" className="px-4 py-2 hover:underline">
        Explore
      </Link>
      <Link href="/myapps" className="px-4 py-2 hover:underline">
        My Apps
      </Link>
      <Link href="/joined" className="px-4 py-2 hover:underline">
        Joined Tests
      </Link>
      <div className="flex max-w-xl items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <MdNotificationsNone className="text-2xl" />
            {initialNotifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-0 right-0 bg-red-400 text-black text-xs rounded-full px-1">
                {initialNotifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b flex justify-between items-center">
                <div className="font-medium">Notifications</div>
                <button
                  onClick={() => {
                    initialNotifications.forEach(n => (n.read = true));
                    setShowNotifications(false);
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-48 overflow-y-auto">
                {initialNotifications.map(notification => (
                  <li
                    key={notification.id}
                    className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`}
                    onClick={() => {
                      notification.read = true;
                      setShowNotifications(false);
                    }}
                  >
                    {notification.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{user.name}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-500">{user.email}</div>
                  <div className="text-xs text-gray-400">{user.team}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/signin" className="px-4 py-2 hover:underline">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;