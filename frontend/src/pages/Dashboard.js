import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data for dashboard
  const stats = [
    { label: 'Papers Graded', value: '127', subtext: 'This month' },
    { label: 'Average Grade', value: 'B+', subtext: 'All papers' },
    { label: 'Time Saved', value: '42h', subtext: 'This month' },
    { label: 'Batch Jobs', value: '8', subtext: 'This month' }
  ];
  
  const recentActivity = [
    { id: 1, title: 'Batch: English 101 Essays', meta: '15 papers • 30 minutes ago', status: 'completed' },
    { id: 2, title: 'History Midterm - John Smith', meta: '1 paper • 2 hours ago', status: 'completed' },
    { id: 3, title: 'Science Reports - Batch 3', meta: '8 papers • 3 hours ago', status: 'pending' },
    { id: 4, title: 'Math Quiz - Sarah Johnson', meta: '1 paper • 1 day ago', status: 'failed' }
  ];
  
  const recentDocuments = [
    { id: 1, title: 'Essay on Elvis Presley', type: 'PDF', pages: 5, grade: 'B+', date: 'March 28, 2025' },
    { id: 2, title: 'History Research Paper', type: 'DOCX', pages: 12, grade: 'A-', date: 'March 27, 2025' },
    { id: 3, title: 'Science Lab Report', type: 'PDF', pages: 8, grade: 'B', date: 'March 25, 2025' }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">AI Paper Grader</div>
        <nav className="nav-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/grade">Grade Papers</Link>
          <Link to="/history">History</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <div className="user-menu">
          <span className="plan-badge">Pro Plan</span>
          <span className="user-name">User Name</span>
        </div>
      </header>
      
      <div className="dashboard-content">
        <aside className="sidebar">
          <div className="sidebar-menu">
            <div 
              className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'grade' ? 'active' : ''}`}
              onClick={() => setActiveTab('grade')}
            >
              Grade Papers
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              Recent Grades
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'keys' ? 'active' : ''}`}
              onClick={() => setActiveTab('keys')}
            >
              Answer Keys
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscription')}
            >
              Subscription
            </div>
            <div 
              className={`sidebar-item ${activeTab === 'help' ? 'active' : ''}`}
              onClick={() => setActiveTab('help')}
            >
              Help & Support
            </div>
          </div>
        </aside>
        
        <main className="main-content">
          <div className="subscription-info">
            <div className="plan-info">
              <div className="plan-name">Pro Plan</div>
              <div>Your subscription renews on April 29, 2025</div>
            </div>
            <div className="plan-details">
              <div className="plan-stat">
                <div className="plan-value">∞</div>
                <div className="plan-label">Files</div>
              </div>
              <div className="plan-stat">
                <div className="plan-value">100%</div>
                <div className="plan-label">Features</div>
              </div>
              <div className="plan-stat">
                <div className="plan-value">Priority</div>
                <div className="plan-label">Support</div>
              </div>
            </div>
            <button className="btn btn-primary">Manage Plan</button>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div>{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div>{stat.subtext}</div>
              </div>
            ))}
          </div>
          
          <div className="recent-activity">
            <div className="section-header">
              <div className="section-title">Recent Activity</div>
              <Link to="/grade" className="btn btn-primary">Grade New Papers</Link>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div className="activity-item" key={activity.id}>
                  <div className="activity-info">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-meta">{activity.meta}</div>
                  </div>
                  <div className={`activity-status status-${activity.status}`}>
                    {activity.status === 'completed' && 'Completed'}
                    {activity.status === 'pending' && 'Processing'}
                    {activity.status === 'failed' && 'Failed'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="recent-activity">
            <div className="section-header">
              <div className="section-title">Recent Documents</div>
              <Link to="/history" className="btn btn-primary">View All</Link>
            </div>
            <div className="documents-grid">
              {recentDocuments.map((doc) => (
                <div className="document-card" key={doc.id}>
                  <div className="document-icon">📄</div>
                  <div className="document-title">{doc.title}</div>
                  <div className="document-meta">
                    {doc.type} • {doc.pages} pages • Graded: {doc.grade}
                  </div>
                  <div className="document-meta">Graded on: {doc.date}</div>
                  <div className="document-actions">
                    <button className="btn btn-secondary">View</button>
                    <button className="btn btn-primary">Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
