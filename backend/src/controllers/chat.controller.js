import dotenv from "dotenv";

dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { Product } from "../models/Product.js";
import { Sales } from "../models/Sales.js";

console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY?.slice(0, 10));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    const products = await Product.find({
  userId: req.user._id,
});

const sales = await Sales.find({
  userId: req.user._id,
});

    const context = `
You are an Inventory Management AI Assistant.

Inventory Data:

Products:
${JSON.stringify(products, null, 2)}

Sales:
${JSON.stringify(sales, null, 2)}

Rules:
1. Answer ONLY from the provided inventory data.
2. Do not make up information.
3. Keep answers short and professional.
4. If data is unavailable, say "I could not find that information in the inventory database."

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: context,
    });

    const answer =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("Chat AI Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};