const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model.js');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    // --- DEBUGGING LOGS START ---
    // Ye logs hume batayenge ki Google se kya data mil raha hai
    console.log("--- Passport Callback Fired ---");
    console.log("1. Access Token from Google:", accessToken);
    console.log("2. Refresh Token from Google:", refreshToken);
    console.log("3. Profile ID from Google:", profile.id);
    // --- DEBUGGING LOGS END ---

    try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            console.log("4. User exists. Updating tokens...");
            existingUser.googleAccessToken = accessToken;
            // Refresh token tabhi update karo jab Google se naya mile
            if (refreshToken) {
                existingUser.googleRefreshToken = refreshToken;
            }
            
            console.log("5. User object before saving (update):", existingUser);
            await existingUser.save();
            return done(null, existingUser);
        }

        console.log("4. New user. Creating with tokens...");
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: 'google-user',
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
        });

        console.log("5. User object before saving (new):", newUser);
        await newUser.save();
        done(null, newUser);

    } catch (error) {
        console.error("!!! ERROR in Passport Strategy:", error);
        done(error, null);
    }
}));