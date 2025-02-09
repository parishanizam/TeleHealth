const express = require('express');
const router = express.Router();
const {
  clinicianSignup,
  clinicianLogin,
  clinicianLogoutcianLogout
} = require('../controllers/clinician.controller');

router.post('/signup', clinicianSignup);
router.post('/login', clinicianLogin);
router.posy('/logout', clinicianLogout)

module.exports = router;
