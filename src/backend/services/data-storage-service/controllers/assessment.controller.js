const { v4: uuidv4 } = require('uuid');
const { getAssessmentByID, saveAssessmentData } = require('../models/assessmentModel');
// const { getResultsByUsername, saveResultsData } = require('../models/resultsModel');
const { uploadJson, RESULTS_BUCKET } = require('../config/assessment_awsS3');

async function addQuestionResults(req, res) {
  try {
    // Expecting the request body to include:
    // { assessment_id, results }

    const { assessment_id, results } = req.body;

    if (!assessment_id || !Array.isArray(results)) {
      return res.status(400).json({
        error: 'assessment_id, and results are required.',
      });
    }

    const assessmentData = await getAssessmentByID(assessment_id);
    if (!assessmentData) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    // Validate and prepare assessments
    const newResult = results.map((result) => ({
      question_number: result.question_number || uuidv4(), // Auto-generate a new question number if not provided
      question_id: result.question_id,
      user_answer: result.user_answer,
      bias_detected: result.bias_detected || false // default to false
    }));

    if (!Array.isArray(assessmentData.results)) {
        assessmentData.results = [];
    }

    // Append new assessments to the existing ones
    assessmentData.results = [...assessmentData.results, ...newResult];

    // Save updated client data
    await saveAssessmentData(assessmentData);

    // Create or update a JSON file in the Assessments bucket
    const safeClientUsername = clientUsername.replace(/\s/g, '_');
    const assessmentFileKey = `${safeClientUsername}_${assessment_id}.json`;

    const resultData = {
      assessment_id: assessment_id,
      results: assessmentData.results,
    };

    await uploadJson(RESULTS_BUCKET, assessmentFileKey, resultData);
    return res.json({
      message: 'Assessment results stored successfully',
      assessment_id,
      results: newResult,
      assessmentFile: assessmentFileKey,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
    addQuestionResults,
};
