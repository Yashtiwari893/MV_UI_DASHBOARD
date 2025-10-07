const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { generateReply } = require('../controllers/ai.controller.js');

const router = express.Router();

router.post('/generate-reply', protectRoute, generateReply);

module.exports = router;