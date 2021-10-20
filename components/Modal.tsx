import { motion } from "framer-motion";

function Modal({ selectedImg, setSelectedImg }) {
  const handleClick = (e) => {
    setSelectedImg(null);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClick}
    >
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        src={selectedImg}
        alt="enlarged pic"
        className="w-1/2"
      />
    </motion.div>
  );
}

export default Modal;
