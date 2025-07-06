# Handling SQLITE_READONLY Error on Vercel

## Problem

When deploying the BetaBay Apps Backend to Vercel, you may encounter the following error:

```
❌ Error creating test post: Error: SQLITE_READONLY: attempt to write a readonly database
```

This error occurs because Vercel's serverless environment uses a read-only filesystem, which prevents SQLite from writing to the database file.

## Solution

The application has been updated to automatically use MongoDB when running on Vercel or any other serverless environment. Here's how it works:

1. The application detects if it's running on Vercel using environment variables and file path checks
2. If on Vercel, it enforces the use of MongoDB by checking for the MONGODB_URI environment variable
3. If the MONGODB_URI environment variable is not set, the application will throw an error

## Setting Up MongoDB for Vercel Deployment

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Set up a new cluster (the free tier is sufficient for testing)
3. Create a database user with read/write permissions
4. Add your IP address to the IP whitelist (or allow access from anywhere for testing)
5. Get your MongoDB connection string from the Atlas dashboard

## Configuring Vercel Environment Variables

1. In the Vercel dashboard, go to your project settings
2. Go to the "Environment Variables" section
3. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string (from MongoDB Atlas)
   - `VERCEL`: Set to "true" to help the application detect the Vercel environment

## Testing MongoDB Connection

To test if your MongoDB connection is working properly, run:

```bash
node test-mongo.js
```

This script will:
1. Connect to MongoDB using your connection string
2. Create a test document
3. Retrieve the document
4. Update the document
5. Delete the document

If all steps succeed, your MongoDB configuration is working correctly and should work on Vercel.

## Verifying on Vercel

After deploying to Vercel, you can verify that MongoDB is being used by:

1. Checking the Vercel deployment logs for messages indicating MongoDB is being used
2. Accessing the `/api/health` endpoint, which will show database type and connection status
3. Trying to create and retrieve test posts through the API

## Local Development

For local development, you can:

1. Use MongoDB by setting the MONGODB_URI in your .env file
2. Use SQLite by not setting the MONGODB_URI environment variable

The application will automatically choose the appropriate database adapter based on the environment.
