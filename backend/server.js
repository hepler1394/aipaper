require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');

// Import routes
const uploadRoutes = require('./routes/upload.routes');
const gradingRoutes = require('./routes/grading.routes');
const authRoutes = require('./routes/auth.routes');
const subscriptionRoutes = require('./routes/subscription.routes');

// Import subscription model for initialization
const { initializeDefaultPlans } = require('./models/subscription.model');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/paper-grader';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Initialize default subscription plans
    initializeDefaultPlans();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB max file size
  },
  abortOnLimit: true,
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Static files directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/grading', gradingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AI Paper Grader API is running');
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
