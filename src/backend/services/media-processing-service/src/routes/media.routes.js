const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/media.controller');

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Media Processing Service is up!' });
});

// POST /process
router.post('/process', mediaController.processMedia);

module.exports = router;
