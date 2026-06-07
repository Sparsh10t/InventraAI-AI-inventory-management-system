import express from "express";
import { getAISummary } from "../controllers/aiSummary.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getAISummary);

export default router;