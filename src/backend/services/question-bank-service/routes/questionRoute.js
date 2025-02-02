const express = require('express');
const router = express.Router();

const {
  getQuestions,
  getQuestionById
} = require('../controllers/questionController');

// Get all questions for language/test type
router.get('/:language/:testType', getQuestions);

// Get specific question by ID
router.get('/:language/:testType/:id', getQuestionById);

module.exports = router;