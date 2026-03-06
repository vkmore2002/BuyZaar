import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { getAddresses, addAddress } from "../services/addressService";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Form states
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New address form
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const [cartData, addressData] = await Promise.all([
          getCart(user.token),
          getAddresses(user.token),
        ]);

        setCart(cartData);
        setAddresses(addressData);

        // If no addresses, show new address form
        if (addressData.length === 0) {
          setShowNewAddressForm(true);
        } else {
          // Select first address by default
          setSelectedAddress(addressData[0]._id);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedAddress = await addAddress(newAddress, user.token);
      setAddresses([...addresses, addedAddress]);
      setSelectedAddress(addedAddress._id);
      setShowNewAddressForm(false);
      setNewAddress({
        fullName: "",
        phone: "",
        houseNo: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
    } catch (err) {
      console.error("Error adding address", err);
      alert("Failed to add address");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address");
      return;
    }

    setPlacingOrder(true);
    try {
      const orderData = {
        shippingAddress: selectedAddress,
        paymentMethod,
      };

      const order = await placeOrder(orderData, user.token);
      alert("Order placed successfully!");
      navigate("/dashboard"); // or to order confirmation page
    } catch (err) {
      console.error("Error placing order", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading checkout...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        Your cart is empty. Add some items to checkout.
      </div>
    );
  }

  const selectedAddressObj = addresses.find(
    (addr) => addr._id === selectedAddress,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#FBF7F3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#7A2E0E] mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#7A2E0E] mb-4">
              Shipping Address
            </h2>

            {addresses.length > 0 && !showNewAddressForm && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Address
                  </label>
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                  >
                    {addresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.fullName}, {addr.houseNo}, {addr.area},{" "}
                        {addr.city}, {addr.state} - {addr.postalCode}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="text-[#FF8A65] hover:underline"
                >
                  + Add New Address
                </button>
              </div>
            )}

            {(showNewAddressForm || addresses.length === 0) && (
              <form onSubmit={handleNewAddressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.fullName}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    House No / Building *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.houseNo}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, houseNo: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area / Street *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.area}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, area: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={newAddress.landmark}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, landmark: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.postalCode}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          postalCode: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A65] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-[#FF8A65] text-white px-6 py-2 rounded-lg hover:opacity-95 transition"
                  >
                    Save Address
                  </button>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#7A2E0E] mb-4">
              Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">Cash on Delivery</span>
              </label>
              {/* Add more payment methods here if needed */}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#7A2E0E] mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cart.items.map((item) => {
                const prod =
                  item.product && typeof item.product === "object"
                    ? item.product
                    : { _id: item.product, name: "", images: [] };

                return (
                  <div
                    key={prod._id}
                    className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                  >
                    <img
                      src={prod.images?.[0]}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{prod.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-[#FF8A65]">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Total */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>₹{cart.totalAmount}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-xl font-bold text-[#7A2E0E]">
                <span>Total:</span>
                <span>₹{cart.totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || !selectedAddress}
              className="w-full mt-6 bg-[#FF8A65] text-white py-3 rounded-lg font-semibold hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
