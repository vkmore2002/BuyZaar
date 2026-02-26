import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/dbConnection.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ------------------ MIDDLEWARE ------------------ */

// CORS configuration (works for both local & production)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite)
      process.env.FRONTEND_URL, // deployed frontend (Vercel)
    ],
    credentials: true,
  }),
);

app.use(express.json());

/* ------------------ ROUTES ------------------ */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

/* ------------------ TEST ROUTE ------------------ */

app.get("/", (req, res) => {
  res.send("Buyzaar API Running");
});

/* ------------------ SERVER ------------------ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
