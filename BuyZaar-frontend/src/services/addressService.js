import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/addresses`;

// Add a new address
export const addAddress = async (addressData, token) => {
  const res = await axios.post(API_URL, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// Get all addresses for the user
export const getAddresses = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Update an address
export const updateAddress = async (id, addressData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// Delete an address
export const deleteAddress = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
