import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger.util";
import { ResponseUtil } from "@/utils/response.util";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error("Unhandled error:", {
    error: error.message,
    stack: error.stack,
    path: req.originalUrl,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  ResponseUtil.error(res, "Internal server error", 500);
};
