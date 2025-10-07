const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model.js');

// --- GOOGLE STRATEGY ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            existingUser.googleAccessToken = accessToken;
            if (refreshToken) {
                existingUser.googleRefreshToken = refreshToken;
            }
            await existingUser.save();
            return done(null, existingUser);
        }
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: 'google-user',
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, null);
    }
}));

// --- FACEBOOK STRATEGY ---
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Facebook kabhi-kabhi email nahi deta, isliye check karna zaruri hai
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        if (!email) {
            // Agar email na mile to error ke sath aage badhein
            return done(new Error("Facebook did not provide an email. Please try another login method."), null);
        }

        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
            existingUser.facebookAccessToken = accessToken;
            await existingUser.save();
            return done(null, existingUser);
        }

        const userWithEmail = await User.findOne({ email: email });
        if (userWithEmail) {
            userWithEmail.facebookId = profile.id;
            userWithEmail.facebookAccessToken = accessToken;
            await userWithEmail.save();
            return done(null, userWithEmail);
        }

        const newUser = new User({
            facebookId: profile.id,
            name: profile.displayName,
            email: email,
            password: 'facebook-user',
            facebookAccessToken: accessToken,
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, null);
    }
}));
