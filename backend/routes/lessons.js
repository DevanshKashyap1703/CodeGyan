const express = require('express');
const router = express.Router();

// Get lesson by ID
router.get('/:id', (req, res) => {
  // TODO: Fetch lesson by ID
  res.json({ message: 'Get lesson by ID' });
});

// Get lessons for a course
router.get('/course/:courseId', (req, res) => {
  // TODO: Fetch lessons for a course
  res.json({ message: 'Get lessons for course' });
});

module.exports = router;