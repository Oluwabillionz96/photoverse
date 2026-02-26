import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <CgSpinnerAlt />
    </motion.div>
  );
};

export default Spinner;
