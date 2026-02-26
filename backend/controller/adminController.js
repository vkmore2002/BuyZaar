import Product from "../model/productModel.js";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

/**
 * @desc    Get dashboard stats
 * @route   GET /api/admin/stats
 * @access  Admin
 */
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { getDashboardStats };
