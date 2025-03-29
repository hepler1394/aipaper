const aiGrading = require('../utils/ai-grading');
const path = require('path');
const fs = require('fs');

// Upload directory for storing grading results
const RESULTS_DIR = path.join(__dirname, '..', 'uploads', 'results');

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// Grade a single document
exports.gradeDocument = async (req, res) => {
  try {
    const { documentText, criteria, answerKeys, apiKey } = req.body;

    if (!documentText) {
      return res.status(400).json({
        success: false,
        message: 'Document text is required'
      });
    }

    if (!criteria) {
      return res.status(400).json({
        success: false,
        message: 'Grading criteria is required'
      });
    }

    // Call AI grading utility
    const gradingResult = await aiGrading.gradeDocument(
      documentText,
      criteria,
      answerKeys || [],
      apiKey
    );

    if (!gradingResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to grade document',
        error: gradingResult.error
      });
    }

    // Generate unique ID for the grading result
    const gradingId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Save grading result to file
    const resultPath = path.join(RESULTS_DIR, `${gradingId}.json`);
    fs.writeFileSync(resultPath, JSON.stringify(gradingResult.result, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Document graded successfully',
      gradingId: gradingId,
      result: gradingResult.result
    });
  } catch (error) {
    console.error('Error grading document:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to grade document',
      error: error.message
    });
  }
};

// Batch grade multiple documents
exports.batchGradeDocuments = async (req, res) => {
  try {
    const { documents, criteria, answerKeys, apiKey } = req.body;

    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Documents array is required and must not be empty'
      });
    }

    if (!criteria) {
      return res.status(400).json({
        success: false,
        message: 'Grading criteria is required'
      });
    }

    // Call AI grading utility for batch processing
    const batchResult = await aiGrading.batchGradeDocuments(
      documents,
      criteria,
      answerKeys || [],
      apiKey
    );

    if (!batchResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to batch grade documents',
        error: batchResult.error
      });
    }

    // Generate unique batch ID
    const batchId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Save batch results to file
    const resultPath = path.join(RESULTS_DIR, `batch_${batchId}.json`);
    fs.writeFileSync(resultPath, JSON.stringify(batchResult.results, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Documents batch graded successfully',
      batchId: batchId,
      results: batchResult.results
    });
  } catch (error) {
    console.error('Error batch grading documents:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to batch grade documents',
      error: error.message
    });
  }
};

// Summarize answer key
exports.summarizeAnswerKey = async (req, res) => {
  try {
    const { answerKeyTexts, apiKey } = req.body;

    if (!answerKeyTexts || !Array.isArray(answerKeyTexts) || answerKeyTexts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Answer key texts array is required and must not be empty'
      });
    }

    // Call AI grading utility to summarize answer key
    const summaryResult = await aiGrading.summarizeAnswerKey(
      answerKeyTexts,
      apiKey
    );

    if (!summaryResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to summarize answer key',
        error: summaryResult.error
      });
    }

    // Generate unique ID for the summary
    const summaryId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Save summary to file
    const resultPath = path.join(RESULTS_DIR, `summary_${summaryId}.json`);
    fs.writeFileSync(resultPath, JSON.stringify(summaryResult.result, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Answer key summarized successfully',
      summaryId: summaryId,
      result: summaryResult.result
    });
  } catch (error) {
    console.error('Error summarizing answer key:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to summarize answer key',
      error: error.message
    });
  }
};

// Get grading result
exports.getGradingResult = (req, res) => {
  try {
    const { gradingId } = req.params;
    
    // Check if it's a batch result
    let resultPath = path.join(RESULTS_DIR, `${gradingId}.json`);
    
    if (!fs.existsSync(resultPath)) {
      // Try batch result
      resultPath = path.join(RESULTS_DIR, `batch_${gradingId}.json`);
    }
    
    if (!fs.existsSync(resultPath)) {
      // Try summary result
      resultPath = path.join(RESULTS_DIR, `summary_${gradingId}.json`);
    }
    
    if (!fs.existsSync(resultPath)) {
      return res.status(404).json({
        success: false,
        message: 'Grading result not found'
      });
    }

    // Read and parse the result file
    const resultData = JSON.parse(fs.readFileSync(resultPath, 'utf8'));

    return res.status(200).json({
      success: true,
      result: resultData
    });
  } catch (error) {
    console.error('Error getting grading result:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get grading result',
      error: error.message
    });
  }
};
