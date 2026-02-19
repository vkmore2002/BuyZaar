import { registerUser, loginUser } from "../controller/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
