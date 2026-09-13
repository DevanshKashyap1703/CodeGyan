const express = require('express');
const router = express.Router();

// Get user progress
router.get('/', (req, res) => {
  // TODO: Fetch user progress
  res.json({ message: 'Get user progress' });
});

// Update user progress
router.post('/', (req, res) => {
  // TODO: Update user progress
  res.json({ message: 'Update progress' });
});

module.exports = router;