import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

/* ===========================
   USER - PLACE ORDER
=========================== */
export const placeOrder = async (orderData, token) => {
  const res = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

/* ===========================
   USER - GET MY ORDERS
=========================== */
export const getMyOrders = async (token) => {
  const res = await axios.get(`${API_URL}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* ===========================
   ADMIN - GET ALL ORDERS
=========================== */
export const getAllOrders = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* ===========================
   ADMIN - UPDATE ORDER STATUS
=========================== */
export const updateOrderStatus = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/${id}/status`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
