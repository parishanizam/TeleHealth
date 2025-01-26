const express = require('express');
const router = express.Router();

// Import your route definitions
const mediaProcessRoute = require('./routes/mediaProcessRoute');

// Mount all media-processing routes under '/'
router.use('/', mediaProcessRoute);

module.exports = router;
