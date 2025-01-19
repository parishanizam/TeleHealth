const express = require('express');
const router = express.Router();
const {
  parentSignup,
  parentLogin
} = require('../controllers/parent.controller');

// POST /auth/parents/signup
router.post('/signup', parentSignup);

// POST /auth/parents/login
router.post('/login', parentLogin);

module.exports = router;
