import type { Product } from "./product";
export type { User, LoginCredentials, SignupData } from "./auth";
export type {
  Product,
  ProductFilters,
  CreateProductData,
  UpdateProductData,
} from "./product";
export type { ApiResponse, PaginationParams, PaginatedResponse } from "./api";

export interface SerializedProduct {
  id: number;
  productId: string;
  name: string;
  image?: string | null;
  description: string;
  category: string;
  price: number;
  quantity: number;
  status: "In Stock" | "Out of Stock";
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SerializedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface SerializedProductsResponse {
  items: SerializedProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
