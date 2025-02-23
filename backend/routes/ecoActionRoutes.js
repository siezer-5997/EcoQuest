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

    const prompt = `Analyze the following eco-friendly action.
Image URL (if available): ${image || "N/A"}
Description: ${description}
Provide a short analysis of the sustainability and impact of this action.`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });

    const analysis = completion.data.choices[0].text.trim();
    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Error analyzing eco action:", error);
    return res.status(500).json({ message: "Server error during analysis", error });
  }
});

export default router;
