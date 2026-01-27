import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

import { globalLimiter } from "./middleware/rate-limiter.js";
import { authenticateAccessToken } from "./middleware/authenticateAccessToken.js";

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
  }),
);

// Load routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/habits", authenticateAccessToken, habitRoutes);

// Test API
app.get("/api/v1", (req, res) => {
  return res.status(200).json({ message: "API is working 🚀" });
});

// 404 page
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

export default app;
