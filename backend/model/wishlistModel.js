import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const wishlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one wishlist per user
    },

    name: {
      type: String,
      required: true,
      default: "My Wishlist",
      trim: true,
    },

    items: [wishlistItemSchema],
  },
  { timestamps: true },
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
