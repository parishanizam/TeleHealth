const {
    RESULTS_BUCKET,
    uploadJson,
    getJson
  } = require('../config/assessment_awsS3');
  
  /**
   * Create a new assessment record in S3 named <username>_<assessment_id>.json
   */
  async function createAssessment(username,assessment_id) {
    const key = `${username}_${assessment_id}.json`;
    const data = {
      assessment_id,
      results: [] // Placeholder for storing all question results
    };
  
    await uploadJson(RESULTS_BUCKET, key, data);
    return data;
  }
  
  /**
   * Get assessment by assessment_id from S3
   */
  async function getAssessmentByID(assessment_id) {
    const key = `${username}_${assessment_id}.json`;
    try {
      return await getJson(RESULTS_BUCKET, key);
    } catch (err) {
      return null; // Return null if the assessment file doesn't exist
    }
  }
  
  /**
   * Save updated assessment data to S3
   */
  async function saveAssessmentData(assessmentData) {
    const key = `${assessmentData.username}_${assessmentData.results}.json`;
    await uploadJson(RESULTS_BUCKET, key, assessmentData);
  }
  
  module.exports = {
    createAssessment,
    getAssessmentByID,
    saveAssessmentData
  };
  