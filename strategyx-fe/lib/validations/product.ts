import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  quantity: z.number().int().min(0, 'Quantity must be 0 or greater'),
  image: z.instanceof(File).optional().nullable(),
});

export const productFiltersSchema = z.object({
  productId: z.string().optional(),
  name: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['In Stock', 'Out of Stock']).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductFiltersData = z.infer<typeof productFiltersSchema>;
