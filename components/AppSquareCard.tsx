import React from 'react'
import type { App } from '@/types'; // Import the App type


const AppSquareCard = ({ app }: { app: App }) => {
  return (
    <div
        className="group relative aspect-square bg-gray-200 rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        onClick={() => window.location.href = `/myapps/detail/${app.id}`}
    >
        {/* Cover Image */}
        {app.coverImageUrl ? (
          <img
            src={app.coverImageUrl}
            alt={app.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
            <span className="text-white text-lg font-semibold">{app.name}</span>
          </div>
        )}
        
        {/* Overlay with app info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-1">{app.name}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{app.description}</p>
          </div>
        </div>
    </div>
  )
}

export default AppSquareCard