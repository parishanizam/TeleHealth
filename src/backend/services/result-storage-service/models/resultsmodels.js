const {
    RESULTS_BUCKET,
    uploadJson,
    getJson,
    fileExists,
  } = require("../config/awsS3");
  
  /**
   * Create a new results record in S3 inside the user's folder.
   * Ensures the file is stored at: `RESULTS_BUCKET / username / username_results.json`
   */
  async function createResults(username) {
    const folderPath = `${username}/`;
    const key = `${folderPath}${username}_results.json`;
    
    const data = {
      username,
      assessments: [],
    };
  
    // Check if file already exists to prevent overwriting
    const exists = await fileExists(RESULTS_BUCKET, key);
    if (!exists) {
      await uploadJson(RESULTS_BUCKET, key, data);
    }
  
    return data;
  }
  
  /**
   * Get results by username from S3
   */
  async function getResultsByUsername(username) {
    const key = `${username}/${username}_results.json`;
    try {
      return await getJson(RESULTS_BUCKET, key);
    } catch (err) {
      return null;
    }
  }
  
  /**
   * Save updated results data to S3
   */
  async function saveResultsData(resultsData) {
    const key = `${resultsData.username}/${resultsData.username}_results.json`;
    await uploadJson(RESULTS_BUCKET, key, resultsData);
  }
  
  module.exports = {
    createResults,
    getResultsByUsername,
    saveResultsData,
  };
  