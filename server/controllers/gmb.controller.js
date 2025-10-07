const { google } = require('googleapis');

const listAccounts = async (req, res) => {
    try {
        const user = req.user;

        // Check karein ki user ke paas Google Access Token hai ya nahi
        if (!user.googleAccessToken) {
            return res.status(400).json({ message: "Google account not linked or token is missing." });
        }

        // Ek naya OAuth2 client banayein
        const oauth2Client = new google.auth.OAuth2();
        // User ka access token set karein
        oauth2Client.setCredentials({ access_token: user.googleAccessToken });

        // Google My Business Account Management API client banayein
        const mybusinessaccountmanagement = google.mybusinessaccountmanagement({
            version: 'v1',
            auth: oauth2Client,
        });

        // User ke saare accounts ki list fetch karein
        const response = await mybusinessaccountmanagement.accounts.list({});
        const accounts = response.data.accounts || [];

        res.status(200).json(accounts);

    } catch (error) {
        console.error("Error fetching GMB accounts:", error.message);
        // Agar token expire ho gaya ho to
        if (error.code === 401) {
            return res.status(401).json({ message: "Token expired. Please re-login with Google." });
        }
        res.status(500).json({ message: "Failed to fetch Google Business accounts." });
    }
};

module.exports = { listAccounts };