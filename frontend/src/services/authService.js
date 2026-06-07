import axios from "axios";

const API =
  "https://inventraai-ai-inventory-management-system.onrender.com/api/users";

export const registerUser = async (
  userData
) => {
  const response = await axios.post(
    `${API}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (
  userData
) => {
  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;
};

