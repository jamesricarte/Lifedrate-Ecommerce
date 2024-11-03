import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const API_URL = import.meta.env.VITE_API_URL;

const Card = ({ product }) => {
  const imageUrl = `${API_URL}/${product.image}`;

  return (
    <>
      <div className="w-80 hover:opacity-80 cursor-pointer rounded-lg border border-gray-200">
        <div className="bg-gray-100 rounded-t-lg">
          <img
            className="w-full h-80 object-cover rounded-lg"
            src={imageUrl}
            alt={product.name}
          />
        </div>

        <div className="my-5 flex flex-col items-center">
          <h3 className="font-bold w-[94%] h-14">{product.name}</h3>

          <p className="w-[94%] text-sm h-14">{product.description}</p>

          <div className="flex justify-between w-[94%]">
            <p className="text-sm">₱ {product.price.toFixed(2)}</p>
            <AddShoppingCartIcon className="hover:opacity-75" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
