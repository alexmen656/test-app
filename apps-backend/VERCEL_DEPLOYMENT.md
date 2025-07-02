# Deploying to Vercel

This document provides instructions for deploying the BetaBay Apps Backend to Vercel.

## Prerequisites

1. Create a MongoDB Atlas account and set up a cluster
2. Get your MongoDB connection string
3. Create a Vercel account and install the Vercel CLI

## Setting Up Environment Variables

When deploying to Vercel, you need to set up the MongoDB connection string as an environment variable. You can do this through the Vercel dashboard or using the Vercel CLI.

### Using Vercel Dashboard

1. Go to your project settings in the Vercel dashboard
2. Go to the "Environment Variables" section
3. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `SESSION_SECRET`: A secure random string for session encryption
   - Other environment variables as needed (Slack credentials, etc.)

### Using Vercel CLI

```bash
# Set environment variables
vercel secrets add mongodb_uri "mongodb+srv://username:password@cluster.mongodb.net/betabay?retryWrites=true&w=majority"
vercel secrets add session_secret "your-secure-session-secret"

# Deploy the project
vercel
```

## Important Notes

### Read-Only Filesystem

Vercel has a read-only filesystem, which means SQLite will not work. The application is configured to automatically use MongoDB when deployed to Vercel.

### Serverless Functions

Vercel uses serverless functions, which means:

1. The database connection is established for each request
2. There is no persistent file storage between requests
3. Long-running operations should be avoided

## Checking Deployment

After deployment, you can check if the API is working by visiting:

```
https://your-vercel-app.vercel.app/api/health
```

If you see a message that the API is running, the deployment was successful.

## Troubleshooting

If you encounter issues with the deployment, check the following:

1. Ensure the MongoDB URI is correctly set in the environment variables
2. Check the Vercel deployment logs for any errors
3. Make sure your MongoDB Atlas cluster is accessible from Vercel's IP range (allow access from anywhere for simplicity)
