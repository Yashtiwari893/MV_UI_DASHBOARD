const express = require('express');
const { onboardBusiness } = require('../controllers/business.controller.js');
const protectRoute = require('../middleware/protectRoute.js');

const router = express.Router();

// Is route par pehle 'protectRoute' guard chalega, fir 'onboardBusiness' controller
router.post('/onboard', protectRoute, onboardBusiness);

module.exports = router;