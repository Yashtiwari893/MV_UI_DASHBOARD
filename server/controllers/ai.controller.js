const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const FormData = require('form-data');

// Initialize Gemini client with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate AI Review Reply
 */
const generateReply = async (req, res) => {
    try {
        const { reviewText, businessName, seoKeywords } = req.body;

        if (!reviewText || !businessName) {
            return res.status(400).json({ message: "Review text and business name are required." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // --- Enhanced Prompt ---
        const prompt = `
You are an expert SEO and social media manager for a business named "${businessName}".
A customer left the following review: "${reviewText}".
Generate a warm, positive, and SEO-friendly reply (under 50 words) that:
- Thanks the customer,
- Mentions the business name,
- Optionally includes these SEO keywords: "${seoKeywords || 'none'}".
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiReply = response.text().trim();

        res.status(200).json({ reply: aiReply });
    } catch (error) {
        console.error("Error generating AI reply:", error);
        res.status(500).json({ message: "Failed to generate AI reply." });
    }
};

/**
 * Generate Social Media Post (SEO Optimized)
 */
const generateSocialPost = async (req, res) => {
    try {
        const { topic, businessName } = req.body;

        if (!topic || !businessName) {
            return res.status(400).json({ message: "Topic and business name are required." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an expert social media content creator and SEO strategist for a business named "${businessName}".
Create a JSON response with the following structure:

{
  "caption": "A catchy, engaging caption for a social media post about ${topic}, including 2-3 relevant hashtags.",
  "keywords": ["3-5 SEO keywords related to ${topic} and ${businessName}"],
  "suggestedImagePrompt": "A detailed prompt to generate an image related to the post topic."
}

Ensure the output is valid JSON only.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponseText = response.text().trim();

        // Clean up any markdown formatting (```json ... ```)
        const jsonString = aiResponseText.replace(/```json|```/g, '').trim();

        let aiPost;
        try {
            aiPost = JSON.parse(jsonString);
        } catch (err) {
            console.error("Invalid JSON from Gemini:", aiResponseText);
            return res.status(500).json({ message: "AI response parsing failed.", raw: aiResponseText });
        }

        res.status(200).json(aiPost);
    } catch (error) {
        console.error("Error generating AI post:", error);
        res.status(500).json({ message: "Failed to generate AI post." });
    }
};
const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "A text prompt is required." });
        }

        const apiKey = process.env.CLIPDROP_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: "ClipDrop API key is not configured." });
        }

        // form-data object banayein
        const form = new FormData();
        form.append('prompt', prompt);

        // ClipDrop API ko call karein
        const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
            headers: {
                ...form.getHeaders(),
                'x-api-key': apiKey,
            },
            responseType: 'arraybuffer', // Image data ko buffer ke roop me receive karein
        });

        // Image buffer ko Base64 string me convert karein
        const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
        const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;

        // Frontend ko image data URL bhejein
        res.status(200).json({ image: imageDataUrl });

    } catch (error) {
        console.error("Error generating ClipDrop image:", error.response?.data?.toString() || error.message);
        res.status(500).json({ message: "Failed to generate image." });
    }
};
module.exports = { generateReply, generateSocialPost, generateImage };
