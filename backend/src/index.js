import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

const app = express();

const corsOptions = {
  // origin: process.env.FRONTEND_URL,
  // methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Load routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users/:userId/habits", habitRoutes);
app.use("/api/v1/users/:userId/dailylogs", dailyLogRoutes);

// Test API
app.get("/api/v1", (req, res) => {
  res.send("API is working 🚀");
});

export default app;
