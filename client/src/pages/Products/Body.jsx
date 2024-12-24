import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center w-full mt-5 mb-20">
        <div className="w-[1330px] mb-8 flex text-sm items-center">
          <p>Sort By</p>
          <div className="flex gap-4 ml-3">
            <div className="p-1 text-white bg-orange-500 cursor-pointer hover:opacity-80">
              Relevance
            </div>

            <div className="flex gap-2">
              <div className="p-1 bg-gray-100 cursor-pointer hover:bg-orange-500 hover:text-white">
                Latest
              </div>
              <div className="p-1 bg-gray-100 cursor-pointer hover:bg-orange-500 hover:text-white">
                Top Sales
              </div>

              <select
                className="bg-gray-400 text-white p-[5px] cursor-pointer hover:opacity-80"
                name=""
                id=""
              >
                <option value="">Price</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <Card key={product._id} product={product} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Body;
