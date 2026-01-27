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
} from "../controllers/authController.js";
import { forgotPasswordLimiter } from "../middleware/rate-limiter.js";

const router = Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/logout-all", logoutAll);
router.post("/forgot-password", [forgotPasswordLimiter], forgotPassword);
router.post("/verify", verifyCode);
router.patch("/reset-password", resetPassword);

export default router;
