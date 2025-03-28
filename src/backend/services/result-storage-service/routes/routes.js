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
