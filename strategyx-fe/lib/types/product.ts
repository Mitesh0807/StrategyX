export interface Product {
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

export interface ProductFilters {
  productId?: string;
  name?: string;
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  category: string;
  price: number | string;
  quantity: number | string;
  image?: File | null;
}

export interface UpdateProductData extends CreateProductData {
  id: number;
}
