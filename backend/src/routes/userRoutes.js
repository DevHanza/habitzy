import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserByID,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);

router.get("/:id", getUserByID);

export default router;
