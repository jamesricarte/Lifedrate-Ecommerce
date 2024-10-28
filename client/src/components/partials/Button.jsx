import React from "react";

const Button = ({ children = "Button", variant, className }) => {
  const styles = {
    primary:
      "bg-orange-400 px-2 py-1 rounded-md text-white text-base hover:bg-orange-500 hover:opacity-90",
    secondary: "px-2 py-[3px] rounded-md text-base border hover:bg-cyan-700",
    success: "",
    danger: "",
  };
  return (
    <button className={`${styles[variant]} ${className}`}>{children}</button>
  );
};

export default Button;
