import React from 'react'
import Image from 'next/image'
import type { App } from '@/types'; // Import the App type

const AppCard: React.FC<{ app: App }> = ({ app }) => {
    // Kompatibilität mit der Backend-API
    const name = app.name || app.app_name || "Unnamed App";
    const coverImageUrl = app.coverImageUrl || app.cover_image_url || "/vercel.svg"; // Fallback-Bild
    const price = app.price || app.test_price || "Free";
    
    // Creator-Info aus verschiedenen möglichen Quellen
    const creatorName = app.creator?.name || app.user_info?.username || "Unknown Creator";
    
    return (
        <button onClick={() => window.location.href = `/detail/${app.id}`} className="w-full ">
            <div key={app.id} className="min-w-xl group cursor-pointer bg-white pb-9 pt-9 px-5 rounded-2xl">
                <div className="relative h-64 w-full bg-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={coverImageUrl}
                        alt={`Screenshot of ${name}`}
                        layout="fill"
                        objectFit="cover"
                        className=" transition-opacity duration-300 group-hover:opacity-90"
                    />
                </div>
                <div className="mt-3">
                    <p className="text-lg font-semibold">{name}</p>
                    <div className="flex justify-between text-gray-500">
                        <span>{creatorName}</span>
                        <span>{typeof price === 'number' ? `$${price}` : price}</span>
                    </div>
                </div>
            </div>
        </button>
     
    )
}

export default AppCard;
export type { App }; // Exporting both the component and the type