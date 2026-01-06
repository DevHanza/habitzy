import { Router } from "express";

import {
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  // getHabitByID,
} from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router();

router.get("/", getHabits);
router.post("/", addHabit);
router.patch("/:habitId", updateHabit);
router.delete("/:habitId", deleteHabit);

// router.get("/:habitId", getHabitByID);

export default router;
