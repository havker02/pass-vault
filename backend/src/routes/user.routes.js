import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
  uploadProfilePicture,
  getCurrentUser
} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/change-password").post(verifyJWT, changePassword);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/profile").post(verifyJWT, upload.single("avatar"), uploadProfilePicture);

router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
