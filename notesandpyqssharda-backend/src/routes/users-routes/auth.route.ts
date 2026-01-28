import { Router } from "express";

//import controllers
import { loginUser } from "../../controllers/user-controllers/login.js";
import { registerUser } from "../../controllers/user-controllers/register.js";
import { logout } from "../../controllers/user-controllers/logout.js";
import { changePassword } from "../../controllers/user-controllers/changePswd.js";
import { forgetPassword } from "../../controllers/user-controllers/forgetPswd.js";
import { createNewPassword } from "../../controllers/user-controllers/createNewPswd.js";
import verifyEmail from "../../controllers/user-controllers/verifyEmail.js";
import { getMe } from "../../controllers/user-controllers/loadAuth.js";
import { refreshAccessToken } from "../../controllers/user-controllers/refreshToken.js";
import { becomeModerator } from "../../controllers/user-controllers/becomeMod.js";
import { fetchContributors } from "../../controllers/user-controllers/fetchContributors.js";

//import zod schemas
import { loginSchema } from "../../validators/users-zod/login.zod.js";
import { registerSchema } from "../../validators/users-zod/register.zod.js";
import { changePasswordSchema } from "../../validators/users-zod/changePswd.zod.js";
import {
  createNewPasswordSchema,
  forgotPasswordSchema,
} from "../../validators/users-zod/forgotPswd.zod.js";

//import middlewares
import { validateMiddleware } from "../../middlewares/auth/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth/auth.middleware.js";

const router = Router();

//pubic routes
//signup
router.post("/register", validateMiddleware(registerSchema), registerUser);

//login (rate limited)
router.post("/login", validateMiddleware(loginSchema), loginUser);

//forgot password
router.post(
  "/forgot-password",
  validateMiddleware(forgotPasswordSchema),
  forgetPassword,
);

//reset password
router.post(
  "/reset-password",
  validateMiddleware(createNewPasswordSchema),
  createNewPassword,
);

// verify email
router.post("/verify-email", verifyEmail);

//protected rotues
//logout
router.post("/logout", logout);

//change password
router.post(
  "/change-password",
  validateMiddleware(changePasswordSchema),
  authMiddleware,
  changePassword,
);

//get logged in user details on app load
router.get("/me", authMiddleware, getMe);

//refresh token route
router.post("/refresh-token", refreshAccessToken);

//mod request route
router.post("/request-mod", authMiddleware, becomeModerator);

//fetch contributors/leaderboard
router.get("/contributors", fetchContributors);

export default router;
