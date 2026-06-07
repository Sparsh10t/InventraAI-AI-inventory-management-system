import axios from "axios";
import { Sales } from "../models/Sales.js";

export const getForecast = async (req, res) => {
  try {
    const sales = await Sales.find({
      userId: req.user._id,
    });

    const salesData = sales.map((sale) => sale.quantitySold);

    const response = await axios.post("http://127.0.0.1:5000/forecast", {
      sales: salesData,
    });

    res.status(200).json({
      success: true,
      prediction: response.data.prediction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 