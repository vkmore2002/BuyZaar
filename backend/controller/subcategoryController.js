import Subcategory from "../model/subcategoryModel.js";
import Category from "../model/categoryModel.js";

/**
 * @desc    Create new subcategory
 * @route   POST /api/subcategories
 * @access  Admin
 */
const createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category are required",
      });
    }

    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({
        message: "Parent category not found",
      });
    }

    const subcategory = await Subcategory.create({
      name,
      category,
    });

    res.status(201).json(subcategory);
  } catch (error) {
    console.log(error); // 👈 add this
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all subcategories
 * @route   GET /api/subcategories
 * @access  Public
 */
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category", "name")
      .select("-__v");

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Update subcategory
 * @route   PUT /api/subcategories/:id
 * @access  Admin
 */
const updateSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }

    if (name) subcategory.name = name;

    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(404).json({
          message: "Parent category not found",
        });
      }
      subcategory.category = category;
    }

    const updatedSubcategory = await subcategory.save();

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Delete subcategory
 * @route   DELETE /api/subcategories/:id
 * @access  Admin
 */
const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createSubcategory,
  getAllSubcategories,
  updateSubcategory,
  deleteSubcategory,
};
