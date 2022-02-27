import React, { useState } from "react";
import { GetServerSideProps } from "next";

// Components
import ImageGrid from "../components/imageGrid";
import Layout from "../components/layout/Layout";
import Modal from "../components/Modal";
import { NEXT_URL } from "../config";

const Gallery = ({ pictures }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Layout title="Galleria">
      <section className="w-full flex flex-grow overflow-scroll bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="container mx-auto">
          <h1 className="text-4xl text-center my-4">Galleria</h1>

          <ImageGrid setSelectedImg={setSelectedImg} images={pictures} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${NEXT_URL}/api/gallery`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pictures: data, loading: !data ? true : false },
  };
};

export default Gallery;
