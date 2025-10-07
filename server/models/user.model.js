const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Har user ka email alag hoga
    },
    password: {
        type: String, // Password is not required for Google/social users
    },
    facebookId: { type: String },
    facebookAccessToken: { type: String },
    // Google/FB/IG se login ke liye fields
    googleId: { type: String },
    instagramId: { type: String },
    googleAccessToken: { type: String },
    googleRefreshToken: { type: String },

    // Naya field
    onboardingComplete: {
        type: Boolean,
        default: false // Naye user ke liye ye hamesha false hoga
    }
}, {
    timestamps: true // Ye apne aap 'createdAt' aur 'updatedAt' fields add kar dega
});

const User = mongoose.model('User', userSchema);

module.exports = User;