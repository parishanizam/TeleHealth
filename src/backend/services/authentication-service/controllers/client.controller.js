const { v4: uuidv4 } = require('uuid');
const { getClinicianByUsername, saveClinicianData } = require('../models/cliniciansModel');
const { uploadJson, PARENTS_BUCKET } = require('../config/awsS3');

async function addClient(req, res) {
  try {
    // We expect the request body to contain:
    // { clinicianUsername, firstName, lastName }

    const { clinicianUsername, firstName, lastName } = req.body;
    if (!clinicianUsername || !firstName || !lastName) {
      return res
        .status(400)
        .json({ error: 'clinicianUsername, firstName, and lastName are required.' });
    }

    const clinicianData = await getClinicianByUsername(clinicianUsername);
    if (!clinicianData) {
      return res.status(404).json({ error: 'Clinician not found' });
    }

    const securityCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const clientId = `client_${uuidv4()}`;

    if (!Array.isArray(clinicianData.clients)) {
      clinicianData.clients = [];
    }

    //Add the new client record to the clinician's JSON
    const newClient = {
      clientId,
      securityCode,
      parentUsername: null,
      firstName,
      lastName,
    };

    clinicianData.clients.push(newClient);

    await saveClinicianData(clinicianData);

    //create a placeholder file in the Parents bucket
    const safeFirst = firstName.replace(/\s/g, '_');
    const safeLast = lastName.replace(/\s/g, '_');
    const parentKey = `${safeFirst}_${safeLast}_${securityCode}.json`;

    const placeholderParentData = {
      firstName,
      lastName,
      securityCode,
      role: 'PARENT',
      username: null,     
      passwordHash: null,  
      email: null,
    };

    await uploadJson(PARENTS_BUCKET, parentKey, placeholderParentData);

    return res.json({
      message: 'Client added successfully',
      clientId,
      securityCode,
      firstName,
      lastName,
      parentFile: parentKey,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  addClient
};
