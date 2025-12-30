import { Router } from "express";

import {
  getHabits,
  // getHabitByID,
  // deleteHabit,
  // updateHabit,
} from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router({ mergeParams: true });

router.get("/", getHabits);

// router.get("/:habitId", getHabitByID);
// router.delete("/:habitId", deleteHabit);
// router.put("/:habitId", updateHabit);

export default router;
