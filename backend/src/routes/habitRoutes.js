import { Router } from "express";

import {
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  toggleHabitStatus,
  reorderHabit,
  // getHabitByID,
} from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router();

router.get("/", getHabits);
router.post("/", addHabit);
router.patch("/:habitId", updateHabit);
router.patch("/:habitId/toggleStatus", toggleHabitStatus);
router.patch("/:habitId/orderHabit", reorderHabit);
router.delete("/:habitId", deleteHabit);

// router.get("/:habitId", getHabitByID);

export default router;
