const { GoogleGenerativeAI } = require("@google/generative-ai");

// API Key ke sath Gemini client ko initialize karein
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateReply = async (req, res) => {
    try {
        // Frontend se review ka text lena
        const { reviewText, businessName } = req.body;

        if (!reviewText || !businessName) {
            return res.status(400).json({ message: "Review text and business name are required." });
        }

        // Gemini model ko select karein
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // AI ko instruction (prompt) dena
        const prompt = `You are a professional and friendly social media manager for a business named "${businessName}". A customer left the following review: "${reviewText}". 
        Write a positive, appreciative, and SEO-friendly reply to this review in under 50 words. Thank the customer and mention the business name.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiReply = response.text();

        res.status(200).json({ reply: aiReply });

    } catch (error) {
        console.error("Error generating AI reply:", error);
        res.status(500).json({ message: "Failed to generate AI reply." });
    }
};

module.exports = { generateReply };