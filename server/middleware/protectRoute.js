const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN" se token nikalna

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // User ki details ko request me attach kar do
        next(); // Ab aage controller function par jao

    } catch (error) {
        console.error("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = protectRoute;