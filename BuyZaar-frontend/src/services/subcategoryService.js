import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/subcategories`;

// Get all subcategories (Public)
export const getAllSubcategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create subcategory (Admin)
export const createSubcategory = async (data, token) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete subcategory (Admin)
export const deleteSubcategory = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
