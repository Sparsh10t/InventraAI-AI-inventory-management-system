import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  exportProductsCSV,
} from "../controllers/product.controller.js";
import {
  verifyJWT
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getAllProducts);

router.post("/create", verifyJWT, createProduct);

router.put("/:id", verifyJWT, updateProduct);

router.delete("/:id", verifyJWT, deleteProduct);

router.get("/export-csv", verifyJWT, exportProductsCSV);

router.get("/:id", verifyJWT, getSingleProduct);


export default router;