# MongoDB Integration for BetaBay Apps

This document explains how to set up and use MongoDB with the BetaBay Apps platform, especially for Vercel deployment.

## Why MongoDB for Vercel?

Vercel serverless functions run in an environment with filesystem limitations:

1. **Read-only Filesystem**: Most of the filesystem is read-only, except for `/tmp` which is ephemeral
2. **Cold Starts**: Each function invocation can start with a fresh environment
3. **Connection Limits**: There are limitations on how many concurrent connections can be maintained

MongoDB is a perfect fit for Vercel because:

1. **Cloud-hosted**: No need to write to the local filesystem
2. **Connection Pooling**: Efficiently manages database connections
3. **Scalability**: Automatically scales with your application
4. **Data Persistence**: Data is safely stored in the cloud

## Setting Up MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient for getting started)
3. Set up a database user with read/write permissions
4. Whitelist IP addresses (use `0.0.0.0/0` for development, but restrict this for production)
5. Get your connection string, which will look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/betabay?retryWrites=true&w=majority
   ```

## Configuring Your Application

1. Set the connection string in your `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/betabay?retryWrites=true&w=majority
   ```

2. For Vercel deployment, add the environment variable in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" section
   - Add `MONGODB_URI` with your connection string

## Data Structure in MongoDB

The application uses Mongoose schemas to define the data structure:

1. **Users**: Store user profiles, login info, and coin balances
2. **Test Posts**: App testing requests created by developers
3. **Screenshots**: Images associated with test posts
4. **Test Participants**: Relationship between testers and test posts
5. **Reviews**: Feedback from testers
6. **Coin Transactions**: Record of coin transfers between users
7. **Notifications**: System messages for users

## Migrations

When moving from SQLite to MongoDB, the `migrate-to-mongodb.js` script helps transfer your data:

```bash
npm run migrate-to-mongodb
```

## Performance Considerations

1. **Indexes**: The MongoDB schemas include indexes for frequently queried fields
2. **Connection Pooling**: The database connection is reused when possible
3. **Serverless Optimization**: The code is designed to work well with serverless environments

## Troubleshooting

If you encounter connection issues:

1. **Check Network Access**: Ensure your IP is whitelisted in MongoDB Atlas
2. **Connection String**: Verify the connection string format and credentials
3. **Environment Variables**: Confirm the `MONGODB_URI` is set correctly
4. **Logs**: Check server logs for specific error messages

For Vercel-specific issues:

1. **Cold Starts**: The first request after deployment may be slow as the connection is established
2. **Deployment Logs**: Check Vercel logs for connection errors
3. **Function Size**: Be mindful of the function size limits on Vercel
