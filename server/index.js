const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const aiRoutes = require('./routes/ai.route.js');

// dotenv.config() ko sabse upar rakhna best practice hai
dotenv.config();

// Ab baaki files ko import karein
const authRoutes = require('./routes/auth.route.js');
const businessRoutes = require('./routes/business.route.js');
const gmbRoutes = require('./routes/gmb.route.js');
require('./config/passport-setup.js'); // Passport config ko run karne ke liye

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/gmb', gmbRoutes);

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