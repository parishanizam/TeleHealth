const { getClinicianByUsername, saveClinicianData } = require('../models/clinicianModel');
const jwt = require('jsonwebtoken');

// middleware
function clinicianAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'CLINICIAN') {
      return res.status(403).json({ error: 'Not a clinician' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

async function addClient(req, res) {
  try {
    const clinicianUsername = req.user.username;
    const clinicianData = await getClinicianByUsername(clinicianUsername);
    if (!clinicianData) {
      return res.status(404).json({ error: 'Clinician not found' });
    }

    // Generate a random code
    const securityCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    //Needs to be updated
    const clientId = `client_${Date.now()}`; 

    const newClient = {
      clientId,
      securityCode,
      parentUsername: null
    };

    clinicianData.clients.push(newClient);

    // save
    await saveClinicianData(clinicianData);

    return res.json({
      message: 'Client added successfully',
      clientId,
      securityCode
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  clinicianAuth,
  addClient
};
