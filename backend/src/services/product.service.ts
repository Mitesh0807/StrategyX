import { AppDataSource } from "@/config/database";
import { Product } from "@/entities/Product.entity";
import {
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
} from "@/dto/product.dto";
import { BaseService } from "./base.service";
import { FindManyOptions, Like, Between } from "typeorm";
import { logger } from "@/utils/logger.util";

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ProductService extends BaseService<Product> {
  constructor() {
    super(AppDataSource.getRepository(Product));
  }

  async createProduct(
    createProductDto: CreateProductDto,
    userId: number,
  ): Promise<Product> {
    const productCount = await this.repository.count();
    const productId = `PRD${String(productCount + 1).padStart(3, "0")}`;

    const product = this.repository.create({
      ...createProductDto,
      productId,
      userId,
    });

    return this.repository.save(product);
  }

  async getProducts(
    queryDto: ProductQueryDto,
    userId?: number,
  ): Promise<PaginatedResult<Product>> {
    const {
      productId,
      name,
      category,
      status,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = queryDto;

    const where: any = {};

    if (productId) {
      where.productId = Like(`%${productId}%`);
    }

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (category) {
      where.category = Like(`%${category}%`);
    }

    if (status) {
      where.status = status;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = Between(minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER);
    }

    const options: FindManyOptions<Product> = {
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
      relations: ["user"],
    };

    const [items, total] = await this.repository.findAndCount(options);
    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    userId: number,
  ): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found or access denied");
    }

    Object.assign(product, { ...updateProductDto, userId });
    return this.repository.save(product);
  }

  async deleteProduct(id: number, userId: number): Promise<void> {
    const product = await this.repository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found or access denied");
    }

    await this.repository.remove(product);
  }

  async getCategories(): Promise<string[]> {
    const result = await this.repository
      .createQueryBuilder("product")
      .select("DISTINCT product.category", "category")
      .getRawMany();

    return result.map((item) => item.category);
  }
  async findExistingProduct(
    name: string,
    userId: number,
  ): Promise<Product | null> {
    return this.repository.findOneBy({ name });
  }
}
