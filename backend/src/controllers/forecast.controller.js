import { Sales } from "../models/Sales.js";

export const getForecast = async (req, res) => {
  try {
    const sales = await Sales.find({
      userId: req.user._id,
    });

    if (sales.length === 0) {
      return res.status(200).json({
        success: true,
        prediction: 0,
      });
    }

    const totalSold = sales.reduce(
      (sum, sale) => sum + sale.quantitySold,
      0
    );

    const prediction = Math.round(
      totalSold / sales.length
    );

    res.status(200).json({
      success: true,
      prediction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};