import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/common/FileUpload';
import '../styles/GradingSetup.css';

const GradingSetup = () => {
  const [step, setStep] = useState(1);
  const [gradingType, setGradingType] = useState('');
  const [answerKeys, setAnswerKeys] = useState([]);
  const [criteria, setCriteria] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGradingTypeSelect = (type) => {
    setGradingType(type);
    setStep(2);
  };

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
  };

  const handleAnswerKeyUpload = (files) => {
    // In a real implementation, this would upload the files to the server
    // and then process them to extract text content
    setAnswerKeys(files);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call to process criteria and answer keys
    setTimeout(() => {
      setIsLoading(false);
      navigate('/grade');
    }, 2000);
  };

  return (
    <div className="grading-setup-container">
      <h1>Set Up Grading</h1>
      
      {step === 1 && (
        <div className="grading-type-selection">
          <h2>Select Grading Method</h2>
          <div className="grading-options">
            <div 
              className="grading-option"
              onClick={() => handleGradingTypeSelect('key')}
            >
              <div className="option-icon">🔑</div>
              <h3>Grade by Answer Key</h3>
              <p>Upload answer keys and let AI compare student work against them.</p>
              <p className="option-note">Best for objective assessments with clear right/wrong answers.</p>
            </div>
            
            <div 
              className="grading-option"
              onClick={() => handleGradingTypeSelect('criteria')}
            >
              <div className="option-icon">📋</div>
              <h3>Grade by Criteria</h3>
              <p>Define custom grading criteria and rubrics for AI evaluation.</p>
              <p className="option-note">Best for essays, research papers, and subjective assessments.</p>
            </div>
            
            <div 
              className="grading-option"
              onClick={() => handleGradingTypeSelect('hybrid')}
            >
              <div className="option-icon">🔄</div>
              <h3>Hybrid Approach</h3>
              <p>Combine answer keys with custom criteria for comprehensive grading.</p>
              <p className="option-note">Best for complex assessments with both objective and subjective elements.</p>
            </div>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="grading-setup-form">
          <div className="setup-header">
            <button 
              className="back-button"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
            <h2>
              {gradingType === 'key' && 'Upload Answer Keys'}
              {gradingType === 'criteria' && 'Define Grading Criteria'}
              {gradingType === 'hybrid' && 'Set Up Hybrid Grading'}
            </h2>
          </div>
          
          {(gradingType === 'key' || gradingType === 'hybrid') && (
            <div className="answer-key-section">
              <h3>Upload Answer Keys</h3>
              <p>Upload up to 5 files that will serve as answer keys for grading.</p>
              <FileUpload />
              <div className="file-count">
                {answerKeys.length} / 5 files uploaded
              </div>
            </div>
          )}
          
          {(gradingType === 'criteria' || gradingType === 'hybrid') && (
            <div className="criteria-section">
              <h3>Define Grading Criteria</h3>
              <p>Specify the criteria and rubric for evaluating submissions.</p>
              
              <div className="criteria-templates">
                <h4>Templates</h4>
                <div className="template-buttons">
                  <button onClick={() => setCriteria(`Content (40%):
- Thesis statement is clear and focused
- Arguments are well-developed and supported
- Evidence is relevant and properly cited
- Analysis demonstrates critical thinking

Organization (30%):
- Introduction effectively presents the topic
- Paragraphs are well-structured
- Transitions between ideas are smooth
- Conclusion summarizes key points

Language (20%):
- Grammar and syntax are correct
- Vocabulary is appropriate and varied
- Tone is consistent and appropriate

Formatting (10%):
- Document follows required format
- Citations follow proper style
- Bibliography is complete and formatted correctly`)}>Essay Rubric</button>
                  
                  <button onClick={() => setCriteria(`Problem Solving (40%):
- Correct mathematical approach
- Proper application of formulas
- Accurate calculations
- Logical problem-solving steps

Understanding (30%):
- Demonstrates conceptual understanding
- Applies appropriate theorems/principles
- Shows work clearly
- Interprets results correctly

Presentation (20%):
- Organized and structured work
- Clear notation and labeling
- Neat and legible
- Complete solutions

Creativity (10%):
- Innovative approach when applicable
- Multiple solution methods when possible
- Efficiency of solution
- Insightful observations`)}>Math Assessment</button>
                  
                  <button onClick={() => setCriteria(`Scientific Method (35%):
- Clear hypothesis formulation
- Appropriate experimental design
- Controlled variables identified
- Logical methodology

Data Analysis (30%):
- Accurate data collection
- Appropriate statistical analysis
- Clear data presentation (tables/graphs)
- Thoughtful interpretation of results

Discussion (25%):
- Connects results to hypothesis
- Identifies limitations of study
- Suggests improvements
- Relates to broader scientific context

Format (10%):
- Follows scientific report structure
- Proper citations and references
- Appropriate use of scientific terminology
- Professional presentation`)}>Lab Report</button>
                </div>
              </div>
              
              <textarea
                className="criteria-textarea"
                value={criteria}
                onChange={handleCriteriaChange}
                placeholder="Enter your grading criteria here..."
                rows={12}
              ></textarea>
            </div>
          )}
          
          <div className="setup-actions">
            <button 
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading || (gradingType === 'criteria' && !criteria) || (gradingType === 'key' && answerKeys.length === 0)}
            >
              {isLoading ? 'Processing...' : 'Continue to Grading'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingSetup;
