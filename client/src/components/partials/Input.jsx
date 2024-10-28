import React from "react";

const Input = ({ type = "text", placeholder, name, id, required }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      className="border border-gray-400 rounded-md p-1 w-64"
    />
  );
};

export default Input;
