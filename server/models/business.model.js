const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
    },
    website: {
        type: String,
    },
    // Ye business kis user ka hai, uski ID store karne ke liye
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ye 'User' model se link hai
        required: true,
    },
}, {
    timestamps: true
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;