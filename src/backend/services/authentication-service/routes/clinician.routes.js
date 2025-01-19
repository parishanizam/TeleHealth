const express = require('express');
const router = express.Router();
const {
  clinicianSignup,
  clinicianLogin
} = require('../controllers/clinician.controller');

router.post('/signup', clinicianSignup);
router.post('/login', clinicianLogin);

module.exports = router;
