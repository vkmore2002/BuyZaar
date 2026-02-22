import Wishlist from "../model/wishlistModel.js";
import mongoose from "mongoose";

/*
@desc   Get logged-in user's wishlist
@route  GET /api/wishlist
@access Private
*/
export const getMyWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user_id: req.user._id,
    }).populate("items.product_id");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: req.user._id,
        name: "My Wishlist",
        items: [],
      });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Add product to wishlist
@route  POST /api/wishlist
@access Private
*/
export const addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let wishlist = await Wishlist.findOne({
      user_id: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: req.user._id,
        name: "My Wishlist",
        items: [],
      });
    }

    const alreadyExists = wishlist.items.find(
      (item) => item.product_id.toString() === product_id,
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.items.push({ product_id });

    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Remove product from wishlist
@route  DELETE /api/wishlist/:productId
@access Private
*/
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({
      user_id: req.user._id,
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product_id.toString() !== productId,
    );

    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Clear wishlist
@route  DELETE /api/wishlist
@access Private
*/
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user_id: req.user._id,
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
