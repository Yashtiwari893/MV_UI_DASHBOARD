const axios = require('axios'); // 'import' ki jagah 'require' use karein

const getManagedPages = async (req, res) => {
    try {
        const user = req.user;
        const accessToken = user.facebookAccessToken;

        if (!accessToken) {
            return res.status(400).json({ message: "Facebook account not linked or token is missing." });
        }

        const url = `https://graph.facebook.com/me/accounts?fields=name,access_token,picture&access_token=${accessToken}`;
        
        const response = await axios.get(url);

        const pages = response.data.data;
        if (!pages || pages.length === 0) {
            return res.status(404).json({ message: "No Facebook pages found for this user." });
        }

        res.status(200).json(pages);

    } catch (error) {
        console.error("Error fetching Facebook pages:", error.response?.data?.error || error.message);
        res.status(500).json({ message: "Failed to fetch Facebook pages." });
    }
};

// 'module.exports' CommonJS ke liye bilkul sahi hai
module.exports = { getManagedPages };
