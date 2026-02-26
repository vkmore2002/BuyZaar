import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - Get all categories
router.get("/", getAllCategories);

// Admin - Create category
router.post("/", protect, adminOnly, createCategory);

// Admin - Update category
router.put("/:id", protect, adminOnly, updateCategory);

// Admin - Delete category
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
