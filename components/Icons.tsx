// src/components/Icon.tsx
import React, { FC } from 'react';

/**
 * A generic, reusable SVG icon component.
 */
export const Icon: FC<{ path: string; className?: string }> = ({ path, className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

/**
 * A specific plus icon for the "Add New" card.
 */
export const PlusIcon: FC = () => <Icon path="M12 4v16m8-8H4" className="h-8 w-8 text-gray-400" />;

/**
 * A specific upload icon for the file input components.
 */
export const UploadIcon: FC = () => <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" className="h-8 w-8 text-gray-400" />;
