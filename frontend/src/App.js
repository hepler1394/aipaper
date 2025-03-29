import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import GradingInterface from './pages/GradingInterface';
import Login from './pages/Login';
import Register from './pages/Register';
import SubscriptionPlans from './pages/SubscriptionPlans';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grade" element={<GradingInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
