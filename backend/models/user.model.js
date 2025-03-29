const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro'],
      default: 'free'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: function() {
        // Default to 1 month from now
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
      }
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'canceled'],
      default: 'active'
    },
    autoRenew: {
      type: Boolean,
      default: false
    }
  },
  usage: {
    filesGradedCount: {
      type: Number,
      default: 0
    },
    filesGradedThisMonth: {
      type: Number,
      default: 0
    },
    lastGradedAt: {
      type: Date
    }
  },
  settings: {
    defaultGradingCriteria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GradingCriteria'
    },
    notificationPreferences: {
      type: Object,
      default: {}
    },
    uiPreferences: {
      type: Object,
      default: {}
    }
  },
  apiKeys: {
    gemini: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to check if user can grade more files based on subscription
UserSchema.methods.canGradeMoreFiles = function() {
  // Reset monthly count if it's a new month
  const now = new Date();
  const lastGraded = this.usage.lastGradedAt;
  
  if (lastGraded && lastGraded.getMonth() !== now.getMonth()) {
    this.usage.filesGradedThisMonth = 0;
  }
  
  // Check subscription limits
  switch (this.subscription.plan) {
    case 'free':
      return this.usage.filesGradedThisMonth < 5;
    case 'starter':
      return this.usage.filesGradedThisMonth < 50;
    case 'pro':
      return true; // Unlimited
    default:
      return false;
  }
};

// Method to check if batch grading is allowed
UserSchema.methods.canUseBatchGrading = function() {
  return this.subscription.plan === 'pro';
};

// Method to get monthly limit
UserSchema.methods.getMonthlyLimit = function() {
  switch (this.subscription.plan) {
    case 'free':
      return 5;
    case 'starter':
      return 50;
    case 'pro':
      return Infinity;
    default:
      return 0;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
