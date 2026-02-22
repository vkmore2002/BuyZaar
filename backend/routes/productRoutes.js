import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/products
 * @access  Admin
 */
router.post("/", protect, adminOnly, createProduct);

/**
 * @route   GET /api/products
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @route   GET /api/products/:id
 * @access  Public
 */
router.get("/:id", getSingleProduct);

/**
 * @route   PUT /api/products/:id
 * @access  Admin
 */
router.put("/:id", protect, adminOnly, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
