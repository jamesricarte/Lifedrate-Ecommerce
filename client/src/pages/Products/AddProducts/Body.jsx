import React, { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [message, setMessage] = useState(null);
  const [isMessageVisible, setisMessageVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("image", productData.image);

    try {
      const response = await axios.post(`${API_URL}/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({ text: "Product has successfully added!", type: "success" });
      setisMessageVisible(true);

      setTimeout(() => setisMessageVisible(false), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      setMessage({ text: errorMessage, type: "error" });
      setisMessageVisible(true);

      setTimeout(() => setisMessageVisible(false), 3000);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center mt-28">
        <div
          className={`fixed top-0 left-1/2 -translate-x-1/2 py-1.5 px-2.5 rounded-md text-white z-50 opacity-0 pointer-events-none transition-all duration-[.6s] ease-[ease] ${
            isMessageVisible ? "opacity-100 top-[10%] pointer-events-auto" : ""
          } ${message?.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message?.text}
        </div>
        <form
          className="flex flex-col items-center gap-3 w-[400px] border rounded-lg p-12"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h3 className="font-bold text-xl">Add Product</h3>
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
          />
          <textarea
            className="border border-gray-400 rounded-md p-1 w-full"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <Button type="submit" variant="primary">
            Add Product
          </Button>
        </form>
      </div>
    </>
  );
};

export default Body;
