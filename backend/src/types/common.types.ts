export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface SortOptions {
  field?: string;
  order?: "ASC" | "DESC";
}

export interface FilterOptions {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}
