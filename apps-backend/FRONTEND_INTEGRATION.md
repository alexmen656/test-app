# Frontend Integration Guide

This guide explains how to integrate your frontend application with the BetaBay Apps Backend.

## Authentication Flow

### 1. Slack OAuth Login

Direct users to the backend OAuth endpoint:

```javascript
// Redirect to Slack OAuth
function loginWithSlack() {
  const backendUrl = 'http://localhost:3002'; // or your production URL
  window.location.href = `${backendUrl}/api/auth/slack`;
}
```

### 2. Handle OAuth Callback

After successful OAuth, users are redirected back to your frontend with a token:

```javascript
// Check URL parameters for auth result
const urlParams = new URLSearchParams(window.location.search);
const authResult = urlParams.get('auth');
const token = urlParams.get('token');

if (authResult === 'success' && token) {
  // Store token for API calls
  localStorage.setItem('betabay_token', token);
  
  // Get user info
  fetchUserInfo();
} else if (authResult === 'error') {
  console.error('Authentication failed');
}
```

### 3. Making Authenticated API Calls

Include the token in API requests:

```javascript
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('betabay_token');
  const backendUrl = 'http://localhost:3002'; // or production URL
  
  const response = await fetch(`${backendUrl}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

// Example usage
async function fetchUserInfo() {
  try {
    const user = await apiCall('/auth/user');
    console.log('User:', user);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
}
```

## Core API Usage Examples

### Test Posts

```javascript
// Get all test posts
async function getTestPosts() {
  return await apiCall('/test-posts');
}

// Create a new test post
async function createTestPost(postData) {
  return await apiCall('/test-posts', {
    method: 'POST',
    body: JSON.stringify(postData)
  });
}

// Join a test post
async function joinTestPost(postId) {
  return await apiCall(`/test-posts/${postId}/join`, {
    method: 'POST'
  });
}
```

### User Management

```javascript
// Get user profile
async function getUserProfile() {
  return await apiCall('/users/profile');
}

// Get notifications
async function getNotifications() {
  return await apiCall('/users/notifications');
}

// Mark notification as read
async function markNotificationRead(notificationId) {
  return await apiCall(`/users/notifications/${notificationId}/read`, {
    method: 'POST'
  });
}
```

### Coin System

```javascript
// Get coin balance
async function getCoinBalance() {
  return await apiCall('/coins/balance');
}

// Get transaction history
async function getTransactions() {
  return await apiCall('/coins/transactions');
}

// Transfer coins
async function transferCoins(receiverId, amount, description) {
  return await apiCall('/coins/transfer', {
    method: 'POST',
    body: JSON.stringify({
      receiver_user_id: receiverId,
      amount: amount,
      description: description
    })
  });
}
```

### Reviews

```javascript
// Get reviews for a test post
async function getReviews(testPostId) {
  return await apiCall(`/reviews?test_post_id=${testPostId}`);
}

// Create a review
async function createReview(reviewData) {
  return await apiCall('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });
}

// Get featured reviews
async function getFeaturedReviews() {
  return await apiCall('/reviews/featured');
}
```

## File Upload

For uploading screenshots or app icons:

```javascript
async function uploadFile(file, testPostId) {
  const token = localStorage.getItem('betabay_token');
  const backendUrl = 'http://localhost:3002';
  
  const formData = new FormData();
  formData.append('screenshot', file);
  formData.append('test_post_id', testPostId);
  
  const response = await fetch(`${backendUrl}/api/test-posts/upload`, {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    },
    body: formData
  });
  
  return response.json();
}
```

## Environment Detection

Auto-detect backend URL for different environments:

```javascript
function getBackendUrl() {
  // Production
  if (window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('your-domain.com')) {
    return 'https://betabay-apps-backend.vercel.app';
  }
  
  // Development
  return 'http://localhost:3002';
}
```

## Error Handling

```javascript
async function apiCallWithErrorHandling(endpoint, options = {}) {
  try {
    return await apiCall(endpoint, options);
  } catch (error) {
    if (error.message.includes('401')) {
      // Token expired or invalid
      localStorage.removeItem('betabay_token');
      window.location.href = '/login';
    } else if (error.message.includes('403')) {
      // Forbidden
      alert('You do not have permission to perform this action');
    } else if (error.message.includes('500')) {
      // Server error
      alert('Server error. Please try again later.');
    } else {
      // Other errors
      console.error('API Error:', error);
      alert('An error occurred. Please try again.');
    }
    throw error;
  }
}
```

## React Integration Example

```jsx
import React, { useState, useEffect } from 'react';

const BetaBayApp = () => {
  const [user, setUser] = useState(null);
  const [testPosts, setTestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchTestPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const userInfo = await apiCall('/auth/user');
      setUser(userInfo);
    } catch (error) {
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const fetchTestPosts = async () => {
    try {
      const posts = await apiCall('/test-posts');
      setTestPosts(posts);
    } catch (error) {
      console.error('Failed to fetch test posts:', error);
    }
  };

  const handleLogin = () => {
    const backendUrl = getBackendUrl();
    window.location.href = `${backendUrl}/api/auth/slack`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.display_name}!</h1>
          <p>Coins: {user.owned_coins}</p>
          {/* Your app content */}
        </div>
      ) : (
        <button onClick={handleLogin}>
          Login with Slack
        </button>
      )}
    </div>
  );
};

export default BetaBayApp;
```

This integration guide provides everything needed to connect a frontend application to the BetaBay Apps Backend.
