import { Request, Response } from "express";
import { AuthService } from "@/services/auth.service";
import { CookieUtil } from "@/utils/cookie.util";
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, tokens } = await this.authService.login(req.body);

      CookieUtil.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

      this.handleSuccess(res, user, "Login successful");
    } catch (error) {
      this.handleError(res, error, "Login failed");
    }
  };

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, tokens } = await this.authService.signup(req.body);

      CookieUtil.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

      this.handleSuccess(res, user, "User created successfully", 201);
    } catch (error) {
      this.handleError(res, error, "Signup failed");
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      CookieUtil.clearAuthCookies(res);
      this.handleSuccess(res, null, "Logout successful");
    } catch (error) {
      this.handleError(res, error, "Logout failed");
    }
  };

  getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      this.handleSuccess(res, req.user);
    } catch (error) {
      this.handleError(res, error, "Failed to get user profile");
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken =
        req.signedCookies.refreshToken || req.cookies.refreshToken;

      if (!refreshToken) {
        this.handleError(
          res,
          new Error("Refresh token required"),
          "Refresh token required",
        );
        return;
      }

      const tokens = await this.authService.refreshToken(refreshToken);
      CookieUtil.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

      this.handleSuccess(res, null, "Token refreshed successfully");
    } catch (error) {
      this.handleError(res, error, "Token refresh failed");
    }
  };
}
