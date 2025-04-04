/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Defines the route for adding a new client under a clinician
 * by delegating the request to the client controller.
 */
const express = require('express');
const router = express.Router();
const { addClient } = require('../controllers/client.controller');

router.post('/add-client', addClient);

module.exports = router;