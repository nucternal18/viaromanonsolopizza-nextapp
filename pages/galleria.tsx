import React, { useState } from "react";

import ImageGrid from "../components/imageGrid";
import Layout from "../components/layout/Layout";
import Modal from "../components/Modal";

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Layout title="Galleria">
      <section className="w-full flex flex-grow overflow-scroll">
        <div className="container mx-auto">
          <h1 className="text-4xl text-center my-4">Galleria</h1>

          <ImageGrid setSelectedImg={setSelectedImg} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
