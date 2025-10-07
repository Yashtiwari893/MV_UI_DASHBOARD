const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { listAccounts } = require('../controllers/gmb.controller.js');

const router = express.Router();

// Jab /api/gmb/accounts par GET request aayegi, to listAccounts function chalega
router.get('/accounts', protectRoute, listAccounts);

module.exports = router;