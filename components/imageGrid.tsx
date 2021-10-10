import React from "react";
import useFirestore from "../lib/hooks/useFirestore";
import ImageCards from "./ImageCards";


const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2 my-8 mx-4 sm:mx-0">
      {docs &&
        docs.map((doc) => (
          <ImageCards
            setSelectedImg={setSelectedImg}
            image={doc}
            key={doc.id}
          />
        ))}
    </div>
  );
};

export default ImageGrid;
