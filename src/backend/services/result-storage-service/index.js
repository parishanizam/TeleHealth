const express = require('express');
const router = express.Router();

// Import your route definitions
const resultRoute = require('./routes/routes');

// Mount all media-processing routes under '/'
router.use('/', resultRoute);

module.exports = router;
