import { API_ENDPOINTS } from "@/lib/constants";
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/lib/types/api";
import type {
  CreateProductData,
  Product,
  ProductFilters,
  UpdateProductData,
} from "@/lib/types/product";

import { apiClient } from "./api-client";

export class ProductService {
  async getProducts(
    filters: ProductFilters = {},
    pagination: PaginationParams,
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams();

    params.append("page", pagination.page.toString());
    params.append("limit", pagination.limit.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });

    return apiClient.get<PaginatedResponse<Product>>(
      `${API_ENDPOINTS.PRODUCTS.BASE}?${params.toString()}`,
    );
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  }

  async createProduct(data: CreateProductData): Promise<ApiResponse<Product>> {
    return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS.BASE, data);
  }

  async updateProduct(data: UpdateProductData): Promise<ApiResponse<Product>> {
    return apiClient.put<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(data.id), data);
  }

  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>(API_ENDPOINTS.CATEGORIES);
  }
}

export const productService = new ProductService();
