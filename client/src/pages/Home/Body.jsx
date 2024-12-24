import React from "react";
import SampleImage from "../../assets/img/sample_image.avif";

const Body = () => {
  return (
    <>
      <main className="flex justify-center">
        <div className="flex items-center justify-center mt-5 bg-green-200 w-[90%]">
          <div className="w-[38%]">
            <p>
              Lifedrate is an ipsum dolor sit amet consectetur adipisicing elit.
              Earum aut sed iure aperiam omnis asperiores, illo totam saepe
              nobis, ipsam fugiat inventore labore perspiciatis vitae expedita!
              Ducimus blanditiis iusto voluptates.
            </p>
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
