import { Router } from "express";

import {
  getHabits,
  getHabitByID,
  addHabit,
  deleteHabit,
} from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router({ mergeParams: true });

router.get("/", getHabits);
router.get("/:habitId", getHabitByID);

router.post("/", addHabit);

router.delete("/:habitId", deleteHabit);

export default router;
