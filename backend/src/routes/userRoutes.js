import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserByID);

router.post("/", addUser);

router.delete("/:userId", deleteUser);

router.put("/:userId", updateUser);

export default router;
