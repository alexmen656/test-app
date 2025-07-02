'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { MdNotificationsNone } from "react-icons/md"
import { useAuth } from '@/hooks/useAuth'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    window.location.href = '/';
  };

  return (
    <div className='flex bg-white shadow-md items-center h-15 absolute w-full top-0 left-0 pl-2 pr-12 justify-between'>
      <button className="flex items-center space-x-2" onClick={() => window.location.href = '/'}>
        <Image
        src="https://placehold.co/200x50"
        alt="Logo"
        width={200}
        height={50}
      /></button>
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
      <Link href="/notification" className="relative">
        <MdNotificationsNone className="text-2xl" />
        <span className="absolute top-0 right-0 bg-red-400 text-black text-xs rounded-full px-1">
          3
        </span>
      </Link>
      
      {isAuthenticated && user ? (
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src={user.image} 
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
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
  )
}

export default Header