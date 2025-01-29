const {
    RESULTS_BUCKET,
    uploadJson,
    getJson
  } = require('../config/awsS3');
  
  /**
   * Create a new results record in S3 named <username>_results.json
   */
  async function createResults(username) {
    const key = `${username}_results.json`;
    const data = {
      username,
      assessments: [] // Placeholder for storing all assessment results
    };
  
    await uploadJson(RESULTS_BUCKET, key, data);
    return data;
  }
  
  /**
   * Get results by username from S3
   */
  async function getResultsByUsername(username) {
    const key = `${username}_results.json`;
    try {
      return await getJson(RESULTS_BUCKET, key);
    } catch (err) {
      return null; // Return null if the results file doesn't exist
    }
  }
  
  /**
   * Save updated results data to S3
   */
  async function saveResultsData(resultsData) {
    const key = `${resultsData.username}_results.json`;
    await uploadJson(RESULTS_BUCKET, key, resultsData);
  }
  
  module.exports = {
    createResults,
    getResultsByUsername,
    saveResultsData
  };
  