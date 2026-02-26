import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

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
