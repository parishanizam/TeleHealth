/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Provides utility functions to create, retrieve, and update
 * clinician records stored as JSON files in the S3 CLINICIANS_BUCKET.
 */
const { CLINICIANS_BUCKET, uploadJson, getJson } = require("../config/awsS3");

//Create a new clinician record in S3 named <username>.json
async function createClinician(
  firstname,
  lastname,
  username,
  email,
  passwordHash,
) {
  const key = `${username}.json`;
  const data = {
    firstname,
    lastname,
    username,
    email,
    passwordHash,
    role: "CLINICIAN",
    clients: [],
  };

  await uploadJson(CLINICIANS_BUCKET, key, data);
  return data;
}

async function getClinicianByUsername(username) {
  const key = `${username}.json`;
  try {
    return await getJson(CLINICIANS_BUCKET, key);
  } catch (err) {
    return null;
  }
}

async function saveClinicianData(clinicianData) {
  const key = `${clinicianData.username}.json`;
  await uploadJson(CLINICIANS_BUCKET, key, clinicianData);
}

module.exports = {
  createClinician,
  getClinicianByUsername,
  saveClinicianData,
};
