import express from "express"            // Express framework import kiya (server banane ke liye)

import cors from "cors"                  // CORS import kiya (frontend-backend connect ke liye)

import cookieParser from "cookie-parser" // Cookies read karne ke liye library

import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import aiSummaryRoutes from "./routes/aiSummary.routes.js";
import forecastRoutes from "./routes/forecast.routes.js";
import insightsRoutes from "./routes/insights.routes.js";
import chatRoutes from "./routes/chat.routes.js";


const app = express()                    // Express ka app object banaya (yeh pura server hai)

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))



app.use(express.json({ limit: "16kb"}))  // JSON data read karega (max 16kb allowed)

app.use(express.urlencoded({extended: true, limit: "16kb"})) // Form/URL data read karega (complex bhi)

app.use(express.static("public"))        // "public" folder ko static banaya (files access ke liye)

app.use(cookieParser())                  // Cookies ko parse/read karne ke liye middleware

app.use("/api/products", productRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/forecast", forecastRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/insights", insightsRoutes);

app.use("/api/ai-summary", aiSummaryRoutes);

app.use("/api/users", userRoutes);



//routes import
// import userRouter from "./routes/user.routes.js"

//routes declaration
// app.use("/api/v1/user", userRouter);

// console.log("User routes loaded");

export {app}                             // App ko export kiya taaki dusri file me use ho



