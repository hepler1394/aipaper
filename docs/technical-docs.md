# AI Paper Grader - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Backend Components](#backend-components)
5. [Frontend Components](#frontend-components)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Authentication System](#authentication-system)
9. [AI Integration](#ai-integration)
10. [Deployment Guide](#deployment-guide)

## Architecture Overview

The AI Paper Grader is built using a modern web application architecture with a clear separation between frontend and backend components. The application follows a client-server model with RESTful API communication.

### High-Level Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │     │   Backend   │     │   MongoDB   │
│  React.js   │────▶│  Express.js │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Gemini AI  │
                    │     API     │
                    └─────────────┘
```

The system consists of four main components:
1. **Frontend**: React.js application providing the user interface
2. **Backend**: Express.js server handling business logic and API requests
3. **Database**: MongoDB storing user data, documents, and grading results
4. **AI Service**: Integration with Google's Gemini API for AI-powered grading

## Technology Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces
- **React Router**: For navigation and routing
- **Material UI**: Component library for consistent design
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Multer/Express-Fileupload**: For file upload handling
- **PDF-Parse/Mammoth/AdmZip**: For processing various file formats

### AI Integration
- **Google Gemini API**: For AI-powered document grading
- **Axios**: For making API requests to Gemini

### Deployment
- **Docker**: For containerization
- **Docker Compose**: For multi-container orchestration
- **Nginx**: Web server for serving frontend and routing API requests

## Project Structure

```
paper-grader/
├── frontend/                 # React frontend application
│   ├── public/               # Static files
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── styles/           # CSS styles
│   │   ├── App.js            # Main application component
│   │   └── index.js          # Entry point
│   ├── Dockerfile            # Frontend Docker configuration
│   └── nginx.conf            # Nginx configuration
│
├── backend/                  # Express backend application
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── uploads/              # File upload directory
│   ├── server.js             # Entry point
│   └── Dockerfile            # Backend Docker configuration
│
├── docs/                     # Documentation
│   ├── user-guide.md         # User documentation
│   └── technical-docs.md     # Technical documentation
│
├── design/                   # Design assets and wireframes
│
├── docker-compose.yml        # Docker Compose configuration
└── deploy.sh                 # Deployment script
```

## Backend Components

### Models

#### User Model
The User model defines the schema for user data, including authentication information, subscription details, and usage statistics.

Key features:
- Password hashing with bcrypt
- Subscription plan management
- Usage tracking and limits
- Methods for checking permissions based on subscription tier

#### Subscription Model
The Subscription model defines the available subscription plans and their features.

Key features:
- Three tiers: Free, Starter, and Pro
- Detailed feature lists for each plan
- Usage limits for different subscription tiers

### Controllers

#### Authentication Controller
Handles user registration, login, and account management.

Endpoints:
- `POST /api/auth/register`: Create a new user account
- `POST /api/auth/login`: Authenticate a user
- `GET /api/auth/me`: Get current user information
- `PUT /api/auth/subscription`: Update user subscription
- `PUT /api/auth/api-key`: Update API key
- `GET /api/auth/usage`: Get usage statistics

#### Upload Controller
Manages file uploads and processing.

Endpoints:
- `POST /api/upload/file`: Upload a single file
- `POST /api/upload/files`: Upload multiple files
- `POST /api/upload/zip`: Upload and extract a ZIP file
- `GET /api/upload/content/:fileId`: Get file content
- `DELETE /api/upload/:fileId`: Delete a file

#### Grading Controller
Handles AI-powered grading operations.

Endpoints:
- `POST /api/grading/document`: Grade a single document
- `POST /api/grading/batch`: Batch grade multiple documents
- `POST /api/grading/summarize-key`: Summarize answer key
- `GET /api/grading/result/:gradingId`: Get grading result

#### Subscription Controller
Manages subscription plans and upgrades.

Endpoints:
- `GET /api/subscriptions`: Get all subscription plans
- `GET /api/subscriptions/:planName`: Get plan details
- `GET /api/subscriptions/user/current`: Get current user's plan
- `POST /api/subscriptions/user/upgrade`: Upgrade plan
- `POST /api/subscriptions/user/downgrade`: Downgrade plan

### Middleware

#### Authentication Middleware
Verifies JWT tokens and adds user information to request objects.

### Utilities

#### AI Grading Utility
Integrates with the Gemini API for document grading.

Functions:
- `gradeDocument`: Grade a single document
- `batchGradeDocuments`: Grade multiple documents
- `summarizeAnswerKey`: Generate a summary of answer keys

## Frontend Components

### Pages

#### Landing Page
The main entry point showcasing features and subscription plans.

#### Authentication Pages
Login and registration forms for user authentication.

#### Dashboard
User dashboard showing recent activity and document management.

#### Grading Setup
Interface for configuring grading parameters, including:
- Grading method selection (answer key, criteria, hybrid)
- Answer key upload
- Criteria definition with templates

#### Grading Interface
Three-panel interface for grading documents:
- Left panel: Grading criteria and rubrics
- Middle panel: Document viewer
- Right panel: Grade summary and feedback

### Components

#### File Upload
Drag-and-drop file upload component supporting multiple file types.

#### Subscription Plans
Component displaying available subscription tiers and features.

#### Grading Results
Component for displaying grading results with detailed feedback.

## Database Schema

### Users Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  subscription: {
    plan: String (enum: ['free', 'starter', 'pro']),
    startDate: Date,
    endDate: Date,
    status: String (enum: ['active', 'expired', 'canceled']),
    autoRenew: Boolean
  },
  usage: {
    filesGradedCount: Number,
    filesGradedThisMonth: Number,
    lastGradedAt: Date
  },
  settings: {
    defaultGradingCriteria: ObjectId,
    notificationPreferences: Object,
    uiPreferences: Object
  },
  apiKeys: {
    gemini: String
  },
  createdAt: Date,
  lastLogin: Date
}
```

### Subscription Plans Collection
```
{
  _id: ObjectId,
  name: String (enum: ['free', 'starter', 'pro']),
  displayName: String,
  price: Number,
  description: String,
  features: [String],
  limits: {
    monthlyFiles: Number,
    referenceFiles: Number,
    batchProcessing: Boolean,
    customRubrics: Boolean,
    analytics: Boolean,
    bulkDownload: Boolean
  },
  active: Boolean
}
```

## API Documentation

### Authentication API

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "plan": "free"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free"
  }
}
```

### File Upload API

#### Upload Single File
```
POST /api/upload/file
Content-Type: multipart/form-data

file: [File]

Response:
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "id": "file-id",
    "originalName": "essay.pdf",
    "fileName": "unique-filename.pdf",
    "filePath": "/path/to/file",
    "fileType": "pdf",
    "fileSize": 1024,
    "uploadDate": "2025-03-29T19:30:00.000Z",
    "status": "processed",
    "extractedText": "File content..."
  }
}
```

#### Upload and Extract ZIP
```
POST /api/upload/zip
Content-Type: multipart/form-data

file: [ZIP File]

Response:
{
  "success": true,
  "message": "ZIP file extracted successfully",
  "batchId": "batch-id",
  "files": [
    {
      "id": "file-id-1",
      "originalName": "essay1.pdf",
      "fileName": "unique-filename-1.pdf",
      "fileType": "pdf",
      "status": "processed"
    },
    {
      "id": "file-id-2",
      "originalName": "essay2.docx",
      "fileName": "unique-filename-2.docx",
      "fileType": "docx",
      "status": "processed"
    }
  ]
}
```

### Grading API

#### Grade Document
```
POST /api/grading/document
Content-Type: application/json

{
  "documentText": "Document content to grade...",
  "criteria": "Grading criteria...",
  "answerKeys": ["Answer key 1...", "Answer key 2..."],
  "apiKey": "optional-custom-api-key"
}

Response:
{
  "success": true,
  "message": "Document graded successfully",
  "gradingId": "grading-id",
  "result": {
    "grade": {
      "letter": "B+",
      "percentage": 87
    },
    "sections": [
      {
        "name": "Content",
        "score": 35,
        "maxScore": 40,
        "comments": "Well-developed arguments with good evidence."
      },
      {
        "name": "Organization",
        "score": 27,
        "maxScore": 30,
        "comments": "Clear structure with effective transitions."
      }
    ],
    "feedback": {
      "strengths": ["Strong thesis", "Good evidence"],
      "areasForImprovement": ["More analysis needed"],
      "suggestions": ["Expand on the third point"]
    },
    "summary": "Overall good work with clear arguments."
  }
}
```

## Authentication System

The application uses JSON Web Tokens (JWT) for authentication. When a user registers or logs in, the server generates a JWT containing the user's ID, email, and subscription plan. This token is sent to the client and must be included in the Authorization header for all protected API requests.

### Token Generation
```javascript
const token = jwt.sign(
  { id: user._id, email: user.email, plan: user.subscription.plan },
  JWT_SECRET,
  { expiresIn: '7d' }
);
```

### Token Verification
The authentication middleware verifies the token and adds the user information to the request object:

```javascript
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
```

## AI Integration

The application integrates with Google's Gemini API for AI-powered document grading. The integration is implemented in the `ai-grading.js` utility file.

### Grading Process
1. The system constructs a prompt containing:
   - The document text to be graded
   - Grading criteria or rubric
   - Answer key content (if provided)
   - Instructions for generating structured feedback

2. The prompt is sent to the Gemini API with appropriate parameters:
   ```javascript
   const response = await axios.post(
     `${GEMINI_API_ENDPOINT}?key=${key}`,
     {
       contents: [
         {
           parts: [
             {
               text: prompt
             }
           ]
         }
       ],
       generationConfig: {
         temperature: 0.2,
         topK: 40,
         topP: 0.95,
         maxOutputTokens: 8192,
       }
     }
   );
   ```

3. The API response is parsed to extract the grading result in JSON format.

4. The result is returned to the client with detailed feedback.

### API Key Management
Users can provide their own Gemini API key or use the system's default key. The API key is stored securely in the user's profile and used for all grading operations.

## Deployment Guide

### Prerequisites
- Docker and Docker Compose installed
- Node.js and npm for development
- MongoDB instance (local or cloud)

### Environment Setup
1. Copy the `.env.example` file to `.env` and fill in your values:
   ```
   cp backend/.env.example backend/.env
   ```

2. Update the environment variables:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT generation
   - `GEMINI_API_KEY`: Google Gemini API key

### Docker Deployment
1. Build and start the containers:
   ```
   docker-compose up -d
   ```

2. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Manual Deployment
1. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Build the frontend:
   ```
   cd frontend
   npm run build
   ```

4. Start the backend server:
   ```
   cd backend
   node server.js
   ```

5. For production deployment, use the provided `deploy.sh` script:
   ```
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Scaling Considerations
- The application can be scaled horizontally by adding more backend instances
- Use a load balancer for distributing traffic
- Consider using a managed MongoDB service for database scaling
- Implement caching for frequently accessed data
- Use a CDN for static assets
