const Campaign = require('../models/Campaign');
const User = require('../models/user');

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      date,
      image_url,
      estimatedBudget,
      targetParticipants,
      contact,
      documents,
      isNgoAffiliated,
      ngoDetails
    } = req.body;

    const userId = req.user.id;

    const campaign = await Campaign.create({
      title,
      description,
      category,
      location,
      date,
      image_url,
      estimatedBudget,
      targetParticipants,
      contact,           // { email, phone }
      documents,         // array of doc URLs
      isNgoAffiliated,
      ngoDetails,        // { name, location }
      creator: userId,
    });

    // Link campaign to user
    await User.findByIdAndUpdate(userId, {
      $push: { createdCampaigns: campaign._id },
    });

    res.status(201).json(campaign);
  } catch (err) {
    console.error('Create campaign error:', err.message);
    res.status(500).json({ message: 'Failed to create campaign', error: err.message });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('creator', 'name email picture role') // Populate relevant user fields
      .sort({ createdAt: -1 }); // Optional: shows latest campaigns first

    res.status(200).json(campaigns);
  } catch (err) {
    console.error('Error fetching campaigns:', err.message);
    res.status(500).json({ message: 'Failed to fetch campaigns', error: err.message });
  }
};


// Get a single campaign
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name email picture role')
      .populate('participants', 'name email picture');

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json(campaign);
  } catch (err) {
    console.error('Error fetching campaign:', err.message);
    res.status(500).json({ message: 'Failed to fetch campaign', error: err.message });
  }
};


// Join a campaign
exports.joinCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    const userId = req.user.id;

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Ensure only approved campaigns can be joined
    if (campaign.status !== 'approved') {
      return res.status(403).json({ message: 'You can only join approved campaigns' });
    }

    // Prevent duplicate joins
    if (campaign.participants.includes(userId)) {
      return res.status(400).json({ message: 'Already joined this campaign' });
    }

    // Add participant
    campaign.participants.push(userId);

    // Recalculate popularity score
    const participantCount = campaign.participants.length;
    const target = campaign.target || 1;
    campaign.popularity_score = Math.round((participantCount / target) * 100);

    // Save campaign
    await campaign.save();

    // Add campaign to user's joinedCampaigns
    await User.findByIdAndUpdate(userId, {
      $addToSet: { joinedCampaigns: campaign._id },
    });

    res.status(200).json({
      message: 'Successfully joined the campaign',
      updatedScore: campaign.popularity_score,
    });

  } catch (err) {
    console.error('Join campaign error:', err.message);
    res.status(500).json({ message: 'Failed to join campaign', error: err.message });
  }
};


