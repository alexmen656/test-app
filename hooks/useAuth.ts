'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  team: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false); // Prevent multiple parallel checks

  useEffect(() => {
    // Add a small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      console.log('useAuth: Initial check - localStorage available =', typeof(Storage) !== "undefined");
      console.log('useAuth: Current tokens in storage =', {
        authToken: localStorage.getItem('authToken') ? 'present' : 'missing',
        authTokenTime: localStorage.getItem('authTokenTime')
      });
      checkAuthStatus();
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Remove storage event listener as it causes race conditions
  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === 'authToken') {
  //       console.log('useAuth: Token changed in storage, rechecking auth...');
  //       checkAuthStatus();
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);
  //   return () => window.removeEventListener('storage', handleStorageChange);
  // }, []);

  const checkAuthStatus = async () => {
    // Prevent multiple parallel auth checks
    if (isCheckingAuth) {
      console.log('useAuth: Auth check already in progress, skipping...');
      return;
    }

    setIsCheckingAuth(true);
    
    try {
      const token = localStorage.getItem('authToken');
      
      console.log('useAuth: Checking auth status, token =', token ? 'present' : 'missing');
      console.log('useAuth: Token value =', token ? token.substring(0, 20) + '...' : 'null');
      
      if (!token) {
        console.log('useAuth: No token found');
        setUser(null);
        setError(null);
        setIsLoading(false);
        return;
      }

      const backendUrl = 'https://betbay-backend.vercel.app';//'https://betabay.vercel.app';
      
      console.log('useAuth: Making request to backend...');
      const response = await fetch(`${backendUrl}/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('useAuth: Response status =', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('useAuth: User data received =', userData);
        setUser(userData);
        
        // Speichere Slack-Profildaten im localStorage
        if (userData.name) {
          localStorage.setItem('betabay_username', userData.name);
        }
        
        if (userData.image) {
          localStorage.setItem('betabay_profile_image', userData.image);
        }
        
        if (userData.id) {
          localStorage.setItem('betabay_user_id', userData.id);
        }
        
        setError(null);
      } else {
        console.log('useAuth: Auth request failed, status =', response.status);
        if (response.status === 401) {
          console.log('useAuth: Token invalid (401), clearing user but keeping token for debugging');
          setUser(null);
          setError('Session expired');
        } else {
          console.log('useAuth: Network error, keeping token and user state');
          setError('Network error');
        }
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Authentication error');
      // Don't modify user state on network errors
    } finally {
      setIsLoading(false);
      setIsCheckingAuth(false);
    }
  };

  const logout = async () => {
    console.log('useAuth: Logging out...');
    try {
      const token = localStorage.getItem('authToken');
      const backendUrl = 'https://betbay-backend.vercel.app';//https://betabay.vercel.app';
      
      if (token) {
        await fetch(`${backendUrl}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenTime');
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  };

  const refreshAuth = () => {
    console.log('useAuth: Manual refresh requested');
    checkAuthStatus();
  };

  const setAuthToken = (token: string) => {
    console.log('useAuth: Setting new auth token, length =', token.length);
    
    // Prevent race conditions during token setting
    if (isCheckingAuth) {
      console.log('useAuth: Auth check in progress, waiting...');
      setTimeout(() => setAuthToken(token), 100);
      return;
    }
    
    try {
      // Store token with additional verification
      localStorage.setItem('authToken', token);
      
      // Verify it was stored
      const storedToken = localStorage.getItem('authToken');
      console.log('useAuth: Token stored successfully =', storedToken === token);
      
      // Also store a timestamp
      localStorage.setItem('authTokenTime', Date.now().toString());
      
      // Update state immediately
      setError(null);
      setIsLoading(true);
      
      // Check auth status after a small delay
      setTimeout(() => {
        checkAuthStatus();
      }, 200);
      
    } catch (err) {
      console.error('Failed to store token:', err);
      setError('Failed to store authentication');
    }
  };

  const debugStorage = () => {
    console.log('=== localStorage Debug ===');
    console.log('localStorage available:', typeof(Storage) !== "undefined");
    console.log('authToken:', localStorage.getItem('authToken'));
    console.log('authTokenTime:', localStorage.getItem('authTokenTime'));
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('========================');
  };

  return {
    user,
    isLoading,
    error,
    logout,
    refreshAuth,
    setAuthToken,
    debugStorage,
    isAuthenticated: !!user,
  };
}
