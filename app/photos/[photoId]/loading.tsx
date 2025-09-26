"use client"
import { motion } from "framer-motion";

const LoadingPhoto = () => {
  return (
    <div className=" w-full h-full grid place-items-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className=" w-32 h-32 border-8 rounded-full border-b-blue-500 border-l-blue-500 border-t-green-500 border-r-green-500"
      ></motion.div>
    </div>
  );
};

export default LoadingPhoto;
