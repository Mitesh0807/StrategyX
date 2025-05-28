import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "@/config/env";

export interface JwtPayload {
  userId: number;
  email: string;
}

export class JwtUtil {
  static generateAccessToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN,
    };
    return jwt.sign(payload, env.JWT_SECRET, options);
  }

  static generateRefreshToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
  }

  static verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch {
      return null;
    }
  }

  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch {
      return null;
    }
  }
}
