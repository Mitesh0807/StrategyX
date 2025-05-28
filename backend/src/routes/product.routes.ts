import { Router } from "express";
import { ProductController } from "@/controllers/product.controller";
import {
  validationMiddleware,
  queryValidationMiddleware,
} from "@/middleware/validation.middleware";
import { authMiddleware } from "@/middleware/auth.middleware";
import {
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
} from "@/dto/product.dto";

const router = Router();
const productController = new ProductController();

router.use(authMiddleware);

router.get(
  "/",
  queryValidationMiddleware(ProductQueryDto),
  productController.getProducts,
);
router.post(
  "/",
  validationMiddleware(CreateProductDto),
  productController.createProduct,
);
router.put(
  "/:id",
  validationMiddleware(UpdateProductDto, true),
  productController.updateProduct,
);
router.delete("/:id", productController.deleteProduct);

export { router as productRoutes };
