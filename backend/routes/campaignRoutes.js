const express = require('express');
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  joinCampaign
} = require('../controllers/campaignController');

const authenticate = require('../middleware/authMiddleware'); // For protecting routes

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Protected routes
router.post('/', authenticate, createCampaign);
router.post('/:id/join', authenticate, joinCampaign);

module.exports = router;
