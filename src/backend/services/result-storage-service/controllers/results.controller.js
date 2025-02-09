const { RESULTS_BUCKET, uploadJson, getJson, fileExists } = require("../config/awsS3");

/**
 * Submit full assessment (Stores results & updates history)
 */
async function submitAssessment(req, res) {
  try {
    const { username, name, assessment_id, questionBankId, results } = req.body;

    if (!username || !name || !assessment_id || !questionBankId || !Array.isArray(results)) {
      return res.status(400).json({
        error: "username, name, assessment_id, questionBankId, and results are required.",
      });
    }

    const today = new Date().toISOString().split("T")[0];
    const userFolder = `${username}/`;
    const assessmentFile = `${userFolder}${username}_${assessment_id}.json`;
    const historyFile = `${userFolder}${username}_history.json`;

    // Construct assessment data
    const assessmentData = {
      assessment_id,
      date: today,
      questionBankId,
      results, // Stores list of question_id and user_answer
    };

    // Store the complete assessment in S3
    await uploadJson(RESULTS_BUCKET, assessmentFile, assessmentData);

    // Handle history update
    let historyData = {};
    if (await fileExists(RESULTS_BUCKET, historyFile)) {
      historyData = await getJson(RESULTS_BUCKET, historyFile);
    } else {
      // Create a new history file if it doesn't exist
      historyData = {
        name,
        username,
        assessments: [],
      };
    }

    // Add assessment entry to history
    historyData.assessments.push({
      assessment_id,
      questionBankId,
      date: today,
    });

    // Save updated history file
    await uploadJson(RESULTS_BUCKET, historyFile, historyData);

    return res.json({
      message: "Assessment results submitted successfully",
      username,
      assessment_id,
      fileLocation: assessmentFile,
      historyFile,
    });
  } catch (err) {
    console.error("Error storing assessment results:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Get assessment history for a parent
 */
async function getAssessmentHistory(req, res) {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    const historyFile = `${username}/${username}_history.json`;

    if (!(await fileExists(RESULTS_BUCKET, historyFile))) {
      return res.status(404).json({ error: "No assessment history found for this parent." });
    }

    const historyData = await getJson(RESULTS_BUCKET, historyFile);
    return res.json(historyData);
  } catch (err) {
    console.error("Error retrieving assessment history:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Get assessment results for a specific assessment ID
 * Expects `parentUsername` and `assessmentId` to be passed in the request params.
 */
async function getAssessmentResults(req, res) {
  try {
    const { parentUsername, assessmentId } = req.params;

    if (!parentUsername || !assessmentId) {
      return res.status(400).json({ error: "parentUsername and assessmentId are required." });
    }

    const resultsFile = `${parentUsername}/${parentUsername}_${assessmentId}.json`;

    // Check if the results file exists
    if (!(await fileExists(RESULTS_BUCKET, resultsFile))) {
      return res.status(404).json({ error: "No results found for this assessment." });
    }

    // Retrieve and return results
    const resultsData = await getJson(RESULTS_BUCKET, resultsFile);
    return res.json(resultsData);
  } catch (err) {
    console.error("Error retrieving assessment results:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  submitAssessment,
  getAssessmentHistory,
  getAssessmentResults,
};
