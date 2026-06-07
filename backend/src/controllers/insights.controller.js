import { Product } from "../models/Product.js";
import { Sales } from "../models/Sales.js";

export const getInsights = async (req, res) => {
  try {
    const products = await Product.find({
  userId: req.user._id,
});

const sales = await Sales.find({
  userId: req.user._id,
});

    const lowStockProducts = products.filter(
      (p) => p.quantity < 10
    );

    const totalProductsSold = sales.reduce(
      (sum, sale) => sum + sale.quantitySold,
      0
    );

   const totalRevenue = sales.reduce(
  (sum, sale) =>
    sum + sale.totalPrice,
  0
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
      topSellingProduct = Object.keys(
        productSales
      ).reduce((a, b) =>
        productSales[a] > productSales[b]
          ? a
          : b
      );
    }

    res.json({
      success: true,
      insights: {
        lowStockProducts,
        totalProductsSold,
        totalRevenue,
        topSellingProduct,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};