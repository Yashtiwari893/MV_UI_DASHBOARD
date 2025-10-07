const Business = require('../models/business.model.js');
const User = require('../models/user.model.js');

const onboardBusiness = async (req, res) => {
    console.log("User data from middleware:", req.user);
    try {
        const { businessName, businessType, website } = req.body;
        const ownerId = req.user._id; // Ye ID hume protectRoute middleware se mili

        if (!businessName) {
            return res.status(400).json({ message: "Business name is required" });
        }

        // Naya business banana
        const newBusiness = new Business({
            businessName,
            businessType,
            website,
            owner: ownerId
        });

        await newBusiness.save();

        // User ka status update karna
        await User.findByIdAndUpdate(ownerId, { onboardingComplete: true });

        res.status(201).json({ message: "Business onboarded successfully", business: newBusiness });

    } catch (error) {
        console.error("Error in onboardBusiness: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { onboardBusiness };