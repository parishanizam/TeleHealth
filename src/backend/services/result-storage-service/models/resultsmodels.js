/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Provides utility functions for managing assessment result records (creating new file, retrieving, updating) 
 * in the RESULTS_BUCKET on S3.
 */


const {
  RESULTS_BUCKET,
  uploadJson,
  getJson,
  fileExists,
} = require("../config/awsS3");

/**
 * Create a new results record in S3 inside the user's folder.
 */
async function createResults(username) {
  const folderPath = `${username}/`;
  const key = `${folderPath}${username}_results.json`;

  const data = {
    username,
    assessments: [],
  };

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