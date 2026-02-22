import express from "express";
import {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controller/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/cart
 * @desc    Add product to cart
 * @access  Private
 */
router.post("/", protect, addToCart);

/**
 * @route   GET /api/cart
 * @desc    Get logged-in user's cart
 * @access  Private
 */
router.get("/", protect, getMyCart);

/**
 * @route   PUT /api/cart
 * @desc    Update cart item quantity
 * @access  Private
 */
router.put("/", protect, updateCartItem);

/**
 * @route   DELETE /api/cart/:productId
 * @desc    Remove item from cart
 * @access  Private
 */
router.delete("/:productId", protect, removeFromCart);

/**
 * @route   DELETE /api/cart
 * @desc    Clear entire cart
 * @access  Private
 */
router.delete("/", protect, clearCart);

export default router;
