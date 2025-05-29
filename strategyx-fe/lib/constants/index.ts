export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  PRODUCTS: {
    BASE: "/products",
    BY_ID: (id: number) => `/products/${id}`,
  },
  CATEGORIES: "/prodcuts/categories",
} as const;

export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"],
  },
  PRODUCTS: {
    ALL: ["products"],
    LIST: (filters: any) => ["products", filters],
    BY_ID: (id: number) => ["products", id],
  },
  CATEGORIES: ["categories"],
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCTS: "/products",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const PRODUCT_STATUS = {
  IN_STOCK: "In Stock",
  OUT_OF_STOCK: "Out of Stock",
} as const;
