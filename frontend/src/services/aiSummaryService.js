import axios from "axios";

export const getAISummary = async () => {
  const token = localStorage.getItem("token");

const response = await axios.get(
  "http://localhost:8000/api/ai-summary",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

  return response.data;
};