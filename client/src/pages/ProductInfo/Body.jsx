import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const imageUrl = `${API_URL}/uploads/${product.image}`;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
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
      const response = await axios.post(`${API_URL}/cart`);
    } catch (error) {}
  };

  return (
    <>
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
              <Button className="w-28 mt-12" variant="primary">
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
