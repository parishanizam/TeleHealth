const express = require('express');
const router = express.Router();

// Signup Route
router.post('/signup', (req, res) => {
    const { username, password, email, role } = req.body;
    res.status(201).json({ message: 'User signed up successfully', data: { username, email, role } });
});

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
});

// Logout Route
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
