import { Router } from "express";
import { createUser, fetchUsers } from "../controllers/userController.js";

const router = Router();

router.get("/", fetchUsers);
router.post("/", createUser);

export default router;
