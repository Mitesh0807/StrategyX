"use client";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProductsHeaderProps {
  onAddNew: () => void;
  onClearFilters: () => void;
  isAnyFilterActive: boolean;
  totalProducts: number;
}

export function ProductsHeader({
  onAddNew,
  onClearFilters,
  isAnyFilterActive,
  totalProducts,
}: ProductsHeaderProps) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Products</h2>
        <p className="text-gray-600">Manage your product inventory</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <Button onClick={onAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          <Button
            variant={isAnyFilterActive ? "secondary" : "outline"}
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          {totalProducts} products total
        </div>
      </div>
    </>
  );
}
