/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Registers and exports the base route for all question-related endpoints.
 */


const express = require('express');
const router = express.Router();
const questionRoute = require('./routes/questionRoute');

router.use('/', questionRoute);

module.exports = router;