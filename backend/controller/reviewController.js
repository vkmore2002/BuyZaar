import Review from "../model/reviewModel.js";
import Product from "../model/productModel.js";
import Order from "../model/orderModel.js";

/**
 * @desc    Add review to product
 * @route   POST /api/reviews
 * @access  Private
 */
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({
        message: "Product and rating are required",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user purchased the product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      "items.product": productId,
    });

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You can review only purchased products",
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    // Recalculate product rating
    const reviews = await Review.find({ product: productId });

    product.totalRatings = reviews.length;
    product.averageRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await product.save();

    res.status(201).json(review);
  } catch (error) {
    // Unique review error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Get reviews for a product
 * @route   GET /api/reviews/:productId
 * @access  Public
 */
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Update review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this review",
      });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    // Recalculate product rating
    const reviews = await Review.find({ product: review.product });

    const product = await Product.findById(review.product);

    product.totalRatings = reviews.length;
    product.averageRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await product.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this review",
      });
    }

    await review.deleteOne();

    // Recalculate product rating
    const reviews = await Review.find({ product: review.product });
    const product = await Product.findById(review.product);

    if (reviews.length === 0) {
      product.totalRatings = 0;
      product.averageRating = 0;
    } else {
      product.totalRatings = reviews.length;
      product.averageRating =
        reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
    }

    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { addReview, getProductReviews, updateReview, deleteReview };
