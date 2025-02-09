const { RESULTS_BUCKET, QUESTION_STORAGE_BUCKET, uploadJson, getJson, fileExists } = require("../config/awsS3");
const fetch = require("node-fetch");

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
      historyData = {
        name,
        username,
        assessments: [],
      };
    }

    historyData.assessments.push({
      assessment_id,
      questionBankId,
      date: today,
    });

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

async function getAssessmentResults(req, res) {
  try {
    const { parentUsername, assessmentId } = req.params;

    if (!parentUsername || !assessmentId) {
      return res.status(400).json({ error: "parentUsername and assessmentId are required." });
    }

    const resultsFile = `${parentUsername}/${parentUsername}_${assessmentId}.json`;

    if (!(await fileExists(RESULTS_BUCKET, resultsFile))) {
      return res.status(404).json({ error: "No results found for this assessment." });
    }

    const resultsData = await getJson(RESULTS_BUCKET, resultsFile);
    return res.json(resultsData);
  } catch (err) {
    console.error("Error retrieving assessment results:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
async function calculateScores(req, res) {
  console.log("🚀 calculateScores API was called!");  // Add this line
  try {
    const { parentUsername } = req.params;

    if (!parentUsername) {
      return res.status(400).json({ error: "parentUsername is required." });
    }

    const historyFile = `${parentUsername}/${parentUsername}_history.json`;
    console.log(`Checking history file: ${historyFile}`);

    if (!(await fileExists(RESULTS_BUCKET, historyFile))) {
      console.error(`History file missing: ${historyFile}`);
      return res.status(404).json({ error: "No assessment history found for this parent." });
    }

    const historyData = await getJson(RESULTS_BUCKET, historyFile);
    const scoresByTestType = {};

    for (const assessment of historyData.assessments) {
      const resultsFile = `${parentUsername}/${parentUsername}_${assessment.assessment_id}.json`;
      const scoresFile = `${parentUsername}/${parentUsername}_${assessment.assessment_id}_scores.json`;

      // ✅ Check if scores are already stored, return them to avoid recalculation
      if (await fileExists(RESULTS_BUCKET, scoresFile)) {
        console.log(`Scores already exist for ${scoresFile}, retrieving...`);
        const storedScores = await getJson(RESULTS_BUCKET, scoresFile);
        scoresByTestType[assessment.questionBankId] = storedScores;
        continue;
      }

      console.log(`Calculating scores for ${resultsFile}...`);

      if (!(await fileExists(RESULTS_BUCKET, resultsFile))) {
        console.error(`Missing results file: ${resultsFile}`);
        continue;
      }

      const resultsData = await getJson(RESULTS_BUCKET, resultsFile);
      const { questionBankId, results } = resultsData;
      const [language, testType] = questionBankId.split("-");

      // Fetch correct answers from QUESTION_STORAGE_BUCKET
      const questionBankFile = `${language}/${testType}.json`;

      if (!(await fileExists(QUESTION_STORAGE_BUCKET, questionBankFile))) {
        console.error(`Missing question bank: ${questionBankFile}`);
        continue;
      }

      const questionBankData = await getJson(QUESTION_STORAGE_BUCKET, questionBankFile);
      const questions = questionBankData.questions.reduce((acc, question) => {
        acc[question.id] = question.correctAnswer;
        return acc;
      }, {});

      // ✅ Compute score
      let correctAnswers = 0;
      results.forEach((res) => {
        if (res.user_answer && res.user_answer === questions[res.question_id]) {
          correctAnswers++;
        }
      });

      const totalQuestions = results.length;
      const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

      if (!scoresByTestType[testType]) scoresByTestType[testType] = [];
      scoresByTestType[testType].push({ name: `Test ${scoresByTestType[testType].length + 1}`, score });

      // ✅ Store calculated scores in S3
      await uploadJson(RESULTS_BUCKET, scoresFile, { score });
      console.log(`Scores stored at: ${scoresFile}`);
    }

    console.log("Final computed scores:", scoresByTestType);
    return res.json({ groupedScores: scoresByTestType });
  } catch (err) {
    console.error("Error calculating scores:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
module.exports = {
  submitAssessment,
  getAssessmentHistory,
  getAssessmentResults,
  calculateScores,
};
