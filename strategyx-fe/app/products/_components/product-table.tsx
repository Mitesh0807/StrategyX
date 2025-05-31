"use client";
import { Search } from "lucide-react";

import { SerializedProduct } from "@/lib/types";

import { ProductTableRow } from "./product-tableRow";

interface ProductTableProps {
  products: SerializedProduct[];
  onEdit: (product: SerializedProduct) => void;
  onDelete: (product: SerializedProduct) => void;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
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
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-28">
                Image
              </th>
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
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
