import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Load routes
app.use("/api/habits", habitRoutes);

export default app;
