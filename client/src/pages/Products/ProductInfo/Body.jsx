import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [quantity, setQuantity] = useState(1);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const imageUrl = `${API_URL}/uploads/${product.image}`;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(
        "We're Sorry... We seem to have lost this page but we don't want to lose you."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await axios.post(`${API_URL}/cart`, {
        userId: user.id,
        productId: id,
        quantity,
      });
      setMessage({ text: response.data.message, type: "success" });
      setIsMessageVisible(true);

      setTimeout(() => setIsMessageVisible(false), 3000);
    } catch (error) {
      const erroMessage = error.response?.data?.message || error.message;

      setMessage({ text: erroMessage, type: "error" });
      setIsMessageVisible(true);

      setTimeout(() => setIsMessageVisible(false), 3000);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 py-1.5 px-2.5 rounded-md text-white z-50 opacity-0 pointer-events-none transition-all duration-[.6s] ease-[ease] ${
          isMessageVisible ? "opacity-100 top-[10%] pointer-events-auto" : ""
        } ${message?.type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        {message?.text}
      </div>

      <div className="flex justify-center">
        {loading ? null : error ? (
          <div className="mt-20 p-8 text-center text bg-orange-400 text-white">
            {error}
          </div>
        ) : (
          <div className="flex mt-20 rounded-md border mb-24">
            <div className="w-[500px] h-[700px]  bg-gray-100">
              <img className="w-full h-full object-contain" src={imageUrl} />
            </div>

            <div className="w-[500px] p-8">
              <h3 className="font-bold text-lg mb-4">{product.name}</h3>
              <p className="text-sm mb-12">{product.description}</p>
              <p className="text-sm">$ {product.price}</p>
              <div className="flex items-center mt-6">
                <p className="text-sm text-gray-600">Quantity</p>
                <Button
                  className="border px-3 py-0.5 ml-5 text-gray-600 hover:bg-gray-50"
                  onClick={() => quantity <= 1 || setQuantity(quantity - 1)}
                >
                  -
                </Button>
                <div className="px-4 py-1 border text-sm text-orange-600">
                  {quantity}
                </div>
                <Button
                  className="border px-3 py-0.5 text-gray-600 hover:bg-gray-50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                className="w-28 mt-12"
                variant="primary"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Body;