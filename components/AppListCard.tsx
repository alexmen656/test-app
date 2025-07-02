import React from 'react'
import Image from 'next/image'
import type { App } from '@/types'; // Import the App type

const AppListCard = ({ app }: { app: App }) => {
  // Kompatibilität mit der Backend-API
  const name = app.name || app.app_name || "Unnamed App";
  const iconUrl = app.iconUrl || app.icon_url || "/vercel.svg"; // Fallback-Bild
  const price = app.price || app.test_price || "Free";
  
  // Creator-Info aus verschiedenen möglichen Quellen
  const creatorName = app.creator?.name || app.user_info?.username || "Unknown Creator";
  
  return (
      <div key={app.id} onClick={() => window.location.href = `/explore/detail/${app.id}`} className="flex items-center justify-between rounded-md border border-gray-200 p-4 hover:bg-gray-50 bg-white transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden">
                    <Image src={iconUrl} alt={`Icon for ${name}`} layout="fill" objectFit="cover" />
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500">{creatorName}</p>
                </div>
            </div>
            <p className="font-medium text-gray-700">{typeof price === 'number' ? `$${price}` : price}</p>
        </div>
    )
}

export default AppListCard