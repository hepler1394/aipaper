const express = require('express');
const router = express.Router();
const gradingController = require('../controllers/grading.controller');

// Grade a single document
router.post('/document', gradingController.gradeDocument);

// Batch grade multiple documents
router.post('/batch', gradingController.batchGradeDocuments);

// Summarize answer key
router.post('/summarize-key', gradingController.summarizeAnswerKey);

// Get grading result
router.get('/result/:gradingId', gradingController.getGradingResult);

module.exports = router;
