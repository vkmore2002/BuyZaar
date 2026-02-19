import { protect } from "../middleware/authMiddleware.js";

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});
