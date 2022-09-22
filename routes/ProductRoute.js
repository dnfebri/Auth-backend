import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/', verifyUser, getProducts);
router.get('/:id', verifyUser, getProductById);
router.post('/', verifyUser, createProduct);
router.patch('/:id', verifyUser, updateProduct);
router.delete('/:id', verifyUser, deleteProduct);

export default router;