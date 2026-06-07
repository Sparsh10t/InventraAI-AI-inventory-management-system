import express from "express";
import { chatWithAI } from "../controllers/chat.controller.js";
import {
  verifyJWT
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  verifyJWT,
  chatWithAI
);

export default router;