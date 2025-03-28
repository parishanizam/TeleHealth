const express = require('express');
const router = express.Router();
const resultRoute = require('./routes/routes');

router.use('/', resultRoute);

module.exports = router;
