# MongoDB Migration for testPosts.js

This document outlines the changes made to `testPosts.js` to ensure proper integration with MongoDB for Vercel deployment.

## Key Changes

1. **Authentication Middleware**
   - Updated the `authenticateUser` middleware to use `db.findOne` for MongoDB when available
   - Maintained backward compatibility with SQLite using `db.get`

2. **Route Handlers**
   - Restored proper authentication on all endpoints:
     - `POST /api/test-posts` (create)
     - `PUT /api/test-posts/:id` (update)
     - `POST /api/test-posts/:id/join` (join as tester)
     - `GET /api/test-posts/user/mine` (get user's test posts)
   
   - All routes now use the authenticated user information properly:
     - Fixed hard-coded user IDs
     - Replaced default/mock values with actual user data

3. **MongoDB Methods**
   - Ensured consistent use of MongoDB methods:
     - `db.findOne` for finding a single document
     - `db.find` for finding multiple documents
     - `db.insert` for creating new documents
     - `db.update` for updating documents
     - `db.count` for counting documents

4. **Testing**
   - Created a test script at `test-mongo-testposts.js` to verify MongoDB integration

## How It Works

The `testPosts.js` file now uses a shared database instance (`db`) which is initialized in `server.js`. The database instance 
provides methods for both MongoDB and SQLite, and the file checks which methods are available before using them:

```javascript
// Example of MongoDB/SQLite compatibility
if (db.findOne) {
  // MongoDB approach
  user = await db.findOne('users', { id: userData.id });
} else {
  // SQLite approach
  user = await db.get('SELECT * FROM users WHERE id = ?', [userData.id]);
}
```

This approach ensures that the application works in both development (SQLite) and production (MongoDB) environments.

## MongoDB Adapter Implementation

The MongoDB adapter in `database/mongo-db.js` provides the following methods:

- `findOne(collection, query)`: Find a single document
- `find(collection, query, options)`: Find multiple documents with options (sort, limit, skip)
- `insert(collection, document)`: Insert a new document
- `update(collection, query, update)`: Update documents matching the query
- `delete(collection, query)`: Delete documents matching the query
- `count(collection, query)`: Count documents matching the query

It also provides compatibility methods to match the SQLite interface:

- `get(collection, query)`: Alias for findOne
- `all(collection, query)`: Alias for find
- `run(sql, params)`: No-op (compatibility only)

## Testing MongoDB Integration

To test the MongoDB integration, run:

```bash
node test-mongo-testposts.js
```

This script will:
1. Connect to MongoDB
2. Create test users and test posts
3. Exercise all endpoints in `testPosts.js`
4. Verify that the data is properly stored in MongoDB

## Production Deployment

For Vercel deployment, ensure that:

1. The `MONGODB_URI` environment variable is set
2. The application detects Vercel environment and uses MongoDB (handled in `database/index.js`)

This will ensure that the application uses MongoDB in production and SQLite in development, with the same codebase.
