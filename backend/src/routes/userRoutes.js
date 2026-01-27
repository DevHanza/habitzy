import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getDailyLeaderboard,
  getDailyLeaderboardRank,
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

export default router;
