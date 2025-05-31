"use client";
import { Input } from "@/components/ui/input";
import { SimpleSelect } from "@/components/ui/simple-select";
import { ProductFilters } from "@/lib/types/product";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (updates: Partial<ProductFilters>) => void;
  categories: string[];
}

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  categories,
}: ProductFiltersProps) {
  const categoryOptions = [
    { value: "", label: "All categories" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const statusOptions = [
    { value: "", label: "All status" },
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div>
          <label
            htmlFor="product-id"
            className={`block text-sm font-medium mb-1 ${
              filters.productId ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Product ID{" "}
            {filters.productId && (
              <span className="ml-1 text-xs text-blue-500">(Filled)</span>
            )}
          </label>
          <Input
            id="product-id"
            placeholder="Filter by ID..."
            value={filters.productId}
            onChange={(e) =>
              onFiltersChange({ productId: e.target.value, page: 1 })
            }
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className={`block text-sm font-medium mb-1 ${
              filters.name ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Name{" "}
            {filters.name && (
              <span className="ml-1 text-xs text-blue-500">(Filled)</span>
            )}
          </label>
          <Input
            id="name"
            placeholder="Filter by name..."
            value={filters.name}
            onChange={(e) => onFiltersChange({ name: e.target.value, page: 1 })}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className={`block text-sm font-medium mb-1 ${
              filters.category ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Category{" "}
            {filters.category && (
              <span className="ml-1 text-xs text-blue-500">(Selected)</span>
            )}
          </label>
          <SimpleSelect
            value={filters.category ?? ""}
            onValueChange={(value) =>
              onFiltersChange({ category: value, page: 1 })
            }
            placeholder="All categories"
            options={categoryOptions}
            className={filters.category ? "border-blue-500" : ""}
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className={`block text-sm font-medium mb-1 ${
              filters.status ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Status{" "}
            {filters.status && (
              <span className="ml-1 text-xs text-blue-500">(Selected)</span>
            )}
          </label>
          <SimpleSelect
            value={filters.status ?? ""}
            onValueChange={(value) =>
              onFiltersChange({ status: value, page: 1 })
            }
            placeholder="All status"
            options={statusOptions}
            className={filters.status ? "border-blue-500" : ""}
          />
        </div>

        <div>
          <label
            htmlFor="min-price"
            className={`block text-sm font-medium mb-1 ${
              filters.minPrice ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Min Price{" "}
            {filters.minPrice && (
              <span className="ml-1 text-xs text-blue-500">(Set)</span>
            )}
          </label>
          <Input
            id="min-price"
            type="number"
            placeholder="Min price..."
            value={filters.minPrice}
            onChange={(e) =>
              onFiltersChange({ minPrice: e.target.value, page: 1 })
            }
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="max-price"
            className={`block text-sm font-medium mb-1 ${
              filters.maxPrice ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Max Price{" "}
            {filters.maxPrice && (
              <span className="ml-1 text-xs text-blue-500">(Set)</span>
            )}
          </label>
          <Input
            id="max-price"
            type="number"
            placeholder="Max price..."
            value={filters.maxPrice}
            onChange={(e) =>
              onFiltersChange({ maxPrice: e.target.value, page: 1 })
            }
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}
