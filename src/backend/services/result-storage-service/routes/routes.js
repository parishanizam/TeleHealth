const express = require("express");
const router = express.Router();
const { submitAssessment, getAssessmentHistory, getAssessmentResults } = require("../controllers/results.controller");

// Submit a full assessment & update history
router.post("/submit-assessment", submitAssessment);

// Get a parent's full assessment history
router.get("/assessment-history/:username", getAssessmentHistory);

// Get results of a specific assessment
router.get("/results/:parentUsername/:assessmentId", getAssessmentResults);

module.exports = router;