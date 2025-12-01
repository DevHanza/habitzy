import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  getUserByID,
  updateUser,
  logout,
  logoutAll,
  forgotPassword,
  // getUsers,
  // addUser,
  // deleteUser,
} from "../controllers/userController.js";
import { forgotPasswordLimiter } from "../middleware/rate-limiter.js";

const router = Router();

// router.get("/", getUsers);
// router.post("/", addUser);
// router.delete("/:userId", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/logout-all", logoutAll);
router.post("/forgot-password", [forgotPasswordLimiter], forgotPassword);

router.get("/:userId", getUserByID);
router.put("/:userId", updateUser);

export default router;
