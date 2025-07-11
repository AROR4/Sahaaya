const User = require('../models/user');

exports.verifyGovtId = async (req, res) => {
  try {
    const userId = req.user.id;
    const { govtIdUrl } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      isGovtIdVerified: true,
      govtIdUrl, 
    }, { new: true });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify ID', error: err.message });
  }
};

