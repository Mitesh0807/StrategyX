"use client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import { PAGINATION } from "@/lib/constants";

import { ProductFilters } from "../types";
type NuqsFilters = {
  page: number;
  limit: number;
  productId: string;
  name: string;
  category: string;
  status: string;
  minPrice: string;
  maxPrice: string;
};
export function useProductFilters() {
  const [filters, setFiltersRaw] = useQueryStates(
    {
      page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE),
      limit: parseAsInteger.withDefault(PAGINATION.DEFAULT_LIMIT),
      productId: parseAsString.withDefault(""),
      name: parseAsString.withDefault(""),
      category: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
    },
    {
      history: "push",
      shallow: false,
    },
  );
  const setFilters = (updates: Partial<ProductFilters>) => {
    const nuqsUpdates: Partial<NuqsFilters> = {};

    if (updates.productId !== undefined)
      nuqsUpdates.productId = updates.productId;
    if (updates.name !== undefined) nuqsUpdates.name = updates.name;
    if (updates.category !== undefined) nuqsUpdates.category = updates.category;
    if (updates.status !== undefined) nuqsUpdates.status = updates.status;
    if (updates.minPrice !== undefined)
      nuqsUpdates.minPrice = String(updates.minPrice);
    if (updates.maxPrice !== undefined)
      nuqsUpdates.maxPrice = String(updates.maxPrice);
    if (updates.page !== undefined) nuqsUpdates.page = Number(updates.page);

    setFiltersRaw(nuqsUpdates);
  };
  const isAnyFilterActive =
    filters.productId !== "" ||
    filters.name !== "" ||
    filters.category !== "" ||
    filters.status !== "" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "";

  const clearFilters = () => {
    setFilters({
      page: PAGINATION.DEFAULT_PAGE,
      productId: "",
      name: "",
      category: "",
      status: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return {
    filters,
    setFilters,
    isAnyFilterActive,
    clearFilters,
  };
}
