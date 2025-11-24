import { rateLimit } from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
