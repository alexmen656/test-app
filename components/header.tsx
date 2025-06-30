'use client'

import Link from 'next/dist/client/link'
import React from 'react'
import Image from 'next/image'
import { MdNotificationsNone } from "react-icons/md"

const Header = () => {
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
      <Link href="/joined" className="px-4 py-2 hover:underline">
      My Apps
      </Link>
      <Link href="/joined" className="px-4 py-2 hover:underline">
      Joined Tests
      </Link>
      <div className="flex max-w-xl items-center space-x-4">
      <button className="relative">
        <MdNotificationsNone className="text-2xl" />
        <span className="absolute top-0 right-0 bg-red-400 text-black text-xs rounded-full px-1">
        3
        </span>
      </button>
      <Link href="/signin" className="px-4 py-2 hover:underline">
        Sign In
      </Link>
      </div>
    </div>
  )
}

export default Header