import express from "express";
import {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controller/wishlistController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Private - Get logged-in user's wishlist
router.get("/", protect, getMyWishlist);

// Private - Add product to wishlist
router.post("/", protect, addToWishlist);

// Private - Remove product from wishlist
router.delete("/:productId", protect, removeFromWishlist);

// Private - Clear entire wishlist
router.delete("/", protect, clearWishlist);

export default router;
