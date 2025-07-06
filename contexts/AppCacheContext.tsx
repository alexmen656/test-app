'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { App } from '@/types';

interface AppCacheData {
  apps: App[];
  timestamp: number;
  isLoading: boolean;
}

interface AppCacheContextType {
  homeApps: AppCacheData | null;
  myApps: AppCacheData | null;
  exploreApps: AppCacheData | null;
  
  setHomeApps: (apps: App[], isLoading?: boolean) => void;
  setMyApps: (apps: App[], isLoading?: boolean) => void;
  setExploreApps: (apps: App[], isLoading?: boolean) => void;
  
  setHomeLoading: (loading: boolean) => void;
  setMyAppsLoading: (loading: boolean) => void;
  setExploreLoading: (loading: boolean) => void;
  
  clearCache: () => void;
  isCacheValid: (cacheData: AppCacheData | null, maxAgeMs?: number) => boolean;
}

const AppCacheContext = createContext<AppCacheContextType | undefined>(undefined);

const CACHE_DURATION = 5 * 60 * 1000;

export function AppCacheProvider({ children }: { children: ReactNode }) {
  const [homeApps, setHomeAppsState] = useState<AppCacheData | null>(null);
  const [myApps, setMyAppsState] = useState<AppCacheData | null>(null);
  const [exploreApps, setExploreAppsState] = useState<AppCacheData | null>(null);

  const setHomeApps = useCallback((apps: App[], isLoading: boolean = false) => {
    setHomeAppsState({
      apps,
      timestamp: Date.now(),
      isLoading
    });
  }, []);

  const setMyApps = useCallback((apps: App[], isLoading: boolean = false) => {
    setMyAppsState({
      apps,
      timestamp: Date.now(),
      isLoading
    });
  }, []);

  const setExploreApps = useCallback((apps: App[], isLoading: boolean = false) => {
    setExploreAppsState({
      apps,
      timestamp: Date.now(),
      isLoading
    });
  }, []);

  const setHomeLoading = useCallback((loading: boolean) => {
    setHomeAppsState(prev => prev ? { ...prev, isLoading: loading } : null);
  }, []);

  const setMyAppsLoading = useCallback((loading: boolean) => {
    setMyAppsState(prev => prev ? { ...prev, isLoading: loading } : null);
  }, []);

  const setExploreLoading = useCallback((loading: boolean) => {
    setExploreAppsState(prev => prev ? { ...prev, isLoading: loading } : null);
  }, []);

  const clearCache = useCallback(() => {
    setHomeAppsState(null);
    setMyAppsState(null);
    setExploreAppsState(null);
  }, []);

  const isCacheValid = useCallback((cacheData: AppCacheData | null, maxAgeMs: number = CACHE_DURATION): boolean => {
    if (!cacheData) return false;
    
    const now = Date.now();
    const age = now - cacheData.timestamp;
    return age < maxAgeMs;
  }, []);

  const value: AppCacheContextType = {
    homeApps,
    myApps,
    exploreApps,
    setHomeApps,
    setMyApps,
    setExploreApps,
    setHomeLoading,
    setMyAppsLoading,
    setExploreLoading,
    clearCache,
    isCacheValid
  };

  return (
    <AppCacheContext.Provider value={value}>
      {children}
    </AppCacheContext.Provider>
  );
}

export function useAppCache() {
  const context = useContext(AppCacheContext);
  if (context === undefined) {
    throw new Error('useAppCache must be used within an AppCacheProvider');
  }
  return context;
}
