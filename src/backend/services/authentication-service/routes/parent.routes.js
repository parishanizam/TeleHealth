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
