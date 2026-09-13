const express = require('express');
const router = express.Router();

// Get all courses
router.get('/', (req, res) => {
  // TODO: Fetch all courses from database
  res.json({ message: 'Get all courses' });
});

// Get course by ID
router.get('/:id', (req, res) => {
  // TODO: Fetch course by ID
  res.json({ message: 'Get course by ID' });
});

// Create course
router.post('/', (req, res) => {
  // TODO: Create new course
  res.json({ message: 'Create course' });
});

// Update course
router.put('/:id', (req, res) => {
  // TODO: Update course
  res.json({ message: 'Update course' });
});

// Delete course
router.delete('/:id', (req, res) => {
  // TODO: Delete course
  res.json({ message: 'Delete course' });
});

module.exports = router;