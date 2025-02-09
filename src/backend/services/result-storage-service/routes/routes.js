const express = require("express");
const router = express.Router();
const { submitAssessment, getAssessmentHistory, getAssessmentResults, saveBiasModification, getAssessmentResultForQuestion } = require("../controllers/results.controller");

// Submit a full assessment & update history
router.post("/submit-assessment", submitAssessment);

// Get a parent's full assessment history
router.get("/assessment-history/:username", getAssessmentHistory);

// Get results of a specific assessment
router.get("/results/:parentUsername/:assessmentId", getAssessmentResults);

// Get result for a specific question in a specific assessment
router.get("/results/:parentUsername/:assessmentId/:question_id", getAssessmentResultForQuestion);

// Save modifications to a question on an assessment
router.post("/results/:parentUsername/:assessmentId/:question_id", saveBiasModification);

module.exports = router;
