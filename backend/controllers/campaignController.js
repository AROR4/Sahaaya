const Campaign = require('../models/Campaign');
const User = require('../models/user');

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, category, location, date, image_url, target } = req.body;
    const userId = req.user.id;

    const campaign = await Campaign.create({
      title,
      description,
      category,
      location,
      date,
      image_url,
      target,
      creator: userId,
    });

    // Add campaign to user's createdCampaigns
    await User.findByIdAndUpdate(userId, {
      $push: { createdCampaigns: campaign._id },
    });

    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create campaign', error: err.message });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('creator', 'firstName lastName email');
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch campaigns', error: err.message });
  }
};

// Get a single campaign
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('participants', 'firstName email');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch campaign', error: err.message });
  }
};

// Join a campaign
exports.joinCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    const userId = req.user.id;

    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    if (!campaign.participants.includes(userId)) {
      // Add user to campaign participants
      campaign.participants.push(userId);

      // Recalculate popularity score: (participants / target) * 100
      const participantCount = campaign.participants.length;
      const target = campaign.target || 1; // avoid divide-by-zero
      campaign.popularity_score = Math.round((participantCount / target) * 100);

      // Save campaign
      await campaign.save();

      // Update user's joined campaigns
      await User.findByIdAndUpdate(userId, {
        $addToSet: { joinedCampaigns: campaign._id },
      });

      return res.status(200).json({
        message: 'Successfully joined the campaign',
        updatedScore: campaign.popularity_score,
      });
    } else {
      return res.status(400).json({ message: 'Already joined this campaign' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to join campaign', error: err.message });
  }
};

