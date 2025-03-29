const { SubscriptionPlan } = require('../models/subscription.model');
const User = require('../models/user.model');

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ active: true }).sort({ price: 1 });
    
    return res.status(200).json({
      success: true,
      plans
    });
  } catch (error) {
    console.error('Error getting subscription plans:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get subscription plans',
      error: error.message
    });
  }
};

// Get plan details
exports.getPlanDetails = async (req, res) => {
  try {
    const { planName } = req.params;
    
    const plan = await SubscriptionPlan.findOne({ name: planName, active: true });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Error getting plan details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get plan details',
      error: error.message
    });
  }
};

// Get current user's plan
exports.getCurrentPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const plan = await SubscriptionPlan.findOne({ name: user.subscription.plan });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      subscription: {
        ...user.subscription.toObject(),
        planDetails: plan
      }
    });
  } catch (error) {
    console.error('Error getting current plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get current plan',
      error: error.message
    });
  }
};

// Upgrade plan
exports.upgradePlan = async (req, res) => {
  try {
    const { planName } = req.body;
    
    // Validate plan
    const plan = await SubscriptionPlan.findOne({ name: planName, active: true });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if it's actually an upgrade
    const currentPlan = await SubscriptionPlan.findOne({ name: user.subscription.plan });
    if (currentPlan && currentPlan.price >= plan.price) {
      return res.status(400).json({
        success: false,
        message: 'Selected plan is not an upgrade from current plan'
      });
    }
    
    // In a real application, this would include payment processing
    // For this demo, we'll just update the subscription
    
    // Update subscription
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    
    user.subscription = {
      plan: planName,
      startDate: Date.now(),
      endDate,
      status: 'active',
      autoRenew: true
    };
    
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: 'Plan upgraded successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Error upgrading plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upgrade plan',
      error: error.message
    });
  }
};

// Downgrade plan
exports.downgradePlan = async (req, res) => {
  try {
    const { planName } = req.body;
    
    // Validate plan
    const plan = await SubscriptionPlan.findOne({ name: planName, active: true });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if it's actually a downgrade
    const currentPlan = await SubscriptionPlan.findOne({ name: user.subscription.plan });
    if (currentPlan && currentPlan.price <= plan.price) {
      return res.status(400).json({
        success: false,
        message: 'Selected plan is not a downgrade from current plan'
      });
    }
    
    // In a real application, this would include handling remaining subscription time
    // For this demo, we'll just update the subscription
    
    // Update subscription
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    
    user.subscription = {
      plan: planName,
      startDate: Date.now(),
      endDate,
      status: 'active',
      autoRenew: true
    };
    
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: 'Plan downgraded successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Error downgrading plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to downgrade plan',
      error: error.message
    });
  }
};
