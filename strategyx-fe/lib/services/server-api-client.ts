import { cookies } from "next/headers";

import type {
  ApiResponse,
  PaginationParams,
  Product,
  ProductFilters,
  User,
} from "@/lib/types";

class ServerApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;
    const sessionId = cookieStore.get("session-id")?.value;

    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...(sessionId && { "X-Session-ID": sessionId }),
        Cookie: cookieStore.toString(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error) {
      console.error("[ServerApiClient] Request Error:", {
        url,
        method: options.method || "GET",
        headers: config.headers,
        body: options.body,
        error,
      });
      throw error;
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await this.request<User>("/auth/me");

      return response;
    } catch (error) {
      console.error("[ServerApiClient] getCurrentUser Error:", error);
      throw error;
    }
  }

  async getProducts(
    filters: ProductFilters = {},
    pagination: PaginationParams,
  ): Promise<
    ApiResponse<{
      data: Product[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>
  > {
    try {
      const params = new URLSearchParams();

      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });

      const response = await this.request<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>(`/products?${params.toString()}`);

      return response;
    } catch (error) {
      console.error("[ServerApiClient] getProducts Error:", error);
      throw error;
    }
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    try {
      const response = await this.request<string[]>("/products/categories");

      return response;
    } catch (error) {
      console.error("[ServerApiClient] getCategories Error:", error);
      throw error;
    }
  }
}

export const serverApiClient = new ServerApiClient();
