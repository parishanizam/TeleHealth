const express = require('express');
const router = express.Router();

// Store Data Route
router.post('/store', (req, res) => {
    const { data_type, file, metadata } = req.body;
    res.status(201).json({ message: 'Data stored successfully', data: { data_type, metadata } });
});

// Retrieve Data Route
router.get('/retrieve/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: 'Data retrieved successfully', data: { id, content: 'mocked-data-content' } });
});

// Delete Data Route
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Data with ID ${id} deleted successfully` });
});

module.exports = router;
