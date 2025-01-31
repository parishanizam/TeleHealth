const express = require('express');
const router = express.Router();

// Import your route definitions
const questionRoute = require('./routes/questionRoute');

// Mount all media-processing routes under '/'
router.use('/', questionRoute);

module.exports = router;