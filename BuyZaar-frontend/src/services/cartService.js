import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

// Add a product to the cart (requires authentication)
export const addToCart = async (productId, quantity = 1, token) => {
  const res = await axios.post(
    API_URL,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

// Retrieve current user's cart
export const getCart = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateCartItem = async (productId, quantity, token) => {
  const res = await axios.put(
    API_URL,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

export const removeCartItem = async (productId, token) => {
  const res = await axios.delete(`${API_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const clearCart = async (token) => {
  const res = await axios.delete(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
