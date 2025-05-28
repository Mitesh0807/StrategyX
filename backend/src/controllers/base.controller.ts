import { Request, Response } from "express";
import { ResponseUtil } from "@/utils/response.util";
import { logger } from "@/utils/logger.util";

export abstract class BaseController {
  protected handleError(
    res: Response,
    error: any,
    message: string = "An error occurred",
  ): void {
    logger.error(message, error);

    if (error.message) {
      ResponseUtil.error(res, error.message, 400);
    } else {
      ResponseUtil.error(res, message, 500);
    }
  }

  protected handleSuccess<T>(
    res: Response,
    data?: T,
    message?: string,
    statusCode: number = 200,
  ): void {
    if (statusCode === 201) {
      ResponseUtil.created(res, data, message);
    } else {
      ResponseUtil.success(res, data, message);
    }
  }
}
