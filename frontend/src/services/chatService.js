import axios from "axios";

export const askAI = async (question) => {
  const response = await axios.post(
    "https://inventraai-ai-inventory-management-system.onrender.com/api/chat",
    { question }
  );

  return response.data;
};