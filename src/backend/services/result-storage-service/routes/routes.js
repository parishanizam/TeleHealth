/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Defines Express routes for submitting, retrieving, and modifying assessment results.
 */

const express = require("express");
const router = express.Router();
const {
  submitAssessment,
  getAssessmentHistory,
  getAssessmentResults,
  saveBiasModification,
  getAssessmentResultForQuestion,
  saveMarkModification,
  saveNotesModification,
} = require("../controllers/results.controller");

router.post("/submit-assessment", submitAssessment);
router.get("/assessment-history/:username", getAssessmentHistory);
router.get("/results/:parentUsername/:assessmentId", getAssessmentResults);
router.get(
  "/results/:parentUsername/:assessmentId/:question_id",
  getAssessmentResultForQuestion,
);
router.post(
  "/results/:parentUsername/:assessmentId/:question_id/bias",
  saveBiasModification,
);
router.post(
  "/results/:parentUsername/:assessmentId/:question_id/mark",
  saveMarkModification,
);
router.post(
  "/results/:parentUsername/:assessmentId/:question_id/notes",
  saveNotesModification,
);

module.exports = router;