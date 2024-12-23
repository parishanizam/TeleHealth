const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Username or email already exists' 
            });
        }

        // Create the new user
        const user = await User.create({ username, email, password, role });
        res.status(201).json({ 
            message: 'User created successfully', 
            user 
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Error creating user', 
            error: err.message 
        });
    }
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
