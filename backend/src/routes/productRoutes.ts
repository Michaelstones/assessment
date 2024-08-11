import { Router } from "express";
import { ProductController } from "../controller/productController";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post(
  "/products",
  authenticateJWT,
  authorizeAdmin,
  productController.addProduct
);
router.put(
  "/products/:id",
  authenticateJWT,
  authorizeAdmin,
  productController.updateProduct
);
router.delete(
  "/products/:id",
  authenticateJWT,
  authorizeAdmin,
  productController.deleteProduct
);

export default router;
