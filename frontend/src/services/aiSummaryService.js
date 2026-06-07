import axios from "axios";

export const getAISummary = async () => {
  const token = localStorage.getItem("token");

const response = await axios.get(
  "https://inventraai-ai-inventory-management-system.onrender.com/api/ai-summary",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

  return response.data;
};