import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busyItems, setBusyItems] = useState({}); // track individual operations

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const data = await getCart(user.token);
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    setBusyItems((b) => ({ ...b, [productId]: true }));
    try {
      const updated = await updateCartItem(productId, newQty, user.token);
      setCart(updated);
    } catch (err) {
      console.error("Error updating cart", err);
    } finally {
      setBusyItems((b) => {
        const c = { ...b };
        delete c[productId];
        return c;
      });
    }
  };

  const handleRemove = async (productId) => {
    setBusyItems((b) => ({ ...b, [productId]: true }));
    try {
      const updated = await removeCartItem(productId, user.token);
      setCart(updated);
    } catch (err) {
      console.error("Error removing item", err);
    } finally {
      setBusyItems((b) => {
        const c = { ...b };
        delete c[productId];
        return c;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#FBF7F3]">
      <h1 className="text-3xl font-bold text-[#7A2E0E] mb-6">
        Your Shopping Cart
      </h1>

      <div className="space-y-6">
        {cart.items.map((item) => {
          const prod =
            item.product && typeof item.product === "object"
              ? item.product
              : { _id: item.product, name: "", images: [] };
          const busy = busyItems[prod._id];

          return (
            <div
              key={prod._id}
              className="grid grid-cols-[auto,1fr,auto] items-center gap-4 bg-white p-4 rounded-xl shadow-md"
            >
              <img
                src={prod.images?.[0]}
                alt={prod.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="space-y-1">
                <h2 className="text-lg font-medium text-gray-800">
                  {prod.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    disabled={busy}
                    onClick={() =>
                      handleQuantityChange(prod._id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white rounded hover:bg-opacity-90 transition disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    disabled={busy}
                    onClick={() =>
                      handleQuantityChange(prod._id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white rounded hover:bg-opacity-90 transition disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <button
                  disabled={busy}
                  onClick={() => handleRemove(prod._id)}
                  className="text-red-500 text-sm hover:underline disabled:opacity-50 mt-2"
                >
                  Remove
                </button>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-[#FF8A65]">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-2xl font-bold text-[#7A2E0E]">
          Total: ₹{cart.totalAmount}
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-[#FF8A65] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-95 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
