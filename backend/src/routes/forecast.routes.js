import express from "express";
import { getForecast } from "../controllers/forecast.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/", verifyJWT, getForecast);

export default router;