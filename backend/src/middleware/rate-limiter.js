import { rateLimit } from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  // message: {
  //   error: "Too many requests. please try again later.",
  // },
});

// export const loginLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   limit: 20,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 mins
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
