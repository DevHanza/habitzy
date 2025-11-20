import { Router } from "express";
import {
  registerUser,
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
router.get("/:userId", getUserByID);
router.put("/:userId", updateUser);

export default router;
