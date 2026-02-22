import Product from "../model/productModel.js";
import Subcategory from "../model/subcategoryModel.js";

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Admin
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      longDescription,
      price,
      discountPrice,
      stock,
      images,
      subcategory,
    } = req.body;

    if (
      !name ||
      !shortDescription ||
      !longDescription ||
      price === undefined ||
      stock === undefined ||
      !images ||
      !subcategory
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Check if subcategory exists
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
      price,
      discountPrice,
      stock,
      images,
      subcategory,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("subcategory", "name")
      .select("-__v");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
      .populate("subcategory", "name")
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
      images,
      subcategory,
    } = req.body;

    if (name) product.name = name;
    if (shortDescription) product.shortDescription = shortDescription;
    if (longDescription) product.longDescription = longDescription;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock !== undefined) product.stock = stock;
    if (images) product.images = images;

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
