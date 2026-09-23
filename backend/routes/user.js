import express from 'express';
import { register, login, updateProfile, logout, deleteUser } from '../controllers/user.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload, profileUpload } from '../middlewares/multer.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../utils/validation.js';
import { authLimiter } from "../middlewares/rateLimit.js";

const router = express.Router();

router.route('/register').post(authLimiter, singleUpload, validate(registerSchema), register);
router.route('/login').post(authLimiter, validate(loginSchema), login);
router.route('/profile/update').post(
  isAuthenticated,
  profileUpload,
  validate(updateProfileSchema),
  updateProfile
);
router.route('/logout').get(isAuthenticated, logout);

router.route("/delete/:id").delete(isAuthenticated, deleteUser);

export default router;