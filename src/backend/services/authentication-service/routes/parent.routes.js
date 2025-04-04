/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Defines routes for parent account management, including signup, 
 * login, logout, account detail retrieval, and account confirmation.
 */

const express = require('express');
const router = express.Router();
const { 
  parentSignup, 
  parentLogin, 
  parentLogout,
  getParentAccountDetails, 
  confirmParentAccount 
} = require('../controllers/parent.controller');

router.post('/signup', parentSignup);
router.post('/login', parentLogin);
router.post('/logout', parentLogout)
router.get('/account-details/:username', getParentAccountDetails);
router.post('/confirm-account', confirmParentAccount);

module.exports = router;
