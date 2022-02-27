import React from "react";
import useFirestore from "../lib/hooks/useFirestore";
import ImageCards from "./ImageCards";

const ImageGrid = ({ setSelectedImg, images }) => {
  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 my-8  ">
      {images &&
        images.map((doc) => (
          <ImageCards
            setSelectedImg={setSelectedImg}
            image={doc.image}
            key={doc._id}
          />
        ))}
    </div>
  );
};

export default ImageGrid;
