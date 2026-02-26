import Product from "../model/productModel.js";
import Subcategory from "../model/subcategoryModel.js";

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Admin
 */

const createProduct = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  try {
    const {
      name,
      shortDescription,
      longDescription,
      price,
      discountPrice,
      stock,
      subcategory,
    } = req.body;

    // Get image URLs from Cloudinary (multer middleware)
    const imageUrls = req.files?.map((file) => file.path);

    if (
      !name ||
      !shortDescription ||
      !longDescription ||
      price === undefined ||
      stock === undefined ||
      !subcategory ||
      !imageUrls ||
      imageUrls.length === 0
    ) {
      return res.status(400).json({
        message: "All required fields including images must be provided",
      });
    }

    const existingSubcategory = await Subcategory.findById(subcategory);
    if (!existingSubcategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }

    const product = await Product.create({
      name,
      shortDescription,
      longDescription,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stock: Number(stock),
      images: imageUrls,
      subcategory,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR MESSAGE:", error.message);
    console.log("STACK:", error.stack);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all products (with optional category filter)
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      const subcategories = await Subcategory.find({ category });

      if (subcategories.length === 0) {
        return res.status(200).json([]);
      }

      const subcategoryIds = subcategories.map((sub) => sub._id);
      filter.subcategory = { $in: subcategoryIds };
    }

    const products = await Product.find(filter)
      .populate({
        path: "subcategory",
        populate: { path: "category" },
      })
      .select("-__v");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: "subcategory",
        populate: { path: "category" },
      })
      .select("-__v");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const {
      name,
      shortDescription,
      longDescription,
      price,
      discountPrice,
      stock,
      subcategory,
    } = req.body;

    if (name) product.name = name;
    if (shortDescription) product.shortDescription = shortDescription;
    if (longDescription) product.longDescription = longDescription;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock !== undefined) product.stock = stock;

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => file.path);
      product.images = imageUrls;
    }

    if (subcategory) {
      const existingSubcategory = await Subcategory.findById(subcategory);
      if (!existingSubcategory) {
        return res.status(404).json({
          message: "Subcategory not found",
        });
      }
      product.subcategory = subcategory;
    }

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
