"use client";
import { useProductActions } from "@/lib/hooks/use-product-actions";
import { useProductFilters } from "@/lib/hooks/use-product-filters";
import { SerializedProductsResponse, SerializedUser } from "@/lib/types/";

import { ProductFiltersComponent } from "./product-filters";
import { ProductFormDialog } from "./product-form-dialog";
import { ProductPagination } from "./product-pagination";
import { ProductTable } from "./product-table";
import { ProductsHeader } from "./products-header";

interface ProductsPageClientProps {
  initialData: {
    products: SerializedProductsResponse;
    categories: string[];
    user: SerializedUser;
  };
}

export function ProductsPageClient({ initialData }: ProductsPageClientProps) {
  const { products, categories } = initialData;
  const { filters, setFilters, isAnyFilterActive, clearFilters } =
    useProductFilters();
  const {
    isDialogOpen,
    setIsDialogOpen,
    editingProduct,
    handleEdit,
    handleDelete,
    handleAddNew,
    handleSuccess,
  } = useProductActions();

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  return (
    <div className="max-h-80vh bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductsHeader
          onAddNew={handleAddNew}
          onClearFilters={clearFilters}
          isAnyFilterActive={isAnyFilterActive}
          totalProducts={products.total}
        />

        <ProductFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
        />

        <ProductTable
          products={products?.items || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProductPagination
          currentPage={Number(products.page)}
          totalPages={products.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={editingProduct}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
