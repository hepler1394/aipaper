import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <div className="logo">AI Paper Grader</div>
          <nav className="nav-menu">
            <a href="#features">Features</a>
            <a href="#plans">Pricing</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-secondary">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Grade Papers with AI</h1>
          <p className="hero-subtitle">
            Save time and provide consistent feedback with our AI-powered grading platform. 
            Upload papers, set criteria, and let AI do the heavy lifting.
          </p>
          <Link to="/register" className="btn btn-accent">Get Started for Free</Link>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3 className="feature-title">Multiple File Formats</h3>
              <p className="feature-description">
                Upload and grade PDFs, Word documents, Excel files, and more. 
                Extract files from ZIP archives for batch processing.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered Grading</h3>
              <p className="feature-description">
                Leverage advanced AI to grade papers based on your criteria. 
                Consistent and objective evaluation every time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h3 className="feature-title">Three-Panel Interface</h3>
              <p className="feature-description">
                View grading criteria, student work, and grade summary side by side 
                for efficient review and feedback.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔑</div>
              <h3 className="feature-title">Custom API Keys</h3>
              <p className="feature-description">
                Use our default AI integration or connect your own API keys 
                for enhanced customization.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Detailed Analytics</h3>
              <p className="feature-description">
                Track student performance, identify trends, and generate 
                comprehensive reports.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Batch Processing</h3>
              <p className="feature-description">
                Grade multiple papers simultaneously with our batch 
                processing feature (Pro plan).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="plans-section">
        <div className="container">
          <h2 className="section-title">Choose Your Plan</h2>
          <div className="plans-grid">
            <div className="plan-card">
              <h3 className="plan-title">Free</h3>
              <div className="plan-price">$0</div>
              <ul className="plan-features">
                <li>✓ Up to 5 files per month</li>
                <li>✓ Basic grading with answer key</li>
                <li>✓ Up to 5 reference files</li>
                <li>✓ Manual grading of individual documents</li>
                <li>✓ Download graded papers</li>
                <li>✗ Custom grading rubrics</li>
                <li>✗ Batch processing</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
            <div className="plan-card">
              <h3 className="plan-title">Starter</h3>
              <div className="plan-price">$9.99/mo</div>
              <ul className="plan-features">
                <li>✓ Up to 50 files per month</li>
                <li>✓ Advanced grading options</li>
                <li>✓ Expanded reference options</li>
                <li>✓ Custom grading rubrics</li>
                <li>✓ Basic analytics</li>
                <li>✓ Download graded papers with annotations</li>
                <li>✗ Batch processing</li>
              </ul>
              <Link to="/register?plan=starter" className="btn btn-primary">Choose Starter</Link>
            </div>
            <div className="plan-card">
              <h3 className="plan-title">Pro</h3>
              <div className="plan-price">$29.99/mo</div>
              <ul className="plan-features">
                <li>✓ Unlimited file uploads</li>
                <li>✓ Batch grading functionality</li>
                <li>✓ Advanced analytics and reporting</li>
                <li>✓ Custom AI fine-tuning options</li>
                <li>✓ Bulk download of graded papers</li>
                <li>✓ Priority processing</li>
                <li>✓ Premium support</li>
              </ul>
              <Link to="/register?plan=pro" className="btn btn-primary">Choose Pro</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "AI Paper Grader has revolutionized how I grade assignments. 
                What used to take me hours now takes minutes, and the feedback 
                is more consistent than ever."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div>
                  <div><strong>Dr. Sarah Johnson</strong></div>
                  <div>Professor of English, University of California</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The batch processing feature in the Pro plan is a game-changer. 
                I can grade an entire class set of essays in one go, saving me 
                countless hours each week."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div>
                  <div><strong>Mark Thompson</strong></div>
                  <div>High School Teacher, Boston Public Schools</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">How accurate is the AI grading?</h3>
              <p className="faq-answer">
                Our AI grading system has been trained on thousands of academic papers and 
                achieves over 90% accuracy compared to human graders. You can always review 
                and adjust the AI's assessment if needed.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What file formats are supported?</h3>
              <p className="faq-answer">
                We support PDF, DOCX, DOC, TXT, RTF, and XLSX files. You can also upload ZIP 
                archives containing multiple files for batch processing (Pro plan).
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I use my own API key?</h3>
              <p className="faq-answer">
                Yes! You can use your own Gemini API key or other supported AI providers. 
                This gives you more control over the AI model used for grading.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How do I create grading criteria?</h3>
              <p className="faq-answer">
                You can create custom grading criteria through our intuitive interface, 
                upload existing rubrics, or use our templates. The AI will use these 
                criteria to evaluate papers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#about">About Us</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="copyright">© 2025 AI Paper Grader. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
