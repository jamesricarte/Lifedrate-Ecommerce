import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // setCart((prevCart) => [...prevCart, product]);

    //Manual Version
    setCart((prevCart) => {
      const newCart = [];
      let isProductInTheCart = false;

      prevCart.forEach(function (element, index) {
        newCart.push(element);
      });

      newCart.forEach(function (element, index) {
        if (element.productId._id == product.productId._id) {
          element.quantity += product.quantity;
          isProductInTheCart = true;
          return;
        }
      });

      if (isProductInTheCart === false) {
        newCart.push(product);
      }
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
