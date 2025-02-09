const express = require('express');
const router = express.Router();
const {
  clinicianSignup,
  clinicianLogin,
  clinicianLogout
} = require('../controllers/clinician.controller');

router.post('/signup', clinicianSignup);
router.post('/login', clinicianLogin);
router.post('/logout', clinicianLogout)

module.exports = router;
