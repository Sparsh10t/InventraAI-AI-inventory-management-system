import { Product } from "../models/Product.js";
import { Parser } from "json2csv";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
  userId: req.user._id,
});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const exportProductsCSV = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find({
        userId: req.user._id,
      });

    const fields = [
      "name",
      "category",
      "quantity",
      "price",
      "supplier",
    ];

    const parser = new Parser({
      fields,
    });

    const csv = parser.parse(
      products
    );

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "products.csv"
    );

    return res.send(csv);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};