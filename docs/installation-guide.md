# AI Paper Grader - Installation Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Options](#installation-options)
3. [Docker Installation](#docker-installation)
4. [Manual Installation](#manual-installation)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the AI Paper Grader, ensure you have the following:

### For Docker Installation
- Docker Engine (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- At least 2GB of RAM available for containers
- At least 5GB of free disk space

### For Manual Installation
- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)
- MongoDB (version 5.0 or higher)
- Git

### For Both Methods
- Google Gemini API key (for AI grading functionality)
- Internet connection for API calls and dependency installation

## Installation Options

The AI Paper Grader can be installed using two methods:

1. **Docker Installation**: Recommended for production environments and easier setup
2. **Manual Installation**: Provides more control over individual components

## Docker Installation

Docker installation is the simplest method and ensures consistent environments.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/paper-grader.git
cd paper-grader
```

### Step 2: Configure Environment Variables

Create environment files for both backend and frontend:

```bash
cp backend/.env.example backend/.env
```

Edit the `backend/.env` file and set the following variables:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `GEMINI_API_KEY`: Your Google Gemini API key

### Step 3: Build and Start Containers

```bash
docker-compose up -d
```

This command will:
- Build the frontend and backend Docker images
- Start MongoDB, backend, and frontend containers
- Configure networking between containers

### Step 4: Verify Installation

The application should now be running at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

To check container status:
```bash
docker-compose ps
```

## Manual Installation

Manual installation gives you more control over each component.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/paper-grader.git
cd paper-grader
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Backend Environment

Create and edit the `.env` file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `GEMINI_API_KEY`: Your Google Gemini API key

### Step 4: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 5: Build Frontend

```bash
npm run build
```

### Step 6: Start MongoDB

Ensure MongoDB is running on your system:

```bash
# For Ubuntu/Debian
sudo systemctl start mongodb

# For macOS with Homebrew
brew services start mongodb-community
```

### Step 7: Start Backend Server

```bash
cd ../backend
node server.js
```

### Step 8: Serve Frontend (Development)

For development with hot reloading:

```bash
cd ../frontend
npm start
```

For production, you can use a web server like Nginx to serve the built frontend files.

## Configuration

### MongoDB Configuration

The application requires a MongoDB database. You can use:

1. **Local MongoDB**: Set `MONGO_URI=mongodb://localhost:27017/paper-grader`
2. **MongoDB Atlas**: Set `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/paper-grader`

### JWT Secret

The JWT secret is used for authentication. Set a strong, random string:

```
JWT_SECRET=your-secure-random-string
```

### Gemini API Key

To use the AI grading functionality, you need a Google Gemini API key:

1. Visit the [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Set `GEMINI_API_KEY=your-api-key` in the `.env` file

### Port Configuration

By default, the backend runs on port 5000 and the frontend on port 3000. To change these:

- Backend: Set `PORT=your-port` in the `.env` file
- Frontend (Docker): Update the port mapping in `docker-compose.yml`
- Frontend (Manual): Update the port in `frontend/package.json` for development

## Troubleshooting

### Docker Issues

**Containers not starting:**
```bash
docker-compose logs
```

**Port conflicts:**
Check if ports 3000 or 5000 are already in use:
```bash
lsof -i :3000
lsof -i :5000
```

Update the port mappings in `docker-compose.yml` if needed.

### MongoDB Connection Issues

**Connection refused:**
- Ensure MongoDB is running
- Check the MongoDB connection string
- Verify network connectivity to the MongoDB server

**Authentication failed:**
- Verify username and password in the connection string
- Check if the user has appropriate permissions

### API Key Issues

**Gemini API errors:**
- Verify the API key is correct
- Check if the API key has the necessary permissions
- Ensure you have sufficient quota for API calls

### Frontend Build Issues

**Build failures:**
```bash
cd frontend
npm run build
```

Check for any errors in the build process and resolve dependencies if needed.

### Backend Startup Issues

**Server won't start:**
```bash
cd backend
node server.js
```

Look for error messages in the console output and address any dependency or configuration issues.

For additional help, please refer to the technical documentation or contact support.
