const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  category: {
    type: String,
    enum: ['Environment', 'Education', 'Animal Welfare', 'Other'],
    default: 'Other'
  },

  location: String,

  date: {
    type: Date,
    required: true
  },

  image_url: String,

  target: {
    type: Number,
    required: true
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  popularity_score: {
    type: Number,
    default: 0
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Campaign', campaignSchema);
