"use client";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ASSERT_BASE_URI } from "@/lib/constants";
import { SerializedProduct } from "@/lib/types";

interface ProductTableRowProps {
  product: SerializedProduct;
  onEdit: (product: SerializedProduct) => void;
  onDelete: (product: SerializedProduct) => void;
}

export function ProductTableRow({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  return (
    <tr key={product.id} className="hover:bg-gray-50">
      <td className="px-4 py-3 w-28 align-top">
        {product.image ? (
          <Image
            src={`${ASSERT_BASE_URI}${product.image}`}
            alt={product.name}
            width={20}
            height={20}
            quality={80}
            className="h-16 w-16 object-cover rounded border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="text-xs text-gray-500">No image</span>
        )}
      </td>
      <td className="px-4 py-3 text-sm font-mono text-gray-900 w-24 align-top">
        <div className="truncate" title={product.productId}>
          {product.productId}
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900 w-32 align-top">
        <div className="truncate" title={product.name}>
          {product.name}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 w-80 align-top">
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
      <td className="px-4 py-3 w-24 align-top">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 truncate">
          {product.category}
        </span>
      </td>
      <td className="px-4 py-3 text-sm font-mono text-gray-900 w-20 align-top">
        <div className="truncate">
          ${product?.price ? product?.price : "N/A"}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 text-center w-16 align-top">
        {product.quantity}
      </td>
      <td className="px-4 py-3 w-20 align-top">
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
      <td className="px-4 py-3 w-20 align-top">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product)}
            className="h-8 w-8 p-0"
            aria-label="Edit product"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            aria-label="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
