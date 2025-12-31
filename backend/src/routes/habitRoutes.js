import { Router } from "express";

import {
  getHabits,
  addHabit,
  updateHabit,
  // getHabitByID,
  // deleteHabit,
} from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router();

router.get("/", getHabits);
router.post("/", addHabit);
router.patch("/:habitId", updateHabit);

// router.get("/:habitId", getHabitByID);
// router.delete("/:habitId", deleteHabit);

export default router;
