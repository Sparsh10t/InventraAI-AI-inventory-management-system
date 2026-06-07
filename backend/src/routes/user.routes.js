import express from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/logout",
  logoutUser
);

router.get(
  "/profile",
  verifyJWT,
  getCurrentUser
);

router.put(
  "/profile",
  verifyJWT,
  updateProfile
);
export default router;