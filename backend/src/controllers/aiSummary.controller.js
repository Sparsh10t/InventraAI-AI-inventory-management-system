import dotenv from "dotenv";

dotenv.config();
import { Product } from "../models/Product.js";
import { Sales } from "../models/Sales.js";
import { GoogleGenAI } from "@google/genai";
console.log(
  "AI Summary Key:",
  process.env.GEMINI_API_KEY?.slice(0, 10)
);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getAISummary = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    const sales = await Sales.find({ userId: req.user._id });

    const prompt = `
You are an AI Inventory Analyst.

Analyze the following inventory data and generate 5 short business insights.

Products:
${JSON.stringify(products, null, 2)}

Sales:
${JSON.stringify(sales, null, 2)}

Return only 5 bullet points.

IMPORTANT:
- Do NOT use markdown.
- Do NOT use ** or * symbols.
- Return plain text bullet points only.

Example:
• Product X is running low on stock.
• Product Y is the top selling item.
• Revenue is growing steadily.
• Consider restocking Product X.
• Identify slow-moving inventory for markdown.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const summary =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};