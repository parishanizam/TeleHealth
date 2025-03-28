const express = require('express');
const router = express.Router();
const questionRoute = require('./routes/questionRoute');

router.use('/', questionRoute);

module.exports = router;