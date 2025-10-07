const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { generateReply, generateSocialPost, generateImage, optimizeKeywords   } = require('../controllers/ai.controller.js');


const router = express.Router();

router.post('/generate-reply', protectRoute, generateReply);
router.post('/generate-post', protectRoute, generateSocialPost);
router.post('/generate-image', protectRoute, generateImage);
router.post('/optimize-keywords', protectRoute, optimizeKeywords);


module.exports = router;