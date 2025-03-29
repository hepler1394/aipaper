const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.getCurrentUser);
router.put('/subscription', authMiddleware, authController.updateSubscription);
router.put('/api-key', authMiddleware, authController.updateApiKey);
router.get('/usage', authMiddleware, authController.getUsageStats);

module.exports = router;
