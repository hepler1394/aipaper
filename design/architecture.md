# AI Paper Grader - System Architecture

## Overview
The AI Paper Grader is a web application that allows educators to grade papers using AI technology. The system provides a user-friendly interface for uploading documents, setting grading criteria, and receiving AI-generated grades and feedback.

## System Components

### Frontend
- **Landing Page**: Introduction to the service, features, and subscription plans
- **Authentication**: User registration and login functionality
- **Dashboard**: Overview of user's graded and pending documents
- **Grading Interface**: Three-panel layout (criteria, document, summary)
- **Account Management**: Subscription management and API key settings

### Backend
- **User Service**: Handles authentication, authorization, and user management
- **Document Service**: Manages document uploads, storage, and retrieval
- **Grading Service**: Processes documents and generates grades using AI
- **Subscription Service**: Manages subscription tiers and feature access

### Database
- **Users Collection**: User profiles, authentication, and subscription information
- **Documents Collection**: Uploaded documents and their metadata
- **Grades Collection**: Grading results and feedback
- **Keys Collection**: API keys for AI services

## Subscription Tiers

### Free Plan
- Upload and grade up to 5 files per month
- Basic grading with answer key (up to 5 reference files)
- Manual grading of individual documents
- Download graded papers

### Starter Plan
- Upload and grade up to 50 files per month
- Advanced grading with expanded reference options
- Custom grading rubrics
- Basic analytics on grading results
- Download graded papers with annotations

### Pro Plan
- Unlimited file uploads and grading
- Batch grading functionality
- Advanced analytics and reporting
- Custom AI fine-tuning options
- Bulk download of graded papers
- Priority processing

## Technology Stack
- **Frontend**: React.js, Material UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Integration**: Google Gemini API (with option for user-provided keys)
- **File Processing**: Various libraries for handling PDFs, DOCs, Excel files
- **Authentication**: JWT-based authentication
- **Deployment**: Docker, Nginx

## Data Flow
1. User uploads documents (single files or zip archives)
2. System extracts and processes files
3. User configures grading criteria or selects answer key
4. AI engine grades documents based on criteria
5. Results are displayed in the three-panel interface
6. User can review, modify, and download graded papers

## Security Considerations
- Secure storage of user credentials and API keys
- Encryption of sensitive data
- Rate limiting to prevent abuse
- Secure file handling and validation
- GDPR compliance for user data
