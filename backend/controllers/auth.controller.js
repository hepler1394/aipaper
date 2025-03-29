const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, plan } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      subscription: {
        plan: plan || 'free'
      }
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, plan: user.subscription.plan },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user info and token
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.subscription.plan
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, plan: user.subscription.plan },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user info and token
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.subscription.plan
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get user information',
      error: error.message
    });
  }
};

// Update user subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { plan } = req.body;
    
    if (!['free', 'starter', 'pro'].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription plan'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update subscription
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    user.subscription = {
      plan,
      startDate: Date.now(),
      endDate,
      status: 'active',
      autoRenew: true
    };

    await user.save();

    // Generate new token with updated plan
    const token = jwt.sign(
      { id: user._id, email: user.email, plan: user.subscription.plan },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      token,
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update subscription',
      error: error.message
    });
  }
};

// Update API key
exports.updateApiKey = async (req, res) => {
  try {
    const { geminiKey } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update API key
    user.apiKeys.gemini = geminiKey;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'API key updated successfully'
    });
  } catch (error) {
    console.error('Error updating API key:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update API key',
      error: error.message
    });
  }
};

// Get user usage statistics
exports.getUsageStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const limit = user.getMonthlyLimit();
    const used = user.usage.filesGradedThisMonth;
    const remaining = Math.max(0, limit - used);
    const isUnlimited = limit === Infinity;

    return res.status(200).json({
      success: true,
      usage: {
        plan: user.subscription.plan,
        limit: isUnlimited ? 'Unlimited' : limit,
        used,
        remaining: isUnlimited ? 'Unlimited' : remaining,
        canGradeMore: user.canGradeMoreFiles(),
        canUseBatchGrading: user.canUseBatchGrading()
      }
    });
  } catch (error) {
    console.error('Error getting usage stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get usage statistics',
      error: error.message
    });
  }
};
