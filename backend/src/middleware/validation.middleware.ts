import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ResponseUtil } from "@/utils/response.util";

export function validationMiddleware<T extends object>(
  type: new () => T,
  skipMissingProperties = false,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    validate(dto, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints || {}).join(", "),
            )
            .join("; ");

          return ResponseUtil.error(res, message, 400);
        } else {
          req.body = dto;
          next();
        }
      },
    );
  };
}

export function queryValidationMiddleware<T extends object>(
  type: new () => T,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.query);
    validate(dto, { skipMissingProperties: true }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints || {}).join(", "),
            )
            .join("; ");

          return ResponseUtil.error(res, message, 400);
        } else {
          req.query = dto as any;
          next();
        }
      },
    );
  };
}
