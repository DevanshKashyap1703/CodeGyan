const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  // TODO: Fetch user profile
  res.json({ message: 'Get user profile' });
});

// Update user profile
router.put('/profile', (req, res) => {
  // TODO: Update user profile
  res.json({ message: 'Update user profile' });
});

module.exports = router;