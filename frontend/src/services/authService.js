import axios from "axios";

const API =
  "http://localhost:8000/api/users";

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

