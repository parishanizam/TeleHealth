/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Provides utility functions to create, retrieve, and update
 * parent records stored as JSON files in the PARENTS_BUCKET on S3,
 * including maintaining a parent index for efficient lookup by username.
 */

const { PARENTS_BUCKET, uploadJson, getJson } = require("../config/awsS3");

const INDEX_KEY = "parents_index.json";

async function createParent(username, email, passwordHash = {}) {
  const key = `${username}.json`;
  const data = {
    username,
    email,
    passwordHash,
    role: "PARENT",
  };

  await uploadJson(PARENTS_BUCKET, key, data);
  return data;
}

async function getParentByUsername(username) {
  const key = `${username}.json`;
  try {
    return await getJson(PARENTS_BUCKET, key);
  } catch (err) {
    return null;
  }
}

async function saveParentData(parentData) {
  const key = `${parentData.username}.json`;
  await uploadJson(PARENTS_BUCKET, key, parentData);
}

async function updateParentIndex(username, parentFileName) {
  let indexData = {};
  try {
    indexData = await getJson(PARENTS_BUCKET, INDEX_KEY);
  } catch (err) {
    indexData = {};
  }

  indexData[username] = parentFileName;

  await uploadJson(PARENTS_BUCKET, INDEX_KEY, indexData);
}

async function getParentDataFromIndex(username) {
  let indexData;
  try {
    indexData = await getJson(PARENTS_BUCKET, INDEX_KEY);
  } catch (err) {
    return null;
  }

  const fileName = indexData[username];
  if (!fileName) return null;

  try {
    const parentData = await getJson(PARENTS_BUCKET, fileName);
    return { parentData, fileName };
  } catch (err) {
    return null;
  }
}

module.exports = {
  createParent,
  getParentByUsername,
  saveParentData,
  updateParentIndex,
  getParentDataFromIndex,
};
