# AI Paper Grader - README

## Overview

AI Paper Grader is a comprehensive web application that leverages artificial intelligence to help educators grade papers efficiently and consistently. The platform supports various file formats, including PDF, DOC, DOCX, TXT, and more, and offers different grading methods based on answer keys, custom criteria, or a hybrid approach.

## Key Features

- **AI-Powered Grading**: Utilizes Google's Gemini API for intelligent paper assessment
- **Multiple File Support**: Upload PDFs, Word documents, text files, and more
- **Batch Processing**: Upload ZIP archives for grading multiple papers at once (Pro plan)
- **Flexible Grading Methods**:
  - Grade by Answer Key: For objective assessments
  - Grade by Criteria: For essays and subjective assessments
  - Hybrid Approach: Combining both methods
- **Three-Panel Interface**: View grading criteria, document, and feedback simultaneously
- **Subscription Tiers**: Free, Starter, and Pro plans with different feature sets
- **User Authentication**: Secure account management with JWT
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React.js, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: Google Gemini API
- **Deployment**: Docker, Nginx

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [User Guide](docs/user-guide.md): Instructions for using the platform
- [Technical Documentation](docs/technical-docs.md): Architecture and implementation details
- [Installation Guide](docs/installation-guide.md): Setup and deployment instructions
- [API Documentation](docs/api-docs.md): API endpoints and usage

## Quick Start

### Using Docker

1. Clone the repository
2. Configure environment variables in `.env` files
3. Run `docker-compose up -d`
4. Access the application at http://localhost:3000

### Manual Installation

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Configure environment variables
5. Start the backend: `cd backend && node server.js`
6. Build and serve the frontend: `cd frontend && npm run build`

For detailed instructions, see the [Installation Guide](docs/installation-guide.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API for AI capabilities
- All open-source libraries and frameworks used in this project
