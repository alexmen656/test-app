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

/**
 * Apple icon for iOS/macOS platforms
 */
export const AppleIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
);

/**
 * Android icon for Android platforms
 */
export const AndroidIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.523 15.3414c-.5665 0-1.0263-.4598-1.0263-1.0263s.4598-1.0263 1.0263-1.0263c.5665 0 1.0263.4598 1.0263 1.0263s-.4598 1.0263-1.0263 1.0263zm-11.046 0c-.5665 0-1.0263-.4598-1.0263-1.0263s.4598-1.0263 1.0263-1.0263c.5665 0 1.0263.4598 1.0263 1.0263s-.4598 1.0263-1.0263 1.0263zm11.405-6.02l1.14-2.02c.064-.115.026-.26-.09-.327-.115-.064-.26-.026-.327.09l-1.15 2.04c-.979-.461-2.06-.719-3.18-.719-1.11 0-2.175.243-3.18.719l-1.15-2.04c-.064-.115-.21-.154-.327-.09-.115.064-.154.21-.09.327l1.14 2.02C9.25 9.806 8.476 11.02 8.476 12.38v.956h7.048v-.956c0-1.36-.774-2.574-2.382-3.066z"/>
    </svg>
);

/**
 * GitHub icon for GitHub platforms
 */
export const GitHubIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

/**
 * Star icon for ratings and highlights
 */
export const StarIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

/**
 * Checkmark icon for completed tasks
 */
export const CheckIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
);

/**
 * Download icon for download actions
 */
export const DownloadIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
);

/**
 * Arrow left icon for navigation
 */
export const ArrowLeftIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
);

/**
 * Arrow right icon for navigation
 */
export const ArrowRightIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
);

/**
 * Chat icon for communication
 */
export const ChatIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>
);

/**
 * Dollar icon for rewards/payments
 */
export const DollarIcon: FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
    </svg>
);
