import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

// router.get("/", getUsers);
// router.post("/", addUser);
// router.delete("/:userId", deleteUser);

router.get("/:userId", getUserByID);
router.put("/:userId", updateUser);

export default router;
getUsers, addUser, deleteUser