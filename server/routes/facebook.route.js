const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { getManagedPages } = require('../controllers/facebook.controller.js');

const router = express.Router();

router.get('/pages', protectRoute, getManagedPages);

module.exports = router;