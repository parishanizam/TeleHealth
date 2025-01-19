const bcrypt = require('bcrypt');
const { createParent, getParentByUsername } = require('../models/parentModel');
const { getClinicianByUsername, saveClinicianData } = require('../models/clinicianModel');
const jwt = require('jsonwebtoken');

exports.parentSignup = async (req, res) => {
  try {
    const { username, email, password, securityCode } = req.body;

    // Check if parent username is free
    const existingParent = await getParentByUsername(username);
    if (existingParent) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // We need to find which clinician has this securityCode in their clients array
    // For simplicity, the parent picks the correct clinician's username from the UI
    // Or you can do a naive approach scanning all clinicians (which is inefficient).
    // Let's assume you asked the parent for "clinicianUsername" as well, 
    // so we can directly fetch that clinician. If not, you'd do a scan or advanced approach.

    // Example: 
    const { clinicianUsername } = req.body;
    const clinician = await getClinicianByUsername(clinicianUsername);
    if (!clinician) {
      return res.status(404).json({ error: 'Clinician not found' });
    }

    // find the client with the matching security code
    const clientEntry = clinician.clients.find(c => c.securityCode === securityCode && !c.parentUsername);
    if (!clientEntry) {
      return res.status(400).json({ error: 'Invalid or already used security code' });
    }

    // Create the parent
    const passwordHash = await bcrypt.hash(password, 10);
    const newParent = await createParent(username, email, passwordHash);

    // Link the parent to this client
    clientEntry.parentUsername = newParent.username;

    await saveClinicianData(clinician);

    return res.json({ message: 'Parent created', user: newParent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.parentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const parent = await getParentByUsername(username);
    if (!parent) {
      return res.status(404).json({ error: 'Parent not found' });
    }

    const match = await bcrypt.compare(password, parent.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: parent.username, role: 'PARENT' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
