const express = require('express');
const router = express.Router();
const {
  clinicianSignup,
  clinicianLogin
} = require('../controllers/clinician.controller');

// POST /auth/clinicians/signup
router.post('/signup', clinicianSignup);

// POST /auth/clinicians/login
router.post('/login', clinicianLogin);

module.exports = router;
