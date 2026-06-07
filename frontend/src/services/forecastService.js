import axios from "axios";

const API_URL =
  "https://inventraai-ai-inventory-management-system.onrender.com/api/forecast";

export const getForecast = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};