const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model.js');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
},
// Yahan hume accessToken aur refreshToken milte hain
async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            // Agar user pehle se hai, to bas uske tokens update kar do
            existingUser.googleAccessToken = accessToken;
            existingUser.googleRefreshToken = refreshToken;
            await existingUser.save();
            return done(null, existingUser);
        }

        // Agar user naya hai, to use tokens ke sath save karo
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: 'google-user', // Placeholder
            googleAccessToken: accessToken,   // <-- Naya change
            googleRefreshToken: refreshToken, // <-- Naya change
        });

        await newUser.save();
        done(null, newUser);

    } catch (error) {
        done(error, null);
    }
}));