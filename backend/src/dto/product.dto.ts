import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { ProductStatus } from "@/entities/Product.entity";

export class CreateProductDto {
  @IsString()
  @MaxLength(100, { message: "Product name must not exceed 100 characters" })
  name: string;

  @IsString()
  @MaxLength(1000, { message: "Description must not exceed 1000 characters" })
  description: string;

  @IsString()
  @MaxLength(50, { message: "Category must not exceed 50 characters" })
  category: string;

  @IsNumber({}, { message: "Price must be a valid number" })
  @Min(0, { message: "Price must be non-negative" })
  @Type(() => Number)
  price: number;

  @IsNumber({}, { message: "Quantity must be a valid number" })
  @Min(0, { message: "Quantity must be non-negative" })
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Product name must not exceed 100 characters" })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: "Description must not exceed 1000 characters" })
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Category must not exceed 50 characters" })
  category?: string;

  @IsOptional()
  @IsNumber({}, { message: "Price must be a valid number" })
  @Min(0, { message: "Price must be non-negative" })
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: "Quantity must be a valid number" })
  @Min(0, { message: "Quantity must be non-negative" })
  @Type(() => Number)
  quantity?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}
