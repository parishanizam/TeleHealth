/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Defines Express routes for retrieving question bank content by language and test type.
 * Supports fetching all questions or a specific question by ID, handled by the question controller.
 */

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