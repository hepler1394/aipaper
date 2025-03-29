# AI Paper Grader - API Documentation

## Overview

The AI Paper Grader API provides programmatic access to the paper grading functionality. This documentation covers all available endpoints, request formats, and response structures.

## Base URL

```
https://api.aipapergrader.com/api
```

For local development:
```
http://localhost:5000/api
```

## Authentication

Most API endpoints require authentication using JSON Web Tokens (JWT). Include the token in the request header:

```
Authorization: Bearer <your-jwt-token>
```

To obtain a token, use the login or register endpoints.

## API Endpoints

### Authentication

#### Register User

Creates a new user account.

```
POST /auth/register
Content-Type: application/json
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "plan": "free"
}
```

Response:
```json
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

Authenticates a user and returns a JWT token.

```
POST /auth/login
Content-Type: application/json
```

Request body:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:
```json
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

#### Get Current User

Returns information about the authenticated user.

```
GET /auth/me
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": {
      "plan": "free",
      "startDate": "2025-03-01T00:00:00.000Z",
      "endDate": "2025-04-01T00:00:00.000Z",
      "status": "active",
      "autoRenew": false
    },
    "usage": {
      "filesGradedCount": 10,
      "filesGradedThisMonth": 3
    }
  }
}
```

#### Update Subscription

Updates the user's subscription plan.

```
PUT /auth/subscription
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "plan": "starter"
}
```

Response:
```json
{
  "success": true,
  "message": "Subscription updated successfully",
  "token": "new-jwt-token",
  "subscription": {
    "plan": "starter",
    "startDate": "2025-03-29T19:30:00.000Z",
    "endDate": "2025-04-29T19:30:00.000Z",
    "status": "active",
    "autoRenew": true
  }
}
```

#### Update API Key

Updates the user's Gemini API key.

```
PUT /auth/api-key
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "geminiKey": "your-gemini-api-key"
}
```

Response:
```json
{
  "success": true,
  "message": "API key updated successfully"
}
```

#### Get Usage Statistics

Returns the user's usage statistics.

```
GET /auth/usage
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "success": true,
  "usage": {
    "plan": "free",
    "limit": 5,
    "used": 3,
    "remaining": 2,
    "canGradeMore": true,
    "canUseBatchGrading": false
  }
}
```

### File Upload

#### Upload Single File

Uploads a single file for grading.

```
POST /upload/file
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

Form data:
```
file: [File]
```

Response:
```json
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

#### Upload Multiple Files

Uploads multiple files for grading.

```
POST /upload/files
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

Form data:
```
files: [File1, File2, ...]
```

Response:
```json
{
  "success": true,
  "message": "Files uploaded successfully",
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

#### Upload and Extract ZIP

Uploads a ZIP file and extracts its contents for batch grading.

```
POST /upload/zip
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

Form data:
```
file: [ZIP File]
```

Response:
```json
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

#### Get File Content

Retrieves the content of a processed file.

```
GET /upload/content/:fileId
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "success": true,
  "content": "File content..."
}
```

#### Delete File

Deletes a file from the system.

```
DELETE /upload/:fileId
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

### Grading

#### Grade Document

Grades a single document using AI.

```
POST /grading/document
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "documentText": "Document content to grade...",
  "criteria": "Grading criteria...",
  "answerKeys": ["Answer key 1...", "Answer key 2..."],
  "apiKey": "optional-custom-api-key"
}
```

Response:
```json
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

#### Batch Grade Documents

Grades multiple documents in a batch (Pro plan only).

```
POST /grading/batch
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "documents": [
    {
      "id": "doc-id-1",
      "fileName": "essay1.pdf",
      "text": "Document 1 content..."
    },
    {
      "id": "doc-id-2",
      "fileName": "essay2.docx",
      "text": "Document 2 content..."
    }
  ],
  "criteria": "Grading criteria...",
  "answerKeys": ["Answer key 1...", "Answer key 2..."],
  "apiKey": "optional-custom-api-key"
}
```

Response:
```json
{
  "success": true,
  "message": "Documents batch graded successfully",
  "batchId": "batch-id",
  "results": [
    {
      "documentId": "doc-id-1",
      "fileName": "essay1.pdf",
      "grading": {
        "success": true,
        "result": {
          "grade": {
            "letter": "A-",
            "percentage": 92
          },
          "sections": [...],
          "feedback": {...},
          "summary": "..."
        }
      }
    },
    {
      "documentId": "doc-id-2",
      "fileName": "essay2.docx",
      "grading": {
        "success": true,
        "result": {
          "grade": {
            "letter": "B",
            "percentage": 85
          },
          "sections": [...],
          "feedback": {...},
          "summary": "..."
        }
      }
    }
  ]
}
```

#### Summarize Answer Key

Generates a summary of answer keys for grading.

```
POST /grading/summarize-key
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "answerKeyTexts": [
    "Answer key 1 content...",
    "Answer key 2 content..."
  ],
  "apiKey": "optional-custom-api-key"
}
```

Response:
```json
{
  "success": true,
  "message": "Answer key summarized successfully",
  "summaryId": "summary-id",
  "result": {
    "topics": ["Topic 1", "Topic 2"],
    "keyPoints": ["Point 1", "Point 2"],
    "evaluationCriteria": ["Criterion 1", "Criterion 2"],
    "summary": "Comprehensive summary of the answer key"
  }
}
```

#### Get Grading Result

Retrieves a previously generated grading result.

```
GET /grading/result/:gradingId
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "success": true,
  "result": {
    "grade": {
      "letter": "B+",
      "percentage": 87
    },
    "sections": [...],
    "feedback": {...},
    "summary": "..."
  }
}
```

### Subscription Plans

#### Get All Plans

Retrieves all available subscription plans.

```
GET /subscriptions
```

Response:
```json
{
  "success": true,
  "plans": [
    {
      "name": "free",
      "displayName": "Free",
      "price": 0,
      "description": "Basic grading for occasional use",
      "features": ["Up to 5 files per month", "Basic grading with answer key", ...],
      "limits": {
        "monthlyFiles": 5,
        "referenceFiles": 5,
        "batchProcessing": false,
        "customRubrics": false,
        "analytics": false,
        "bulkDownload": false
      }
    },
    {
      "name": "starter",
      "displayName": "Starter",
      "price": 9.99,
      "description": "Enhanced grading for regular users",
      "features": [...],
      "limits": {...}
    },
    {
      "name": "pro",
      "displayName": "Pro",
      "price": 29.99,
      "description": "Professional grading for educators",
      "features": [...],
      "limits": {...}
    }
  ]
}
```

#### Get Plan Details

Retrieves details for a specific subscription plan.

```
GET /subscriptions/:planName
```

Response:
```json
{
  "success": true,
  "plan": {
    "name": "starter",
    "displayName": "Starter",
    "price": 9.99,
    "description": "Enhanced grading for regular users",
    "features": ["Up to 50 files per month", "Advanced grading options", ...],
    "limits": {
      "monthlyFiles": 50,
      "referenceFiles": 20,
      "batchProcessing": false,
      "customRubrics": true,
      "analytics": true,
      "bulkDownload": false
    }
  }
}
```

#### Get Current Plan

Retrieves the current user's subscription plan.

```
GET /subscriptions/user/current
Authorization: Bearer <jwt-token>
```

Response:
```json
{
  "success": true,
  "subscription": {
    "plan": "free",
    "startDate": "2025-03-01T00:00:00.000Z",
    "endDate": "2025-04-01T00:00:00.000Z",
    "status": "active",
    "autoRenew": false,
    "planDetails": {
      "name": "free",
      "displayName": "Free",
      "price": 0,
      "description": "Basic grading for occasional use",
      "features": [...],
      "limits": {...}
    }
  }
}
```

#### Upgrade Plan

Upgrades the user's subscription plan.

```
POST /subscriptions/user/upgrade
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "planName": "starter"
}
```

Response:
```json
{
  "success": true,
  "message": "Plan upgraded successfully",
  "subscription": {
    "plan": "starter",
    "startDate": "2025-03-29T19:30:00.000Z",
    "endDate": "2025-04-29T19:30:00.000Z",
    "status": "active",
    "autoRenew": true
  }
}
```

#### Downgrade Plan

Downgrades the user's subscription plan.

```
POST /subscriptions/user/downgrade
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "planName": "free"
}
```

Response:
```json
{
  "success": true,
  "message": "Plan downgraded successfully",
  "subscription": {
    "plan": "free",
    "startDate": "2025-03-29T19:30:00.000Z",
    "endDate": "2025-04-29T19:30:00.000Z",
    "status": "active",
    "autoRenew": true
  }
}
```

## Error Responses

All API endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong",
  "error": "Detailed error information (optional)"
}
```

Common HTTP status codes:
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Rate Limiting

API requests are subject to rate limiting:
- Free plan: 60 requests per hour
- Starter plan: 300 requests per hour
- Pro plan: 1000 requests per hour

When rate limit is exceeded, the API returns:
```json
{
  "success": false,
  "message": "Rate limit exceeded. Please try again later."
}
```

## Webhooks

The API supports webhooks for asynchronous notifications about grading completion. To register a webhook:

```
POST /webhooks/register
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Request body:
```json
{
  "url": "https://your-server.com/webhook-endpoint",
  "events": ["grading.completed", "batch.completed"]
}
```

Response:
```json
{
  "success": true,
  "message": "Webhook registered successfully",
  "webhookId": "webhook-id"
}
```

When a grading operation completes, the system will send a POST request to your webhook URL with the grading results.
