import { Product } from "../models/Product.js";
import { Sales } from "../models/Sales.js";

export const sellProduct = async (req, res) => {
  try {

    const { productId, quantitySold } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.quantity < quantitySold) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    product.quantity -= quantitySold;

    await product.save();

    const sale = await Sales.create({
  userId: req.user._id,

  productId: product._id,
  productName: product.name,
  quantitySold,
  totalPrice:
    quantitySold * product.price,
});

    res.status(201).json({
      success: true,
      sale,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSales = async (req, res) => {
  try {

    const sales = await Sales.find({
  userId: req.user._id,
}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      sales,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};