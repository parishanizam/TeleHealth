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
 * Get specific result for a question in an assessment
 * Expects `parentUsername`, `assessmentId`, and `question_id` to be passed in the request params.
 */
async function getAssessmentResultForQuestion(req, res) {
  try {
    const { parentUsername, assessmentId, question_id } = req.params;

    if (!parentUsername || !assessmentId || !question_id) {
      return res.status(400).json({ error: "parentUsername, assessmentId, and question_id are required." });
    }

    const resultsFile = `${parentUsername}/${parentUsername}_${assessmentId}.json`;

    // Check if the results file exists
    if (!(await fileExists(RESULTS_BUCKET, resultsFile))) {
      return res.status(404).json({ error: "No results found for this assessment." });
    }

    // Retrieve the results data from S3
    const resultsData = await getJson(RESULTS_BUCKET, resultsFile);

    // Find the specific question result
    const questionResult = resultsData.results.find((result) => result.question_id === parseInt(question_id));

    if (!questionResult) {
      return res.status(404).json({ error: `Question with ID ${question_id} not found in assessment.` });
    }

    // Return the found question result
    return res.json(questionResult);
  } catch (err) {
    console.error("Error retrieving assessment result for question:", err);
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

async function saveBiasModification(req, res) {
  try {
    const { parentUsername, assessmentId, question_id } = req.params;
    let { bias_state } = req.body;
    console.log(bias_state)

    if (!parentUsername || !assessmentId || !question_id) {
      return res.status(400).json({ error: "parentUsername, assessmentId, question_id, and valid biasState are required." });
    }

    const resultsFile = `${parentUsername}/${parentUsername}_${assessmentId}.json`;

    if (!(await fileExists(RESULTS_BUCKET, resultsFile))) {
      return res.status(404).json({ error: "Results file not found." });
    }

    const resultsData = await getJson(RESULTS_BUCKET, resultsFile);

    // Find the question to update
    const question = resultsData.results.find((result) => result.question_id === parseInt(question_id));

    if (!question) {
      return res.status(404).json({ error: "Question not found in the results." });
    }

    // Update the bias_state for the found question
    question.bias_state = bias_state;

    // Save the updated results back to S3
    await uploadJson(RESULTS_BUCKET, resultsFile, resultsData);

    // Return updated question directly without requiring another S3 read
    return res.json({
      message: "Bias modification saved successfully",
      updatedQuestion: { ...question },
    });
  } catch (err) {
    console.error("Error saving bias modification:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function saveMarkModification(req, res) {
  try {
    const { parentUsername, assessmentId, question_id } = req.params;
    let { mark_state } = req.body;  // Assuming the mark value is passed in the request body
    console.log(mark_state)

    if (!parentUsername || !assessmentId || !question_id) {
      return res.status(400).json({ error: "parentUsername, assessmentId, question_id, and mark are required." });
    }

    const resultsFile = `${parentUsername}/${parentUsername}_${assessmentId}.json`;

    // Check if the results file exists
    if (!(await fileExists(RESULTS_BUCKET, resultsFile))) {
      return res.status(404).json({ error: "Results file not found." });
    }

    const resultsData = await getJson(RESULTS_BUCKET, resultsFile);

    // Find the question to update
    const question = resultsData.results.find((result) => result.question_id === parseInt(question_id));

    if (!question) {
      return res.status(404).json({ error: "Question not found in the results." });
    }

    // Update the mark for the found question
    question.mark_state = mark_state;

    // Save the updated results back to S3
    await uploadJson(RESULTS_BUCKET, resultsFile, resultsData);

    // Return updated question directly without requiring another S3 read
    return res.json({
      message: "Mark modification saved successfully",
      updatedQuestion: { ...question },
    });
  } catch (err) {
    console.error("Error saving mark modification:", err);
    return res.status(500).json({ error: "Server error" });
  }
}


module.exports = {
  submitAssessment,
  getAssessmentHistory,
  getAssessmentResults,
  saveBiasModification,
  getAssessmentResultForQuestion,
  saveMarkModification,
};
