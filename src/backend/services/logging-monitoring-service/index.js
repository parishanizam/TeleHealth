const express = require('express');
const router = express.Router();

// Get Logs Route
router.get('/logs', (req, res) => {
    const { filter_criteria } = req.query;
    res.status(200).json({ message: 'Logs retrieved successfully', logs: ['mock-log-1', 'mock-log-2'] });
});

// Get Metrics Route
router.get('/metrics', (req, res) => {
    const { metric_type } = req.query;
    res.status(200).json({ message: 'Metrics retrieved successfully', metrics: `mocked-${metric_type}-metrics` });
});

module.exports = router;
