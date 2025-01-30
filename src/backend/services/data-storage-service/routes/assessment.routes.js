const express = require('express');
const router = express.Router();
const { addAssessmentResults } = require('../controllers/assessment.controller');

router.post('/add-assessment-results', addAssessmentResults);

module.exports = router;
