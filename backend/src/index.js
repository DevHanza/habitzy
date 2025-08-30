import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const corsOptions = {
  // origin: process.env.FRONTEND_URL,
  // methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Load routes
// Test API
app.get("/api/v1", (req, res) => {
  res.send("API is working 🚀");
});

export default app;
