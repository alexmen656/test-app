'use client';

// Configure the default backend URL for local development
const DEFAULT_BACKEND_URL = 'https://betbay-backend.vercel.app';

/**
 * Returns the configured backend URL from an environment variable or the default.
 * This function allows the backend URL to be easily configurable across the application.
 */
export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL2 || DEFAULT_BACKEND_URL;
}
