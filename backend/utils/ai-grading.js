const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Default API key from environment variables
const DEFAULT_API_KEY = process.env.GEMINI_API_KEY;

// Gemini API endpoint
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Grade a document using Gemini AI
 * @param {string} documentText - The text content of the document to grade
 * @param {string} criteria - The grading criteria or rubric
 * @param {Array} answerKeys - Array of answer key texts to use as reference
 * @param {string} apiKey - Optional custom API key
 * @returns {Object} - Grading results
 */
exports.gradeDocument = async (documentText, criteria, answerKeys = [], apiKey = null) => {
  try {
    const key = apiKey || DEFAULT_API_KEY;
    
    if (!key) {
      throw new Error('No API key provided for Gemini AI');
    }

    // Prepare answer key context
    let answerKeyContext = '';
    if (answerKeys && answerKeys.length > 0) {
      answerKeyContext = 'ANSWER KEYS:\n\n' + answerKeys.join('\n\n---\n\n');
    }

    // Construct the prompt for the AI
    const prompt = `
You are an expert educator tasked with grading a student's paper. 
Please evaluate the document based on the provided criteria and answer keys.

GRADING CRITERIA:
${criteria}

${answerKeyContext ? answerKeyContext : 'No specific answer key provided. Use your knowledge to evaluate the document.'}

DOCUMENT TO GRADE:
${documentText}

Please provide a comprehensive evaluation with the following:
1. Overall grade (letter grade and percentage)
2. Scores for each section of the criteria
3. Detailed feedback highlighting strengths and areas for improvement
4. Specific suggestions for improvement

Format your response as a JSON object with the following structure:
{
  "grade": {
    "letter": "A-F",
    "percentage": 0-100
  },
  "sections": [
    {
      "name": "Section name from criteria",
      "score": points earned,
      "maxScore": maximum possible points,
      "comments": "Specific feedback for this section"
    }
  ],
  "feedback": {
    "strengths": ["Strength 1", "Strength 2", ...],
    "areasForImprovement": ["Area 1", "Area 2", ...],
    "suggestions": ["Suggestion 1", "Suggestion 2", ...]
  },
  "summary": "Overall summary of the evaluation"
}
`;

    // Make API request to Gemini
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

    // Extract the generated text
    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) || 
                      generatedText.match(/{[\s\S]*}/);
    
    let gradingResult;
    
    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[0];
      gradingResult = JSON.parse(jsonString);
    } else {
      throw new Error('Failed to parse grading result from AI response');
    }

    return {
      success: true,
      result: gradingResult
    };
  } catch (error) {
    console.error('Error grading document with AI:', error);
    return {
      success: false,
      error: error.message || 'Failed to grade document with AI'
    };
  }
};

/**
 * Batch grade multiple documents using Gemini AI
 * @param {Array} documents - Array of document objects with text content
 * @param {string} criteria - The grading criteria or rubric
 * @param {Array} answerKeys - Array of answer key texts to use as reference
 * @param {string} apiKey - Optional custom API key
 * @returns {Array} - Array of grading results
 */
exports.batchGradeDocuments = async (documents, criteria, answerKeys = [], apiKey = null) => {
  try {
    const results = [];
    
    // Process documents sequentially to avoid rate limiting
    for (const doc of documents) {
      const result = await exports.gradeDocument(
        doc.text,
        criteria,
        answerKeys,
        apiKey
      );
      
      results.push({
        documentId: doc.id,
        fileName: doc.fileName,
        grading: result
      });
      
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return {
      success: true,
      results: results
    };
  } catch (error) {
    console.error('Error batch grading documents with AI:', error);
    return {
      success: false,
      error: error.message || 'Failed to batch grade documents with AI'
    };
  }
};

/**
 * Generate a summary of an answer key
 * @param {Array} answerKeyTexts - Array of answer key texts
 * @param {string} apiKey - Optional custom API key
 * @returns {Object} - Summarized answer key
 */
exports.summarizeAnswerKey = async (answerKeyTexts, apiKey = null) => {
  try {
    const key = apiKey || DEFAULT_API_KEY;
    
    if (!key) {
      throw new Error('No API key provided for Gemini AI');
    }

    // Combine answer key texts
    const combinedText = answerKeyTexts.join('\n\n---\n\n');

    // Construct the prompt for the AI
    const prompt = `
You are an expert educator preparing to grade student papers.
Please analyze the following answer key materials and create a comprehensive summary that captures the key points, concepts, and expectations.

ANSWER KEY MATERIALS:
${combinedText}

Please provide a structured summary that includes:
1. Main topics and concepts covered
2. Key facts, definitions, and principles
3. Expected arguments or reasoning
4. Important criteria for evaluation

Format your response as a JSON object with the following structure:
{
  "topics": ["Topic 1", "Topic 2", ...],
  "keyPoints": ["Point 1", "Point 2", ...],
  "evaluationCriteria": ["Criterion 1", "Criterion 2", ...],
  "summary": "Comprehensive summary of the answer key"
}
`;

    // Make API request to Gemini
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

    // Extract the generated text
    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) || 
                      generatedText.match(/{[\s\S]*}/);
    
    let summaryResult;
    
    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[0];
      summaryResult = JSON.parse(jsonString);
    } else {
      throw new Error('Failed to parse summary result from AI response');
    }

    return {
      success: true,
      result: summaryResult
    };
  } catch (error) {
    console.error('Error summarizing answer key with AI:', error);
    return {
      success: false,
      error: error.message || 'Failed to summarize answer key with AI'
    };
  }
};
