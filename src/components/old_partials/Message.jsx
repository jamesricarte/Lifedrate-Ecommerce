import { useState } from "react";

function Message({ items, heading, onSelectItem }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // const message = items.length === 0 ? <p>No items found </p> : null;

  // items = []

  const test = "";

  const getMessage = () => {
    return items.length === 0 ? <p>No items found </p> : null;
  };

  const handleCick = (e) => console.log(e);
  return (
    <>
      <h1 className="font-bold">{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul>
        {items.map((item, index) => (
          <li
            className={`cursor-pointer p-3 ${
              selectedIndex === index ? "bg-red-400 text-white" : "bg-slate-100"
            }`}
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Message;
