const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Sabhi zaruri functions aur middleware import karein
const { signup, login, getMe } = require('../controllers/auth.controller.js');
const protectRoute = require('../middleware/protectRoute.js');

const router = express.Router();

// Email/Password routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', {
    scope: [
        'profile', 
        'email',
        'https://www.googleapis.com/auth/business.manage' // <-- YE NAYI PERMISSION HAI
    ],
    accessType: 'offline', // Refresh token ke liye zaruri
    prompt: 'consent'      // Naye permissions ke liye user se dobara poochne ke liye
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    res.redirect(`http://localhost:5173/login-success?token=${token}`);
});

// Route to get user details using a token
router.get('/me', protectRoute, getMe);

module.exports = router;