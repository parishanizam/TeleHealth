/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Defines routes for clinician signup, login, and logout by delegating
 * requests to the appropriate controller functions.
 */

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