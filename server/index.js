const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport'); 
const businessRoutes = require('./routes/business.route.js'); // Nayi route ko import karein


// 1. Sabse pehle .env file ko load karein taaki keys available ho jayein
dotenv.config(); 

// 2. Ab baaki files ko import karein jinko un keys ki zarurat hai
const authRoutes = require('./routes/auth.route.js');
require('./config/passport-setup.js'); // Ab is file ko GOOGLE_CLIENT_ID mil jayega


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/business', businessRoutes);

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => { console.log('MongoDB connected successfully'); })
    .catch((error) => { console.log('MongoDB connection failed:', error.message); });

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});