const mongoose = require('mongoose');

const SubscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['free', 'starter', 'pro'],
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  limits: {
    monthlyFiles: {
      type: Number,
      required: true
    },
    referenceFiles: {
      type: Number,
      required: true
    },
    batchProcessing: {
      type: Boolean,
      default: false
    },
    customRubrics: {
      type: Boolean,
      default: false
    },
    analytics: {
      type: Boolean,
      default: false
    },
    bulkDownload: {
      type: Boolean,
      default: false
    }
  },
  active: {
    type: Boolean,
    default: true
  }
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);

// Initialize default plans
const initializeDefaultPlans = async () => {
  try {
    const count = await SubscriptionPlan.countDocuments();
    
    if (count === 0) {
      // Create default plans
      await SubscriptionPlan.create([
        {
          name: 'free',
          displayName: 'Free',
          price: 0,
          description: 'Basic grading for occasional use',
          features: [
            'Up to 5 files per month',
            'Basic grading with answer key',
            'Up to 5 reference files',
            'Manual grading of individual documents',
            'Download graded papers'
          ],
          limits: {
            monthlyFiles: 5,
            referenceFiles: 5,
            batchProcessing: false,
            customRubrics: false,
            analytics: false,
            bulkDownload: false
          }
        },
        {
          name: 'starter',
          displayName: 'Starter',
          price: 9.99,
          description: 'Enhanced grading for regular users',
          features: [
            'Up to 50 files per month',
            'Advanced grading options',
            'Expanded reference options',
            'Custom grading rubrics',
            'Basic analytics',
            'Download graded papers with annotations'
          ],
          limits: {
            monthlyFiles: 50,
            referenceFiles: 20,
            batchProcessing: false,
            customRubrics: true,
            analytics: true,
            bulkDownload: false
          }
        },
        {
          name: 'pro',
          displayName: 'Pro',
          price: 29.99,
          description: 'Professional grading for educators',
          features: [
            'Unlimited file uploads',
            'Batch grading functionality',
            'Advanced analytics and reporting',
            'Custom AI fine-tuning options',
            'Bulk download of graded papers',
            'Priority processing'
          ],
          limits: {
            monthlyFiles: -1, // Unlimited
            referenceFiles: -1, // Unlimited
            batchProcessing: true,
            customRubrics: true,
            analytics: true,
            bulkDownload: true
          }
        }
      ]);
      
      console.log('Default subscription plans initialized');
    }
  } catch (error) {
    console.error('Error initializing subscription plans:', error);
  }
};

module.exports = {
  SubscriptionPlan,
  initializeDefaultPlans
};
