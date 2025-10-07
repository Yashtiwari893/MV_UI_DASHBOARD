// STEP 1: dotenv ko sabse pehle import aur configure karein
const dotenv = require('dotenv');
dotenv.config();

// STEP 2: Ab baaki sab kuch import karein
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const authRoutes = require('./routes/auth.route.js');
const businessRoutes = require('./routes/business.route.js');
const gmbRoutes = require('./routes/gmb.route.js');
const aiRoutes = require('./routes/ai.route.js'); // Ab isko yahan import karein
require('./config/passport-setup.js'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/gmb', gmbRoutes);
app.use('/api/ai', aiRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => { console.log('MongoDB connected successfully'); })
    .catch((error) => { console.log('MongoDB connection failed:', error.message); });

// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});