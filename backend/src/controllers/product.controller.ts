import { Request, Response } from "express";
import { ProductService } from "@/services/product.service";
import { BaseController } from "./base.controller";

export class ProductController extends BaseController {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.productService.getProducts(
        req.query as any,
        req.user?.id,
      );

      res.set({
        "X-Total-Count": result.total.toString(),
        "X-Total-Pages": result.totalPages.toString(),
        "X-Current-Page": result.page.toString(),
        "X-Per-Page": result.limit.toString(),
      });
      const data = {
        data: result.items,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      };
      this.handleSuccess(res, data, "Products retrieved successfully", 200);
    } catch (error) {
      this.handleError(res, error, "Failed to retrieve products");
    }
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.createProduct(
        req.body,
        req.user!.id,
      );
      this.handleSuccess(res, product, "Product created successfully", 201);
    } catch (error) {
      this.handleError(res, error, "Failed to create product");
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.updateProduct(
        id,
        req.body,
        req.user!.id,
      );
      this.handleSuccess(res, product, "Product updated successfully");
    } catch (error) {
      this.handleError(res, error, "Failed to update product");
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      await this.productService.deleteProduct(id, req.user!.id);
      this.handleSuccess(res, null, "Product deleted successfully");
    } catch (error) {
      this.handleError(res, error, "Failed to delete product");
    }
  };

  getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.productService.getCategories();
      this.handleSuccess(res, categories, "Categories retrieved successfully");
    } catch (error) {
      this.handleError(res, error, "Failed to retrieve categories");
    }
  };
}
