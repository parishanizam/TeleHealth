const express = require('express');
const router = express.Router();
const { clinicianAuth, addClient } = require('../controllers/client.controller');

// POST /auth/clinicians/add-client
router.post('/add-client', clinicianAuth, addClient);

module.exports = router;
