import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { validationMiddleware } from "@/middleware/validation.middleware";
import { authMiddleware } from "@/middleware/auth.middleware";
import { authLimiter } from "@/middleware/rateLimiting.middleware";
import { LoginDto, SignupDto } from "@/dto/auth.dto";

const router = Router();
const authController = new AuthController();

router.post(
  "/login",
  authLimiter,
  validationMiddleware(LoginDto),
  authController.login,
);
router.post(
  "/signup",
  authLimiter,
  validationMiddleware(SignupDto),
  authController.signup,
);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getMe);
router.post("/refresh", authController.refreshToken);

export { router as authRoutes };
