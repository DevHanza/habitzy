import { Router } from "express";
import { fetchHabits } from "../controllers/habitController";

const router = Router();

router.get("/", fetchHabits);

export default router;
