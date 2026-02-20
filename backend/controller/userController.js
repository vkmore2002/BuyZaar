import User from "../model/userModel.js";

/**
 * @desc    Get logged in user profile
 * @route   GET /api/users/me
 * @access  Private
 */
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc    Update logged in user profile
 * @route   PUT /api/users/me
 * @access  Private
 */
const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent role update
    if (req.body.role || req.body.isEmailVerified) {
      return res.status(400).json({
        message: "Role and email verification status cannot be updated ",
      });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.profileImage = req.body.profileImage || user.profileImage;

    user.updatedAt = Date.now();

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc    Delete user by ID (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Admin
 */
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getMyProfile, getAllUsers, updateMyProfile, deleteUserById };
