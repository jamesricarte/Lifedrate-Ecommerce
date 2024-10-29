import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    { type = "text", placeholder, name, value, id, required, onChange },
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        ref={ref}
        className="border border-gray-400 rounded-md p-1 w-64"
      />
    );
  }
);

export default Input;
