const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all details' });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const tokenPayload = { id: savedUser._id };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User created successfully',
            user: userResponse,
            token: token
        });

    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login function (Updated Response)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const tokenPayload = { id: user._id };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Logged in successfully",
            token: token,
            user: userResponse // Yahan bhi poora user object bhej rahe hain
        });

    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// getMe function
const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in getMe: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { signup, login, getMe };