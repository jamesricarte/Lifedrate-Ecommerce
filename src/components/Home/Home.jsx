import React from "react";
import Nav from "../Nav/Nav";
import Body from "./Body";

const Home = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <Nav></Nav>
        <Body></Body>
      </div>
    </>
  );
};

export default Home;
