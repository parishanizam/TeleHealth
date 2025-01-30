const express = require("express");
const router = express.Router();
const { submitAssessment, getAssessmentHistory } = require("../controllers/results.controller");

// Single POST route that submits the full assessment & updates history
router.post("/submit-assessment", submitAssessment);

// Get a parent's full assessment history
router.get("/assessment-history/:username", getAssessmentHistory);

module.exports = router;
