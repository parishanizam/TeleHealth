const express = require('express');
const router = express.Router();
const { addClient } = require('../controllers/client.controller');

router.post('/add-client', addClient);

module.exports = router;
