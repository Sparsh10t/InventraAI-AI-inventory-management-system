import axios from "axios";

export const askAI = async (question) => {
  const response = await axios.post(
    "http://localhost:8000/api/chat",
    { question }
  );

  return response.data;
};