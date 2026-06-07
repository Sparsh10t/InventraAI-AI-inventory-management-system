import axios from "axios";

const SALES_API =
  "http://localhost:8000/api/sales";

export const sellProduct = async (
  productId,
  quantitySold
) => {
   const token =
  localStorage.getItem("token");


  const response = await axios.post(
    `${SALES_API}/sell`,
    {
      productId,
      quantitySold,
    },
    {
      headers: {
  Authorization: `Bearer ${token}`,
}}
  );

  return response.data;
};

export const getSales = async () => {

   const token =
  localStorage.getItem("token");
  const response = await axios.get(
    SALES_API,
    {
      headers: {
  Authorization: `Bearer ${token}`,
}}
  );

  return response.data;
};