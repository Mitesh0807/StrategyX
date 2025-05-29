import { API_ENDPOINTS } from "@/lib/constants";
import type {
  ApiResponse,
  LoginCredentials,
  SignupData,
  User,
} from "@/lib/types";

import { apiClient } from "./api-client";

export class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    return apiClient.post<User>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async signup(data: SignupData): Promise<ApiResponse<User>> {
    return apiClient.post<User>(API_ENDPOINTS.AUTH.SIGNUP, data);
  }

  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  }
}

export const authService = new AuthService();
