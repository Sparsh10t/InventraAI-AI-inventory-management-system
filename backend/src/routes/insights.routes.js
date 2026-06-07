import express from "express";
import { getInsights } from "../controllers/insights.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getInsights);

export default router;