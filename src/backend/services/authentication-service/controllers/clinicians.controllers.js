const bcrypt = require('bcrypt');
const { 
  createClinician, 
  getClinicianByUsername, 
  saveClinicianData 
} = require('../models/clinicianModel');
const jwt = require('jsonwebtoken');

exports.clinicianSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if a clinician with this username already exists
    const existingClinician = await getClinicianByUsername(username);
    if (existingClinician) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newClinician = await createClinician(username, email, passwordHash);
    return res.json({ message: 'Clinician created', user: newClinician });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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

    // Create a JWT
    const token = jwt.sign(
      { username: clinician.username, role: 'CLINICIAN' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
