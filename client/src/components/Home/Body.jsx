import React from "react";
import SampleImage from "../../assets/img/sample_image.avif";

const Body = () => {
  return (
    <>
      <main>
        <div className="flex justify-center items-center mt-20">
          <div className="w-[38%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aut
            sed iure aperiam omnis asperiores, illo totam saepe nobis, ipsam
            fugiat inventore labore perspiciatis vitae expedita! Ducimus
            blanditiis iusto voluptates.
          </div>
          <div>
            <img className="w-96" src={SampleImage} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Body;
