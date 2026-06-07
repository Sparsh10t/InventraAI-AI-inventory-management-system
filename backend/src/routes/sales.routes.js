import express from "express";

import {
  sellProduct,
  getSales,
} from "../controllers/sales.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/sell",
  verifyJWT,
  sellProduct
);

router.get(
  "/",
  verifyJWT,
  getSales
);

export default router;