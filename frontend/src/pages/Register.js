import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPlan = searchParams.get('plan') || 'free';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: selectedPlan,
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // For demo purposes, we'll just navigate to dashboard
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Sign up for AI Paper Grader</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'form-control error' : 'form-control'}
              placeholder="Enter your full name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'form-control error' : 'form-control'}
              placeholder="Enter your email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'form-control error' : 'form-control'}
              placeholder="Create a password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'form-control error' : 'form-control'}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          <div className="form-group">
            <label>Subscription Plan</label>
            <div className="plan-selection">
              <div className={`plan-option ${formData.plan === 'free' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="free"
                  name="plan"
                  value="free"
                  checked={formData.plan === 'free'}
                  onChange={handleChange}
                />
                <label htmlFor="free">
                  <strong>Free</strong>
                  <span>$0/month</span>
                </label>
              </div>
              <div className={`plan-option ${formData.plan === 'starter' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="starter"
                  name="plan"
                  value="starter"
                  checked={formData.plan === 'starter'}
                  onChange={handleChange}
                />
                <label htmlFor="starter">
                  <strong>Starter</strong>
                  <span>$9.99/month</span>
                </label>
              </div>
              <div className={`plan-option ${formData.plan === 'pro' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="pro"
                  name="plan"
                  value="pro"
                  checked={formData.plan === 'pro'}
                  onChange={handleChange}
                />
                <label htmlFor="pro">
                  <strong>Pro</strong>
                  <span>$29.99/month</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-group-inline">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={errors.agreeTerms ? 'error' : ''}
              />
              <label htmlFor="agreeTerms">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>
            {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
