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
import upload from "@/config/multer.config";

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
  upload.single("image"),
  validationMiddleware(CreateProductDto),
  productController.createProduct,
);
router.put(
  "/:id",
  upload.single("image"),
  validationMiddleware(UpdateProductDto, true),
  productController.updateProduct,
);
router.get("/categories", productController.getCategories);
router.delete("/:id", productController.deleteProduct);

export { router as productRoutes };
