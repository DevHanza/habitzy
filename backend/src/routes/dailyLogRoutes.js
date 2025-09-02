import { Router } from "express";
import { getDailyLogsByUser } from "../controllers/dailyLogController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router({ mergeParams: true });

router.get("/", getDailyLogsByUser);

export default router;
