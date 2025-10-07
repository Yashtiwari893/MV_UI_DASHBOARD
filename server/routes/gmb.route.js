const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { listAccounts,postReply  } = require('../controllers/gmb.controller.js');

const router = express.Router();

// Jab /api/gmb/accounts par GET request aayegi, to listAccounts function chalega
router.get('/accounts', protectRoute, listAccounts);

// Jab /api/gmb/reviews/:reviewId/reply par POST request aayegi, to postReply function chalega
router.post('/reviews/:reviewId/reply', protectRoute, postReply);


module.exports = router;