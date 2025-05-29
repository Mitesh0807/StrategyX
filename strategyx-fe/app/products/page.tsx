import { Suspense } from "react";

import { requireAuth } from "@/lib/auth/server-auth";
import { PAGINATION } from "@/lib/constants";
import { serverApiClient } from "@/lib/services/server-api-client";
import type { ProductFilters } from "@/lib/types";
import { SerializedProductsResponse, SerializedUser } from "@/lib/utils";

import { ProductsPageClient } from "./_components/produckts-page-client";
interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    productId?: string;
    name?: string;
    category?: string;
    status?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

async function ProductsData({ searchParams }: ProductsPageProps) {
  const parsedParams = await searchParams;

  const user = await requireAuth();

  const page = parsedParams.page
    ? Number.parseInt(parsedParams.page, 10)
    : PAGINATION.DEFAULT_PAGE;
  const limit = parsedParams.limit
    ? Number.parseInt(parsedParams.limit, 10)
    : PAGINATION.DEFAULT_LIMIT;

  const filters: ProductFilters = {
    productId: parsedParams.productId || undefined,
    name: parsedParams.name || undefined,
    category: parsedParams.category || undefined,
    status: (parsedParams.status as "In Stock" | "Out of Stock") || undefined,
    minPrice: parsedParams.minPrice
      ? Number.parseFloat(parsedParams.minPrice)
      : undefined,
    maxPrice: parsedParams.maxPrice
      ? Number.parseFloat(parsedParams.maxPrice)
      : undefined,
  };

  const [productsResponse, categoriesResponse] = await Promise.all([
    serverApiClient.getProducts(filters, { page, limit }),
    serverApiClient.getCategories(),
  ]);

  if (!productsResponse.data || !categoriesResponse.data) {
    throw new Error("Failed to fetch data");
  }

  const serializedData: {
    products: SerializedProductsResponse;
    categories: string[];
    user: SerializedUser;
  } = {
    products: {
      items: productsResponse?.data?.data?.map((product) => ({
        ...product,
        createdAt: product.createdAt.toString(),
        updatedAt: product.updatedAt.toString(),
      })),
      total: productsResponse.data.total,
      page: productsResponse.data.page,
      limit: productsResponse.data.limit,
      totalPages: productsResponse.data.totalPages,
    },
    categories: categoriesResponse.data,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };

  return <ProductsPageClient initialData={serializedData} />;
}

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <span className="ml-2">Loading products...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage(props: ProductsPageProps) {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsData {...props} />
    </Suspense>
  );
}
