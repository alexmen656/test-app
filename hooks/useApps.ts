'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppCache } from '@/contexts/AppCacheContext';
import { getBackendUrl } from '@/lib/api';
import type { App } from '@/types';

interface UseAppsOptions {
  endpoint?: string;
  cacheKey: 'home' | 'myApps' | 'explore';
  requireAuth?: boolean;
  autoFetch?: boolean;
}

interface UseAppsReturn {
  apps: App[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasCache: boolean;
}

export function useApps({ 
  endpoint = '/api/test-posts', 
  cacheKey, 
  requireAuth = false,
  autoFetch = true 
}: UseAppsOptions): UseAppsReturn {
  const {
    homeApps,
    myApps,
    exploreApps,
    setHomeApps,
    setMyApps,
    setExploreApps,
    setHomeLoading,
    setMyAppsLoading,
    setExploreLoading,
    isCacheValid
  } = useAppCache();

  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);
  const lastFetchRef = useRef<string>('');

  // Get current cache data based on cacheKey
  const currentCache = cacheKey === 'home' ? homeApps : 
                      cacheKey === 'myApps' ? myApps : 
                      exploreApps;

  // Get setter functions based on cacheKey
  const setApps = cacheKey === 'home' ? setHomeApps :
                 cacheKey === 'myApps' ? setMyApps :
                 setExploreApps;

  const setLoading = cacheKey === 'home' ? setHomeLoading :
                    cacheKey === 'myApps' ? setMyAppsLoading :
                    setExploreLoading;

  const fetchApps = useCallback(async (silent: boolean = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      
      const backendUrl = getBackendUrl();
      const headers: HeadersInit = {};
      
      if (requireAuth) {
        const token = localStorage.getItem('betabay_token');
        if (!token) {
          throw new Error('Authentication required');
        }
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      console.log(`useApps (${cacheKey}): Fetching from ${endpoint}`);
      
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'GET',
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching apps: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`useApps (${cacheKey}): API response:`, data);
      
      let apps: App[] = [];
      
      if (Array.isArray(data)) {
        apps = data;
      } else if (data && typeof data === 'object') {
        const possibleArrays = Object.values(data).filter(value => Array.isArray(value));
        if (possibleArrays.length > 0) {
          apps = possibleArrays[0] as App[];
        } else if (data.id) {
          apps = [data as App];
        }
      }
      
      // Update cache with new data
      setApps(apps, false);
      setError(null);
      
      console.log(`useApps (${cacheKey}): Updated cache with ${apps.length} apps`);
      
    } catch (error) {
      console.error(`useApps (${cacheKey}): Failed to fetch apps:`, error);
      setError('Failed to load apps. Please try again.');
      setLoading(false);
    }
  }, [endpoint, requireAuth, cacheKey, setApps, setLoading, setError]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    const fetchKey = `${cacheKey}-${endpoint}`;
    
    if (!autoFetch || initializedRef.current || lastFetchRef.current === fetchKey) {
      return;
    }

    const hasValidCache = isCacheValid(currentCache);
    
    if (hasValidCache) {
      console.log(`useApps (${cacheKey}): Using valid cache, fetching in background`);
      setLoading(false);
      fetchApps(true); // Silent fetch
    } else {
      console.log(`useApps (${cacheKey}): No valid cache, fetching with loading state`);
      fetchApps(false);
    }
    
    initializedRef.current = true;
    lastFetchRef.current = fetchKey;
  }, [autoFetch, cacheKey, fetchApps, isCacheValid, currentCache, setLoading, endpoint]);

  return {
    apps: currentCache?.apps || [],
    loading: currentCache?.isLoading || false,
    error,
    refetch: () => fetchApps(false),
    hasCache: !!currentCache && currentCache.apps.length > 0
  };
}
