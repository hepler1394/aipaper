#!/bin/bash

# Environment variables for the application
export NODE_ENV=production
export PORT=5000
export MONGO_URI=mongodb://localhost:27017/paper-grader
export JWT_SECRET=your-secret-key-change-in-production
export GEMINI_API_KEY=your-gemini-api-key

# Build frontend
echo "Building frontend..."
cd /home/ubuntu/paper-grader/frontend
npm run build

# Start backend server
echo "Starting backend server..."
cd /home/ubuntu/paper-grader/backend
node server.js
