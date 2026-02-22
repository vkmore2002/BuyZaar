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

// Private - Get logged-in user's cart
router.get("/", protect, getMyCart);

// Private - Add product to cart
router.post("/", protect, addToCart);

// Private - Update cart item quantity
router.put("/", protect, updateCartItem);

// Private - Remove item from cart
router.delete("/:productId", protect, removeFromCart);

// Private - Clear entire cart
router.delete("/", protect, clearCart);

export default router;
