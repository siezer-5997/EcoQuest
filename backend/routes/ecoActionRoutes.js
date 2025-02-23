import express from "express";
import { OpenAI } from "openai";

const router = express.Router();

// Initialize OpenAI client using the API key from the environment variable
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/analyzeEcoAction
router.post("/analyzeEcoAction", async (req, res) => {
  try {
    const { image, description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Build a prompt that includes the image URL (if provided) and the description
    const prompt = `Analyze the following eco-friendly action.
Image URL (if available): ${image || "N/A"}
Description: ${description}
Provide a short analysis of the sustainability and impact of this action.`;

    // Use the Chat Completion endpoint with the gpt-3.5-turbo model
   
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant analyzing eco-friendly actions." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
    });
    console.log(completion.choices[0].message.content);

    const analysis = completion.choices[0].message.content.trim();

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Error analyzing eco action:", error);
    return res.status(500).json({ message: "Server error during analysis", error });
  }
});

export default router;
