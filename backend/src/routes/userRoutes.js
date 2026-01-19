import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logout,
  logoutAll,
  forgotPassword,
  verifyCode,
  resetPassword,
  getDailyLeaderboard,
  updateUser,
  deleteUser,
  // getUserByID,
  // updateUser,
  // getUsers,
  // addUser,
  // deleteUser,
} from "../controllers/userController.js";
import { forgotPasswordLimiter } from "../middleware/rate-limiter.js";
import { authenticateAccessToken } from "../middleware/authenticateAccessToken.js";
const router = Router();

// router.get("/", getUsers);
// router.post("/", addUser);
// router.delete("/:userId", deleteUser);

// Update User Details
router.patch("/", [authenticateAccessToken], updateUser);
// Delete Account
router.delete("/", [authenticateAccessToken], deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/logout-all", logoutAll);
router.post("/forgot-password", [forgotPasswordLimiter], forgotPassword);
router.post("/verify", verifyCode);
router.patch("/reset-password", resetPassword);

router.get("/leaderboard", getDailyLeaderboard);
// router.get("/:userId", getUserByID);
// router.put("/:userId", updateUser);

export default router;
