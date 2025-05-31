"use client";
import { useState } from "react";

import { useDeleteProduct } from "@/lib/hooks/use-products";
import { useToast } from "@/lib/hooks/use-toast";
import { SerializedProduct } from "@/lib/types";

export function useProductActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<SerializedProduct | null>(null);
  const { toast } = useToast();
  const deleteProductMutation = useDeleteProduct();

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

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    window.location.reload();
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingProduct,
    handleEdit,
    handleDelete,
    handleAddNew,
    handleSuccess,
  };
}
