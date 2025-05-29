"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimpleDialog } from "@/components/ui/simple-dialog";
import { SimpleSelect } from "@/components/ui/simple-select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCategories,
  useCreateProduct,
  useUpdateProduct,
} from "@/lib/hooks/use-products";
import { useToast } from "@/lib/hooks/use-toast";
import {
  type ProductFormInput,
  productFormSchema,
} from "@/lib/validations/product";

interface SerializedProduct {
  id: number;
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  status: "In Stock" | "Out of Stock";
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: SerializedProduct | null;
  onSuccess: () => void;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductFormDialogProps) {
  const { toast } = useToast();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const { data: categoriesResponse } = useCategories();

  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
  });

  const categories = categoriesResponse?.data || [];
  const categoryOptions = [
    ...categories.map((cat) => ({ value: cat, label: cat })),
    { value: "__add_custom__", label: "➕ Add Custom Category" },
  ];

  useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price.toString(),
          quantity: product.quantity.toString(),
        });
      } else {
        reset({
          name: "",
          description: "",
          category: "",
          price: "",
          quantity: "",
        });
      }

      setIsAddingCustomCategory(false);
      setCustomCategory("");
    }
  }, [open, product, reset]);

  const onSubmit = async (data: ProductFormInput) => {
    productFormSchema.parse(data);

    try {
      const validatedData = productFormSchema.parse(data);

      if (product) {
        await updateProductMutation.mutateAsync({
          ...validatedData,
          id: product.id,
        });
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await createProductMutation.mutateAsync(validatedData);
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Operation failed",
        variant: "destructive",
      });
    }
  };

  const selectedCategory = watch("category");
  const isLoading =
    createProductMutation.isPending || updateProductMutation.isPending;

  const handleCategoryChange = (value: string) => {
    if (value === "__add_custom__") {
      setIsAddingCustomCategory(true);
      setCustomCategory("");
    } else {
      setValue("category", value);
      setIsAddingCustomCategory(false);
    }
  };

  const handleCustomCategorySubmit = () => {
    if (customCategory.trim()) {
      setValue("category", customCategory.trim());
      setIsAddingCustomCategory(false);
      setCustomCategory("");
    }
  };

  const handleCustomCategoryCancel = () => {
    setIsAddingCustomCategory(false);
    setCustomCategory("");
  };

  const handleCustomCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomCategorySubmit();
    } else if (e.key === "Escape") {
      handleCustomCategoryCancel();
    }
  };

  return (
    <SimpleDialog
      open={open}
      onOpenChange={onOpenChange}
      title={product ? "Edit Product" : "Add New Product"}
      description={
        product
          ? "Update the product information below."
          : "Fill in the details to create a new product."
      }
      dialogPanelClassName="max-w-5xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            {isAddingCustomCategory ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    onKeyDown={handleCustomCategoryKeyPress}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCustomCategorySubmit}
                    disabled={!customCategory.trim()}
                    className="px-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCustomCategoryCancel}
                    className="px-3"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Press Enter to add or Escape to cancel
                </p>
              </div>
            ) : (
              <>
                <SimpleSelect
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  placeholder="Select category"
                  options={categoryOptions}
                  className={errors.category ? "border-red-500" : ""}
                />
                {selectedCategory && selectedCategory !== "__add_custom__" && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-sm text-blue-700">
                      Selected:{" "}
                      <span className="font-medium">{selectedCategory}</span>
                    </p>
                  </div>
                )}
              </>
            )}
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            rows={3}
            {...register("description")}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price")}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-sm text-red-600 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              placeholder="0"
              {...register("quantity")}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-sm text-red-600 mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </SimpleDialog>
  );
}
