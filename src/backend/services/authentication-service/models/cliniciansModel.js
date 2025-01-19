const { 
    CLINICIANS_BUCKET, 
    uploadJson, 
    getJson 
  } = require('../config/awsS3');
  const bcrypt = require('bcrypt');
  
  // createClinician: store data in <username>.json
  async function createClinician(username, email, passwordHash) {
    const key = `${username}.json`; // each clinician is stored by username
    const data = {
      username,
      email,
      passwordHash,
      role: 'CLINICIAN',
      clients: []  // { clientId, securityCode, parentUsername: null }
    };
  
    await uploadJson(CLINICIANS_BUCKET, key, data);
    return data;
  }
  
  // fetch the JSON by username
  async function getClinicianByUsername(username) {
    const key = `${username}.json`;
    try {
      return await getJson(CLINICIANS_BUCKET, key);
    } catch (err) {
      // If file not found
      return null;
    }
  }
  
  // update an existing clinician record
  async function saveClinicianData(clinicianData) {
    const key = `${clinicianData.username}.json`;
    await uploadJson(CLINICIANS_BUCKET, key, clinicianData);
  }
  
  module.exports = {
    createClinician,
    getClinicianByUsername,
    saveClinicianData
  };
  