const { v4: uuidv4 } = require('uuid');
const { getClientByUsername, saveClientData } = require('../models/resultsModel');
const { uploadJson, RESULTS_BUCKET } = require('../config/awsS3');

async function addAssessmentResults(req, res) {
  try {
    // Expecting the request body to include:
    // { clientName, clientUsername, assessments }

    const { clientName, clientUsername, assessments } = req.body;

    if (!clientName || !clientUsername || !Array.isArray(assessments)) {
      return res.status(400).json({
        error: 'clientName, clientUsername, and assessments are required.',
      });
    }

    const clientData = await getClientByUsername(clientUsername);
    if (!clientData) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Validate and prepare assessments
    const newAssessments = assessments.map((assessment) => ({
      assessment_id: assessment.assessment_id || uuidv4(), // Auto-generate an ID if not provided
      questionBankId: assessment.questionBankId,
      date: assessment.date || new Date().toISOString().split('T')[0], // Default to today's date
    }));

    if (!Array.isArray(clientData.assessments)) {
      clientData.assessments = [];
    }

    // Append new assessments to the existing ones
    clientData.assessments = [...clientData.assessments, ...newAssessments];

    // Save updated client data
    await saveClientData(clientData);

    // Create or update a JSON file in the Assessments bucket
    const safeClientUsername = clientUsername.replace(/\s/g, '_');
    const assessmentFileKey = `${safeClientUsername}_assessments.json`;

    const assessmentData = {
      name: clientName,
      username: clientUsername,
      assessments: clientData.assessments,
    };

    await uploadJson(RESULTS_BUCKET, assessmentFileKey, assessmentData);
    return res.json({
      message: 'Assessment results stored successfully',
      clientName,
      clientUsername,
      assessments: newAssessments,
      assessmentFile: assessmentFileKey,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  addAssessmentResults,
};
