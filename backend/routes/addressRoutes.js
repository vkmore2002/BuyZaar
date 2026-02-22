import express from "express";
import {
  addAddress,
  getUserAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} from "../controller/addressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Private - Get all addresses of logged-in user
router.get("/", protect, getUserAddresses);

// Private - Add new address
router.post("/", protect, addAddress);

// Private - Get single address
router.get("/:id", protect, getSingleAddress);

// Private - Update address
router.put("/:id", protect, updateAddress);

// Private - Delete address
router.delete("/:id", protect, deleteAddress);

export default router;
