import { Router } from "express";

import { getHabits } from "../controllers/habitController.js";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router({ mergeParams: true });

router.get("/", getHabits);

export default router;
