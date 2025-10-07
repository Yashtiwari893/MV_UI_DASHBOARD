const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { generateReply, generateSocialPost } = require('../controllers/ai.controller.js');


const router = express.Router();

router.post('/generate-reply', protectRoute, generateReply);
router.post('/generate-post', protectRoute, generateSocialPost);


module.exports = router;