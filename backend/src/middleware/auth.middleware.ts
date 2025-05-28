import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "@/config/database";
import { User } from "@/entities/User.entity";
import { JwtUtil } from "@/utils/jwt.util";
import { ResponseUtil } from "@/utils/response.util";
import { logger } from "@/utils/logger.util";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token: string | null = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    if (!token && req.signedCookies.accessToken) {
      token = req.signedCookies.accessToken;
    }

    if (!token && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      ResponseUtil.error(res, "Access token required", 401);
      return;
    }

    const decoded = JwtUtil.verifyAccessToken(token);
    if (!decoded) {
      ResponseUtil.error(res, "Invalid or expired token", 401);
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.userId, isActive: true },
    });

    if (!user) {
      ResponseUtil.error(res, "User not found", 401);
      return;
    }

    user.lastLogin = new Date();
    await userRepository.save(user);

    req.user = user;
    next();
  } catch (error) {
    logger.error("Auth middleware error:", error);
    ResponseUtil.error(res, "Authentication failed", 401);
  }
};
