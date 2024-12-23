const express = require('express');
const router = express.Router();

// Feedback Route
router.get('/feedback', (req, res) => {
    const { session_id } = req.query;
    res.status(200).json({ message: 'Feedback provided successfully', feedback: 'mock-live-feedback' });
});

module.exports = router;
