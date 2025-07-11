const express = require('express');
const router = express.Router();
const { verifyGovtId } = require('../controllers/usercontroller');
const authenticate = require('../middleware/authMiddleware');

// Route: PUT /api/users/verify-id
router.put('/verify-id', authenticate, verifyGovtId);

module.exports = router;
