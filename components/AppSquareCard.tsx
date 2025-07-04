import React from 'react'
import Image from 'next/image'
import type { App } from '@/types'; // Import the App type


const AppSquareCard = ({ app, route }: { app: App, route: string }) => {
  // Bestimme die URLs, verwende sowohl Frontend- als auch Backend-Feldnamen
  const coverImageUrl = app.coverImageUrl || app.cover_image_url;
  const iconUrl = app.iconUrl || app.icon_url;
  const appName = app.name || app.app_name;

  return (
    <div
        className="group relative aspect-square bg-gray-200 rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        onClick={() => window.location.href = route}
    >
        {/* Cover Image */}
        {coverImageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={coverImageUrl}
              alt={appName || 'App image'}
              fill
              className="object-cover"
            />
          </div>
        ) : iconUrl ? (
          // Verwende Icon URL als Fallback, wenn kein Cover Image vorhanden ist
          <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
            <div className="relative w-24 h-24">
              <Image
                src={iconUrl}
                alt={appName || 'App icon'}
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        ) : (
          // Fallback: Gradient nur wenn weder Cover Image noch Icon vorhanden sind
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
            <span className="text-white text-lg font-semibold">{appName}</span>
          </div>
        )}
        
        {/* Overlay with app info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-1">{appName}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{app.description}</p>
          </div>
        </div>
    </div>
  )
}

export default AppSquareCard