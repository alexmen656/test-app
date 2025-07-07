import React from 'react'
import Image from 'next/image'
import type { App } from '@/types'; // Import the App type

const AppCard: React.FC<{ app: App }> = ({ app }) => {

    // Kompatibilität mit der Backend-API
    const name = app.name || app.app_name || "Unnamed App";
    const coverImageUrl = app.coverImageUrl || app.cover_image_url || "/vercel.svg"; // Fallback-Bild

    // Creator-Info aus verschiedenen möglichen Quellen
    const creatorName = app.creator?.name || app.user_info?.username || "Unknown Creator";

    return (
        <button onClick={() => window.location.href = `/detail/${app.id}`} className="w-full ">
            <div key={app.id} className="min-w-2.5 md:min-w-xl group cursor-pointer bg-white pb-9 pt-5 px-4 rounded-2xl">
                <div className="relative h-44 sm:h-64 w-full bg-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={coverImageUrl}
                        alt={`Screenshot of ${name}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-opacity duration-300 group-hover:opacity-90"
                    />
                </div>
                <div className="mt-3">
                    <p className="text-lg font-semibold">{name}</p>
                    <div className="flex justify-between text-gray-500">
                        <span>{creatorName}</span>
                        <div className="flex items-center bg-white border-2 border-yellow-400 text-gray-800 px-4 py-2 rounded-full transition-shadow">
                            <span className="w-7 h-7 mr-2 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold text-lg">
                                h
                            </span>
                            <span className="font-bold text-lg text-gray-900">
                                {app.test_price ? app.test_price : 'Free'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </button>

    )
}

export default AppCard;
export type { App }; // Exporting both the component and the type