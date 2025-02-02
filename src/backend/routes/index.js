const express = require('express');
const router = express.Router();

// Microservice “routers”
// - Each microservice directory exports its own Express router
// - For example, ./services/authentication-service/index.js might export an Express router
const authService = require('../services/authentication-service');
const mediaService = require('../services/media-processing-service');
const resultstorageService = require('../services/result-storage-service');
const questionService = require('../services/question-bank-service');


// Health Check
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API Gateway is working!' });
});

// Mount microservice routers
router.use('/auth', authService);
router.use('/media', mediaService);
router.use('/resultstorage', resultstorageService);
router.use('/questions', questionService);


module.exports = router;
