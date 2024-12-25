// data-storage-service/routes/testSession.routes.js

const express = require('express');
const router = express.Router();

// Import the controller
const testSessionController = require('../controllers/testSession.controller');

// Route definitions
router.post('/', testSessionController.createTestSession);
router.get('/:sessionId', testSessionController.getTestSession);
router.get('/', testSessionController.getAllTestSessions);
router.patch('/:sessionId', testSessionController.updateTestSession);
router.delete('/:sessionId', testSessionController.deleteTestSession);

module.exports = router;
