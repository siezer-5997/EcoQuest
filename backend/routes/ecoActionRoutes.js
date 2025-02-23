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
        {
          role: "system", content: `You are a helpful assistant analyzing eco-friendly actions. For each eco-friendly action provided (e.g., recycling a plastic bottle, planting a tree, etc.), your task is to:
1. Estimate the CO₂ impact in terms of emissions saved or sequestered. Use these approximate values as a guideline:
   - Recycling one plastic bottle saves about 0.03 kg of CO₂.
   - Recycling one glass bottle saves about 0.1 kg of CO₂.
   - Planting one tree can sequester roughly 20 kg of CO₂ per year.
2. Assign a rating from 1 to 10 for the eco-friendly effectiveness of the action, where 10 is highly effective.
3. Provide a brief explanation of your reasoning, including any assumptions or estimations you used.

Return your answer in Text format without curly brackets with the keys:
- "action": the name or description of the eco-friendly action,
- "co2Impact": your estimated CO₂ impact (in kg or kg/year as appropriate),
- "rating": the assigned rating (1-10),
- "points": a point system rewarding (1-50),
- "explanation": a brief explanation of your reasoning.
` },
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
