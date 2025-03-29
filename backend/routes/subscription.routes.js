const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all subscription plans
router.get('/', subscriptionController.getAllPlans);

// Get plan details
router.get('/:planName', subscriptionController.getPlanDetails);

// Protected routes
router.get('/user/current', authMiddleware, subscriptionController.getCurrentPlan);
router.post('/user/upgrade', authMiddleware, subscriptionController.upgradePlan);
router.post('/user/downgrade', authMiddleware, subscriptionController.downgradePlan);

module.exports = router;
