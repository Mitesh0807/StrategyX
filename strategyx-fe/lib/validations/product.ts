import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") {
        const parsed = parseFloat(val);

        if (isNaN(parsed)) {
          throw new Error("Invalid price format");
        }
        return parsed;
      }
      return val;
    })
    .refine((val) => val > 0, { message: "Price must be greater than 0" }),
  quantity: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") {
        const parsed = parseInt(val, 10);

        if (isNaN(parsed)) {
          throw new Error("Invalid quantity format");
        }
        return parsed;
      }
      return val;
    })
    .refine((val) => val >= 0 && Number.isInteger(val), {
      message: "Quantity must be 0 or greater and a whole number",
    }),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  quantity: z.number().int().min(0, "Quantity must be 0 or greater"),
});

export const productFiltersSchema = z.object({
  productId: z.string().optional(),
  name: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["In Stock", "Out of Stock"]).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

export type ProductFormInput = z.input<typeof productFormSchema>;

export type ProductFormData = z.output<typeof productFormSchema>;

export type ProductData = z.infer<typeof productSchema>;
export type ProductFiltersData = z.infer<typeof productFiltersSchema>;
