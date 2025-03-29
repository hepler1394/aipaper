import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GradingInterface.css';

const GradingInterface = () => {
  const [currentDocument, setCurrentDocument] = useState({
    title: 'The Life and Legacy of Elvis Presley',
    student: 'John Doe',
    submitted: 'March 28, 2025',
    fileName: 'essay_on_elvis.pdf',
    currentPage: 1,
    totalPages: 5
  });

  const [gradingSummary, setGradingSummary] = useState({
    finalGrade: 'B+',
    percentage: 87,
    sections: [
      { name: 'Content', score: 35, maxScore: 40 },
      { name: 'Organization', score: 26, maxScore: 30 },
      { name: 'Language', score: 17, maxScore: 20 },
      { name: 'Formatting', score: 9, maxScore: 10 }
    ],
    feedback: `This essay presents a well-researched overview of Elvis Presley's life and career. The thesis is clear, and the arguments are generally well-supported with relevant evidence.

Strengths:
- Comprehensive coverage of subject matter
- Good use of specific examples
- Clear organization with logical flow

Areas for improvement:
- Some claims lack sufficient supporting evidence
- Transitions between paragraphs could be smoother
- A few grammatical errors need correction

Overall, this is a strong essay that demonstrates good understanding of the subject and effective writing skills.`
  });

  return (
    <div className="grading-container">
      <header className="grading-header">
        <div className="logo">AI Paper Grader</div>
        <div className="document-info">
          <h2>{currentDocument.title}</h2>
          <div className="document-meta">
            <span>Student: {currentDocument.student}</span>
            <span>Submitted: {currentDocument.submitted}</span>
            <span>File: {currentDocument.fileName}</span>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
          <button className="btn btn-primary">Save Progress</button>
        </div>
      </header>

      <div className="grading-interface">
        <div className="grading-panel criteria-panel">
          <div className="panel-header">Grading Criteria</div>
          <div className="panel-toolbar">
            <button className="toolbar-btn">Edit</button>
            <button className="toolbar-btn">Save</button>
            <button className="toolbar-btn">Load Template</button>
          </div>
          <div className="panel-content">
            <div className="criteria-section">
              <h3>Content (40%)</h3>
              <ul>
                <li>Thesis statement is clear and focused</li>
                <li>Arguments are well-developed and supported</li>
                <li>Evidence is relevant and properly cited</li>
                <li>Analysis demonstrates critical thinking</li>
              </ul>
            </div>
            
            <div className="criteria-section">
              <h3>Organization (30%)</h3>
              <ul>
                <li>Introduction effectively presents the topic</li>
                <li>Paragraphs are well-structured</li>
                <li>Transitions between ideas are smooth</li>
                <li>Conclusion summarizes key points</li>
              </ul>
            </div>
            
            <div className="criteria-section">
              <h3>Language (20%)</h3>
              <ul>
                <li>Grammar and syntax are correct</li>
                <li>Vocabulary is appropriate and varied</li>
                <li>Tone is consistent and appropriate</li>
              </ul>
            </div>
            
            <div className="criteria-section">
              <h3>Formatting (10%)</h3>
              <ul>
                <li>Document follows required format</li>
                <li>Citations follow proper style</li>
                <li>Bibliography is complete and formatted correctly</li>
              </ul>
            </div>
          </div>
          <div className="panel-footer">
            <button className="btn btn-secondary">Reset</button>
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
        
        <div className="grading-panel document-panel">
          <div className="panel-header">Document Being Graded</div>
          <div className="panel-toolbar">
            <button className="toolbar-btn">Zoom In</button>
            <button className="toolbar-btn">Zoom Out</button>
            <button className="toolbar-btn">Annotate</button>
            <button className="toolbar-btn">Full Screen</button>
          </div>
          <div className="panel-content">
            <div className="document-viewer">
              <h2>The Life and Legacy of Elvis Presley</h2>
              <p>Elvis Aaron Presley, often referred to as the "King of Rock and Roll," was an American singer, musician, and actor who became one of the most iconic cultural figures of the 20th century. Born on January 8, 1935, in Tupelo, Mississippi, Elvis rose from humble beginnings to become a global superstar whose influence continues to resonate in music and popular culture decades after his death.</p>
              
              <p>This essay explores the life, career, and lasting impact of Elvis Presley, examining how his unique blend of musical styles and charismatic performances revolutionized popular music and challenged the social and cultural norms of his time.</p>
              
              <h3>Early Life and Musical Influences</h3>
              <p>Elvis Presley was born to Vernon and Gladys Presley in a two-room house built by his father. His identical twin brother, Jesse Garon Presley, was stillborn, leaving Elvis to grow up as an only child. The Presley family moved to Memphis, Tennessee, when Elvis was 13 years old, seeking better economic opportunities.</p>
              
              <p>Growing up in a predominantly African American neighborhood, young Elvis was exposed to a diverse range of musical styles, including gospel, country, and rhythm and blues. This multicultural musical environment would later influence his distinctive sound, which blended elements from these various genres.</p>
              
              <h3>Rise to Fame</h3>
              <p>Elvis's career began in 1954 when he recorded a song with producer Sam Phillips at Sun Records. Phillips, who had been looking for a white performer who could sing with the emotion and feel of African American musicians, saw potential in the young Elvis. This led to a series of recordings that combined country music with rhythm and blues, creating a new sound that would later be known as rockabilly, an early form of rock and roll.</p>
              
              <p>In 1955, Elvis's contract was sold to RCA Victor, and his career quickly accelerated. His energetic stage performances, characterized by his gyrating hips and dynamic movements, caused controversy but also captivated audiences, particularly young people. His appearance on television shows like "The Ed Sullivan Show" brought his music and performance style to a national audience, solidifying his status as a cultural phenomenon.</p>
            </div>
          </div>
          <div className="panel-footer">
            <div className="pagination">
              <button className="btn btn-secondary">Previous Page</button>
              <span>Page {currentDocument.currentPage} of {currentDocument.totalPages}</span>
              <button className="btn btn-primary">Next Page</button>
            </div>
          </div>
        </div>
        
        <div className="grading-panel summary-panel">
          <div className="panel-header">Grade Summary</div>
          <div className="panel-toolbar">
            <button className="toolbar-btn">Edit</button>
            <button className="toolbar-btn">Export</button>
            <button className="toolbar-btn">Print</button>
          </div>
          <div className="panel-content">
            <div className="final-grade">
              <span className="grade">{gradingSummary.finalGrade}</span>
              <span className="percentage">({gradingSummary.percentage}%)</span>
            </div>
            
            <div className="grade-breakdown">
              {gradingSummary.sections.map((section, index) => (
                <div className="grade-item" key={index}>
                  <span className="grade-label">{section.name}</span>
                  <div className="grade-bar-container">
                    <div 
                      className="grade-bar" 
                      style={{width: `${(section.score / section.maxScore) * 100}%`}}
                    ></div>
                  </div>
                  <span className="grade-score">{section.score}/{section.maxScore}</span>
                </div>
              ))}
            </div>
            
            <div className="feedback-section">
              <h3>Feedback:</h3>
              <div className="feedback-content">
                {gradingSummary.feedback.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="panel-footer">
            <button className="btn btn-secondary">Save Draft</button>
            <button className="btn btn-primary">Finalize Grade</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingInterface;
