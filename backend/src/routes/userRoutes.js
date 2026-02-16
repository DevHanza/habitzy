import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getDailyLeaderboard,
  getDailyLeaderboardRank,
  incrementStreak,
  clearStreak,
} from "../controllers/userController.js";
import { authenticateAccessToken } from "../middleware/authenticateAccessToken.js";

const router = Router();

router.get("/", [authenticateAccessToken], getUser);

// Update User Details
router.patch("/", [authenticateAccessToken], updateUser);
// Delete Account
router.delete("/", [authenticateAccessToken], deleteUser);

router.get("/leaderboard", getDailyLeaderboard);
router.get(
  "/leaderboard-rank",
  [authenticateAccessToken],
  getDailyLeaderboardRank,
);

router.patch("/increment-streak", [authenticateAccessToken], incrementStreak);
router.patch("/clear-streak", [authenticateAccessToken], clearStreak);

export default router;
