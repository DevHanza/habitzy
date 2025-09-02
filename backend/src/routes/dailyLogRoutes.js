import { Router } from "express";

// Enable "mergeParams" so we can access ":id" from parent route
const router = Router({ mergeParams: true });

export default router;
