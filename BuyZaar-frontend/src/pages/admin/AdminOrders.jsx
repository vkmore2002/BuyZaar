import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";

function AdminOrders() {
  const { user } = useAuth();
  const token = user?.token;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(token);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { orderStatus: newStatus }, token);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order", err);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-[#7A2E0E]">Manage Orders</h2>
        <p className="text-sm text-gray-500">
          Review and update order statuses
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl p-4 shadow-sm border"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h4 className="font-medium">
                  Order ID:{" "}
                  <span className="text-sm text-gray-600">{order._id}</span>
                </h4>
                <p className="text-sm text-gray-600">
                  User: {order.user?.name}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <div className="font-semibold">₹{order.totalPrice}</div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Payment</p>
                  <div className="text-sm">
                    {order.paymentMethod} • {order.paymentStatus}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="px-3 py-2 rounded-md border border-gray-200 bg-white"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="my-3" />

            <div>
              <h5 className="font-medium mb-2">Items</h5>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm text-gray-700"
                  >
                    <div>{item.name}</div>
                    <div>
                      ₹{item.price} × {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
