'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MdNotificationsNone, MdMenu } from "react-icons/md"
import { useAuth } from '@/hooks/useAuth'
import { initialNotifications } from '@/public/MockData'
import Sidebar from './SideBar' // Import the SideBar component

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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
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

  const [width, setWidth] = useState(0);
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return (
    <div
      ref={headerRef}
      className='flex bg-white shadow-md items-center h-15 absolute w-full justify-between px-2'
    >
      <button className="space-x-2" onClick={() => window.location.href = '/'}>
        <Image
          src="/BetaBay-Landscape.jpg"
          alt="Logo"
          width={width < 1024 ? "60" : "120"}
          height={width < 1024 ? "30" : "60"} className="relative"
        />
      </button>
      <ul  className="hidden md:flex gap-x-">
      <Link href="/" className="px-4 py-2 hover:underline">
        Explore
      </Link>
      <Link href="/myapps" className="px-4 py-2 hover:underline">
        My Apps
      </Link>
      <Link href="/joined" className="px-4 py-2 hover:underline">
        Joined Tests
      </Link>
      </ul>

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
                    <>
                    {initialNotifications.slice(0, 3).map(notification => (
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
                    {initialNotifications.length > 2 && (
                      <button
                      className="w-full px-4 py-2 text-sm text-blue-600 hover:underline"
                      onClick={() => {
                        // Logic to load more notifications
                        window.location.href = '/notification';
                      }}
                      >
                      Load More
                      </button>
                    )}
                    </>
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
                width={30}
                height={30}
                className="rounded-full"
              />
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
            <Link href="/signin" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign In
            </Link>
        )
        }
        <button type="button" className="inline-flex items-center md:hidden"
          onClick={toggle}>
          <MdMenu className="text-2xl" />
        </button>
        {isOpen && (
          <Sidebar /* Pass any necessary props to SideBar component */ toggle={toggle} isOpen={isOpen} />
        )}
      </div>
    </div>
  );
};

export default Header;