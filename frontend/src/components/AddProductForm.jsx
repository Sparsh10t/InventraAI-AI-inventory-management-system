import { useState } from "react";
import axios from "axios";

const AddProductForm = ({ fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const token =
    localStorage.getItem("token");

  await axios.post(
    "http://localhost:8000/api/products/create",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchProducts();

  setFormData({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });

} catch (error) {
  console.log(error);
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.025] p-6 rounded-2xl shadow mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        Product Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

      </div>

      <button
        type="submit"
        className="mt-4 bg-black text-white px-6 py-3 rounded-xl"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;