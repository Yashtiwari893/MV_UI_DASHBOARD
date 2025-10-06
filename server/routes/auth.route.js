const express = require('express');
const passport = require('passport'); // Passport ko import karein
const jwt = require('jsonwebtoken'); // JWT ko import karein
const { signup, login } = require('../controllers/auth.controller.js');

const router = express.Router();

// Email/Password routes (ye pehle se hain)
router.post('/signup', signup);
router.post('/login', login);

// -- Google OAuth Routes --

// 1. Ye route user ko Google login page par bhejega
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // Hume user se kya-kya information chahiye
}));

// 2. Google is route par user ko wapas bhejega
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    // Jab Passport user ko verify kar leta hai, to wo user 'req.user' me aa jata hai
    // Ab hum us user ke liye apna JWT token banayenge
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    // Hum user ko frontend par ek specific route par redirect karenge aur token URL me bhej denge
    res.redirect(`http://localhost:5173/login-success?token=${token}`);
});

module.exports = router;