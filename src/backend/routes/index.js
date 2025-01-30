const express = require('express');
const router = express.Router();

// Microservice “routers”
// - Each microservice directory exports its own Express router
// - For example, ./services/authentication-service/index.js might export an Express router
const authService = require('../services/authentication-service');
const mediaService = require('../services/media-processing-service');
const questionService = require('../services/question-bank-service');
// const storageService = require('../services/data-storage-service');
// const reportService = require('../services/report-generation-service');
// const feedbackService = require('../services/real-time-feedback-service');
// const adminService = require('../services/admin-service');
// const logsService = require('../services/logging-monitoring-service');

// Health Check
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API Gateway is working!' });
});

// Mount microservice routers
// e.g. all auth routes will live under /auth
router.use('/auth', authService);
router.use('/media', mediaService);
router.use('/questions', questionService);
// router.use('/storage', storageService);
// router.use('/reports', reportService);
// router.use('/feedback', feedbackService);
// router.use('/admin', adminService);
// router.use('/logs', logsService);

module.exports = router;
