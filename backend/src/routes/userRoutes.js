import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  getUserByID,
  updateUser,
  // getUsers,
  // addUser,
  // deleteUser,
} from "../controllers/userController.js";

const router = Router();

// router.get("/", getUsers);
// router.post("/", addUser);
// router.delete("/:userId", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

router.get("/:userId", getUserByID);
router.put("/:userId", updateUser);

export default router;
