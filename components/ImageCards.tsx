import React from "react";
import { motion } from "framer-motion";

const ImageCards = ({ image, setSelectedImg }) => {
  return (
    <motion.div
      layout
      whileHover={{ opacity: 1 }}
      onClick={() => setSelectedImg(image)}
      className=" h-64 shadow-lg opacity-75"
    >
      <motion.img
        src={image}
        alt=""
        className="h-full w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </motion.div>
  );
};

export default ImageCards;
