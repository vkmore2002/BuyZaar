import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from "../controller/subcategoryController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - Get all subcategories
router.get("/", getAllSubcategories);

// Admin - Create subcategory
router.post("/", protect, adminOnly, createSubcategory);

// Admin - Update subcategory
router.put("/:id", protect, adminOnly, updateSubcategory);

// Admin - Delete subcategory
router.delete("/:id", protect, adminOnly, deleteSubcategory);

export default router;
