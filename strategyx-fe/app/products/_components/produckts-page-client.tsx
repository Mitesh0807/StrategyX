"use client";

import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SimpleSelect } from "@/components/ui/simple-select";
import { PAGINATION } from "@/lib/constants";
import { useDeleteProduct } from "@/lib/hooks/use-products";
import { useToast } from "@/lib/hooks/use-toast";
import {
  SerializedProduct,
  SerializedProductsResponse,
  SerializedUser,
} from "@/lib/utils";

import { ProductFormDialog } from "./product-form-dialog";

interface ProductsPageClientProps {
  initialData: {
    products: SerializedProductsResponse;
    categories: string[];
    user: SerializedUser;
  };
}

export function ProductsPageClient({ initialData }: ProductsPageClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<SerializedProduct | null>(null);
  const { toast } = useToast();
  const deleteProductMutation = useDeleteProduct();

  const [filters, setFilters] = useQueryStates(
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

  const { products, categories } = initialData;
  const categoryOptions = [
    { value: "", label: "All categories" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const statusOptions = [
    { value: "", label: "All status" },
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  const handleEdit = (product: SerializedProduct) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (product: SerializedProduct) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProductMutation.mutateAsync(product.id);
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });

        window.location.reload();
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to delete product",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      productId: "",
      name: "",
      category: "",
      status: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            {products.total} products total
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label
                htmlFor="product-id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product ID
              </label>
              <Input
                placeholder="Filter by ID..."
                value={filters.productId}
                onChange={(e) =>
                  setFilters({ productId: e.target.value, page: 1 })
                }
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Input
                placeholder="Filter by name..."
                value={filters.name}
                onChange={(e) => setFilters({ name: e.target.value, page: 1 })}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <SimpleSelect
                value={filters.category}
                onValueChange={(value) =>
                  setFilters({ category: value, page: 1 })
                }
                placeholder="All categories"
                options={categoryOptions}
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <SimpleSelect
                value={filters.status}
                onValueChange={(value) =>
                  setFilters({ status: value, page: 1 })
                }
                placeholder="All status"
                options={statusOptions}
              />
            </div>
            <div>
              <label
                htmlFor="min-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Price
              </label>
              <Input
                type="number"
                placeholder="Min price..."
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ minPrice: e.target.value, page: 1 })
                }
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label
                htmlFor="max-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Price
              </label>
              <Input
                type="number"
                placeholder="Max price..."
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ maxPrice: e.target.value, page: 1 })
                }
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {products?.items?.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or add a new product
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-24">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-32">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-80">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-24">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-20">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-16">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-20">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products?.items?.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 w-24">
                        <div className="truncate" title={product.productId}>
                          {product.productId}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 w-32">
                        <div className="truncate" title={product.name}>
                          {product.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 w-80">
                        <div
                          className="break-words overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            lineHeight: "1.4",
                            maxHeight: "4.2em",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                          }}
                          title={product.description}
                        >
                          {product.description}
                        </div>
                      </td>
                      <td className="px-4 py-3 w-24">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 truncate">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 w-20">
                        <div className="truncate">
                          ${product?.price ? product?.price : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center w-16">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-3 w-20">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${
                            product.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 w-20">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {products?.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Page {products.page} of {products.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilters({ page: Math.max(1, products.page - 1) })
                }
                disabled={products.page <= 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600 px-2">
                {products.page} / {products.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setFilters({
                    page: Math.min(products.totalPages, products.page + 1),
                  })
                }
                disabled={products.page >= products.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={editingProduct}
        onSuccess={() => {
          setIsDialogOpen(false);
          setEditingProduct(null);

          window.location.reload();
        }}
      />
    </div>
  );
}
