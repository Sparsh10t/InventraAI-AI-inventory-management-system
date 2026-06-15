import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { Product } from "../models/Product.js";
import { Sales } from "../models/Sales.js";

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

    // ===== Business Summary =====

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + (sale.totalPrice || 0),
      0
    );

    const totalUnitsSold = sales.reduce(
      (sum, sale) => sum + (sale.quantitySold || 0),
      0
    );

    const lowStockProducts = products.filter(
      (product) => product.quantity < 10
    );

    const productSales = {};

    sales.forEach((sale) => {
      if (!productSales[sale.productName]) {
        productSales[sale.productName] = 0;
      }

      productSales[sale.productName] += sale.quantitySold;
    });

    let topSellingProduct = "No Sales";

    if (Object.keys(productSales).length > 0) {
      topSellingProduct = Object.keys(productSales).reduce((a, b) =>
        productSales[a] > productSales[b] ? a : b
      );
    }

    const context = `
You are Inventra AI, an intelligent Inventory Management Assistant.

BUSINESS SUMMARY

Total Products: ${products.length}

Total Sales Records: ${sales.length}

Total Revenue: ₹${totalRevenue}

Total Units Sold: ${totalUnitsSold}

Top Selling Product: ${topSellingProduct}

Low Stock Products:
${
  lowStockProducts.length > 0
    ? lowStockProducts
        .map(
          (p) =>
            `${p.name} (${p.quantity} units left)`
        )
        .join(", ")
    : "None"
}

PRODUCT DATA:
${JSON.stringify(products, null, 2)}

SALES DATA:
${JSON.stringify(sales, null, 2)}

IMPORTANT:
- Do NOT use markdown.
- Do NOT use ** or * symbols.
- Return plain text bullet points only.
- use next line for each bullet point or when needed.
- Always answer based on the provided data.

RULES:

1. Answer ONLY using the provided inventory and sales data.
2. Never invent information.
3. Be concise and professional.
4. If information is unavailable, say:
"I could not find that information in the inventory database."
5. You can answer questions about:
   - Revenue
   - Sales
   - Products
   - Inventory
   - Low stock items
   - Top selling products
   - Restocking suggestions
   - Inventory summary
6. For restocking suggestions, prioritize products with:
   - Low stock
   - High sales

USER QUESTION:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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