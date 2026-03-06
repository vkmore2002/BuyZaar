import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all"); // all, processing, completed, cancelled

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const data = await getMyOrders(user.token);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getFilteredOrders = () => {
    if (filter === "all") return orders;
    return orders.filter((order) => order.orderStatus === filter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  const filteredOrders = getFilteredOrders();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#FBF7F3] min-h-screen">
      <div>
        <h1 className="text-4xl font-bold text-[#7A2E0E] mb-2">My Orders</h1>
        <p className="text-gray-600 mb-8">
          {filteredOrders.length === 0
            ? "You haven't placed any orders yet"
            : `You have ${filteredOrders.length} order${
                filteredOrders.length !== 1 ? "s" : ""
              }`}
        </p>

        {/* Filter Buttons */}
        {orders.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "all"
                  ? "bg-[#FF8A65] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter("processing")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "processing"
                  ? "bg-[#FF8A65] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilter("shipped")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "shipped"
                  ? "bg-[#FF8A65] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Shipped
            </button>
            <button
              onClick={() => setFilter("delivered")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "delivered"
                  ? "bg-[#FF8A65] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Delivered
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "cancelled"
                  ? "bg-[#FF8A65] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Cancelled
            </button>
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-gray-600 text-lg font-medium">No orders found</p>
            <p className="text-gray-500 mt-2">
              Start shopping to create your first order!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 bg-[#FF8A65] text-white px-6 py-2 rounded-lg hover:opacity-95 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                onClick={() =>
                  setSelectedOrder(
                    selectedOrder === order._id ? null : order._id,
                  )
                }
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono font-semibold text-gray-800">
                      {order._id.substring(0, 12)}...
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-[#FF8A65]">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium text-center ${getStatusColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                    <span
                      className={`text-sm font-medium text-center capitalize ${getPaymentStatusColor(
                        order.paymentStatus,
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Details (Expandable) */}
                {selectedOrder === order._id && (
                  <div className="p-6 bg-gray-50">
                    {/* Order Items */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#7A2E0E] mb-4">
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => {
                          const prod =
                            item.product && typeof item.product === "object"
                              ? item.product
                              : { _id: item.product, name: item.name };

                          return (
                            <div
                              key={idx}
                              className="flex gap-4 bg-white p-4 rounded-lg"
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-800">
                                  ₹{item.price * item.quantity}
                                </p>
                                <p className="text-sm text-gray-600">
                                  ₹{item.price} each
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#7A2E0E] mb-4">
                        Shipping Address
                      </h3>
                      <div className="bg-white p-4 rounded-lg text-gray-700 space-y-1">
                        <p className="font-medium">
                          {order.shippingAddress.fullName}
                        </p>
                        <p>{order.shippingAddress.houseNo}</p>
                        <p>{order.shippingAddress.area}</p>
                        <p>
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state} -
                          {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p className="pt-2 border-t text-sm">
                          Phone: {order.shippingAddress.phone}
                        </p>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium text-gray-800 capitalize">
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Payment Status</p>
                        <p
                          className={`font-medium capitalize ${getPaymentStatusColor(
                            order.paymentStatus,
                          )}`}
                        >
                          {order.paymentStatus}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Order Status</p>
                        <p className="font-medium text-gray-800 capitalize">
                          {order.orderStatus}
                        </p>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-[#7A2E0E] mb-4">
                        Order Timeline
                      </h3>
                      <div className="bg-white p-4 rounded-lg space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Ordered:</span>{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">Updated:</span>{" "}
                          {new Date(order.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Indicator */}
                <div className="hidden md:flex px-6 py-2 bg-gray-50 justify-center">
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      selectedOrder === order._id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
