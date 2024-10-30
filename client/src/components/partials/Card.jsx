import React from "react";
import Product1 from "../../assets/img/products/product_1.avif";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Card = () => {
  return (
    <>
      <div className="w-80 hover:opacity-80 cursor-pointer rounded-lg shadow-sm">
        <div className="bg-gray-100 rounded-t-lg">
          <img className="w-full" src={Product1} />
        </div>

        <div className="my-5 flex flex-col items-center">
          <h3 className="font-bold w-[94%]">Gatorade Shaker Bottle</h3>

          <div className="flex justify-between w-[94%]">
            <p className="text-sm">₱ 1,638.00</p>
            <AddShoppingCartIcon className="hover:opacity-75" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
