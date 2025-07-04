// src/components/ImageUpload.tsx
import React, { FC, ChangeEvent } from 'react';
import Image from 'next/image';

// --- Dependency Inlined to Fix Resolution Error ---
/**
 * A generic, reusable SVG icon component.
 */
const Icon: FC<{ path: string; className?: string }> = ({ path, className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

/**
 * A specific upload icon for the file input components.
 */
const UploadIcon: FC = () => <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" className="h-8 w-8 text-gray-400" />;
// --- End of Inlined Dependency ---


/**
 * Props for the ImageUpload component.
 */
interface ImageUploadProps {
    label: string;
    id: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    previewUrl?: string | null;
    multiple?: boolean;
}

/**
 * A reusable component for uploading and previewing images.
 */
const ImageUpload: FC<ImageUploadProps> = ({ label, id, onChange, previewUrl, multiple = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                {previewUrl ? (
                    <div className="mx-auto h-24 w-24 relative rounded-md overflow-hidden">
                        <Image 
                            src={previewUrl} 
                            alt="Preview" 
                            fill
                            className="object-cover" 
                        />
                    </div>
                    <Image src={previewUrl} alt="Preview" className="mx-auto object-cover rounded-md" width={96} height={96} />
                ) : (
                    <UploadIcon />
                )}
                <div className="flex text-sm text-gray-600">
                    <label htmlFor={id} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id={id} name={id} type="file" className="sr-only" onChange={onChange} multiple={multiple} accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
    </div>
);

export default ImageUpload;