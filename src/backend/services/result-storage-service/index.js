/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Registers and exports the base route for all result-related endpoints.
 */

const express = require('express');
const router = express.Router();
const resultRoute = require('./routes/routes');

router.use('/', resultRoute);

module.exports = router;