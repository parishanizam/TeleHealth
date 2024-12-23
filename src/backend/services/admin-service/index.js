const express = require('express');
const router = express.Router();

// Get All Users Route
router.get('/users', (req, res) => {
    res.status(200).json({ message: 'User list retrieved successfully', users: ['mock-user-1', 'mock-user-2'] });
});

// Manage Role Route
router.post('/manage-role', (req, res) => {
    const { user_id, new_role } = req.body;
    res.status(200).json({ message: `Role updated successfully for user ${user_id}`, new_role });
});

module.exports = router;
