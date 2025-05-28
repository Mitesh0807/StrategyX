import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    data?: T,
    message?: string,
    pagination?: PaginationInfo,
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      pagination,
    };
    return res.json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 400,
  ): Response {
    const response: ApiResponse = {
      success: false,
      error: message,
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data?: T, message?: string): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
    };
    return res.status(201).json(response);
  }
}
