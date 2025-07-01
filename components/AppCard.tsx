import React from 'react'
import Image from 'next/image'
import type { App } from '@/app/explore/page'; // Import the App type

const AppCard: React.FC<{ app: App }> = ({ app }) => {
  return (
      <div key={app.id} className="w-full group cursor-pointer bg-gray-100 pb-9 pt-9 px-5 rounded-2xl">
          <div className="relative h-64 w-full bg-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                <Image
                    src={app.coverImageUrl}
                    alt={`Screenshot of ${app.name}`}
                    layout="fill"
                    objectFit="cover"
                    className=" transition-opacity duration-300 group-hover:opacity-90"
                />
            </div>
            <div className="mt-3">
                <p className="text-lg font-semibold">{app.name}</p>
                <div className="flex justify-between text-gray-500">
                    <span>{app.creator.name}</span>
                    <span>{app.price}</span>
                </div>
            </div>
        </div>
    )
}

export default AppCard;
export type { App }; // Exporting both the component and the type