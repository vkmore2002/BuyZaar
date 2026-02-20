import express from "express";
import {
  getMyProfile,
  getAllUsers,
  updateMyProfile,
  deleteUserById,
} from "../controller/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's profile
router.get("/me", protect, getMyProfile);

// Update logged-in user's profile
router.put("/me", protect, updateMyProfile);

// Get all users (Admin only)
router.get("/", protect, adminOnly, getAllUsers);

// Delete user (Admin only)
router.delete("/:id", protect, adminOnly, deleteUserById);

export default router;
