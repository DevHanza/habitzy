import { Router } from "express";

import {
  getHabits,
  getHabitByID,
  addHabit,
} from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router({ mergeParams: true });

router.get("/", getHabits);
router.get("/:habitId", getHabitByID);

export default router;
