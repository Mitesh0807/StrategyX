"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
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
  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));

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
            <SimpleSelect
              value={selectedCategory}
              onValueChange={(value) => setValue("category", value)}
              placeholder="Select category"
              options={categoryOptions}
              className={errors.category ? "border-red-500" : ""}
            />
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
