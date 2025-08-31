import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserByID,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);

router.post("/", addUser);

router.delete("/:id", deleteUser);

export default router;
