import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

// Get current user's profile
export const getMyProfile = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Update current user's profile
export const updateMyProfile = async (profileData, token) => {
  const res = await axios.put(`${API_URL}/me`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
