import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controller/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Private - Place new order
router.post("/", protect, placeOrder);

// Private - Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// Private - Get single order by ID
router.get("/:id", protect, getOrderById);

export default router;
