const express = require("express");
const router = express.Router();
const { submitAssessment, getAssessmentHistory, getAssessmentResults, saveBiasModification, getAssessmentResultForQuestion, saveMarkModification, saveNotesModification } = require("../controllers/results.controller");

// Submit a full assessment & update history
router.post("/submit-assessment", submitAssessment);

// Get a parent's full assessment history
router.get("/assessment-history/:username", getAssessmentHistory);

// Get results of a specific assessment
router.get("/results/:parentUsername/:assessmentId", getAssessmentResults);

// Get result for a specific question in a specific assessment
router.get("/results/:parentUsername/:assessmentId/:question_id", getAssessmentResultForQuestion);

// Save bias modifications to a question on an assessment
router.post("/results/:parentUsername/:assessmentId/:question_id/bias", saveBiasModification);

// Save marks to a question on an assessment
router.post("/results/:parentUsername/:assessmentId/:question_id/mark", saveMarkModification);

// Save notes to a question on an assessment
router.post("/results/:parentUsername/:assessmentId/:question_id/notes", saveNotesModification);

module.exports = router;