import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Product, User } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function serializeProduct(product: Product): SerializedProduct {
  return {
    ...product,
    createdAt: product.createdAt.toString(),
    updatedAt: product.updatedAt.toString(),
  };
}

export function serializeUser(user: User): SerializedUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export function serializeProductsResponse(response: {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}): SerializedProductsResponse {
  return {
    ...response,
    items: response.items.map(serializeProduct),
  };
}

export function deserializeDate(dateString: string): Date {
  return new Date(dateString);
}

export function formatSerializedDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Date(dateString).toLocaleDateString(undefined, options);
}
