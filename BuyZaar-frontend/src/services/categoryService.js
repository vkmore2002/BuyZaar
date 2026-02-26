import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = `${API_BASE}/api/categories`;

export const getAllCategories = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createCategory = async (name, token) => {
  const res = await axios.post(
    BASE_URL,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deleteCategory = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
