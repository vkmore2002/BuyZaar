import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

// Public - Get products (with optional category filter)
export const getProducts = async (categoryId = null) => {
  let url = API_URL;

  if (categoryId) {
    url += `?category=${categoryId}`;
  }

  const res = await axios.get(url);
  return res.data;
};

// Admin - Get all products
export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Admin - Create product
export const createProduct = async (formData, token) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Admin - Delete product
export const deleteProduct = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Admin - Update product
export const updateProduct = async (id, formData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
