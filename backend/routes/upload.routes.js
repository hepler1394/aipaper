const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// Upload a single file
router.post('/file', uploadController.uploadFile);

// Upload multiple files
router.post('/files', uploadController.uploadMultipleFiles);

// Upload and extract zip file
router.post('/zip', uploadController.uploadAndExtractZip);

// Get file content
router.get('/content/:fileId', uploadController.getFileContent);

// Delete file
router.delete('/:fileId', uploadController.deleteFile);

module.exports = router;
