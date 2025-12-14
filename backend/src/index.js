import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

import { globalLimiter } from "./middleware/rate-limiter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], //
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Load routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/:userId/habits", habitRoutes);
app.use("/api/v1/user/:userId/dailylogs", dailyLogRoutes);

// Test API
app.get("/api/v1", (req, res) => {
  res.send({ message: "API is working 🚀" });
});

export default app;
