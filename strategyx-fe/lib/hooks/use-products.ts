import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants";
import type { PaginationParams } from "@/lib/types/api";
import type {
  CreateProductData,
  ProductFilters,
  UpdateProductData,
} from "@/lib/types/product";

import { productService } from "../services/product-service";
export function useProducts(
  filters: ProductFilters = {},
  pagination: PaginationParams,
) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST({ filters, pagination }),
    queryFn: () => productService.getProducts(filters, pagination),
  });
}
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductData) => productService.updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: () => productService.getCategories(),
  });
}
