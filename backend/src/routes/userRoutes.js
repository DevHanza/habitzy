import { Router } from "express";
import {
  registerUser,
  loginUser,
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
router.get("/:userId", getUserByID);
router.put("/:userId", updateUser);

export default router;
