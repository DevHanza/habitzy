import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

import { globalLimiter } from "./middleware/rate-limiter.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  // methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(globalLimiter);

// Load routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/:userId/habits", habitRoutes);
app.use("/api/v1/user/:userId/dailylogs", dailyLogRoutes);

// Test API
app.get("/api/v1", (req, res) => {
  res.send("API is working 🚀");
});

export default app;
