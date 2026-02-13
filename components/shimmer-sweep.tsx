import { motion } from "framer-motion";

const ShimmerSweep = ({
  delay,
  duration,
  via,
  repeatDelay,
}: {
  delay?: number;
  via: string;
  duration: number;
  repeatDelay: number;
}) => {
  return (
    <motion.div
      className={`absolute inset-0 bg-linear-to-r from-transparent via-${via} to-transparent`}
      animate={{
        x: ["-100%", "200%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatDelay,
      }}
    />
  );
};

export default ShimmerSweep;
