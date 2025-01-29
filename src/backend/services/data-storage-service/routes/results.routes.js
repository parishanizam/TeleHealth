// results.routes.js 
const express = require('express');
const router = express.Router();

const {
    clientTestDetails
} = require('../controllers/results.controller')

router.get('/assessment-details/:username', clientTestDetails)