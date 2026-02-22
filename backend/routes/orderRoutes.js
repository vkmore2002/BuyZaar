import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../controller/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Private - Place new order
router.post("/", protect, placeOrder);

// Private - Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// Private - Get single order by ID
router.get("/:id", protect, getOrderById);

export default router;
