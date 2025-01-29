const bcrypt = require('bcrypt');
const { 
  createClinician, 
  getClinicianByUsername 
} = require('../models/cliniciansModel');

exports.clinicianSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existing = await getClinicianByUsername(username);
    if (existing) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    // Create the clinician
    const newClinician = await createClinician(username, email, passwordHash);

    return res.json({ message: 'Clinician created', user: newClinician });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.clinicianLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const clinician = await getClinicianByUsername(username);
    if (!clinician) {
      return res.status(404).json({ error: 'Clinician not found' });
    }

    const match = await bcrypt.compare(password, clinician.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({
      message: 'Login successful',
      user: {
        username: clinician.username,
        email: clinician.email,
        role: 'CLINICIAN'
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
