import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // maximum 10 requests from one IP
  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    message: "Too many authentication attempts. Please try again later.",
    success: false
  }
});