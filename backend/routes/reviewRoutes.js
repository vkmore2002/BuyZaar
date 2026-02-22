import express from "express";
import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controller/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - Get reviews for a product
router.get("/:productId", getProductReviews);

// Private - Add review
router.post("/", protect, addReview);

// Private - Update review
router.put("/:id", protect, updateReview);

// Private - Delete review
router.delete("/:id", protect, deleteReview);

export default router;
