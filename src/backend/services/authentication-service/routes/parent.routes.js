const express = require('express');
const router = express.Router();
const { parentSignup, parentLogin } = require('../controllers/parent.controller');

router.post('/signup', parentSignup);
router.post('/login', parentLogin);

module.exports = router;
