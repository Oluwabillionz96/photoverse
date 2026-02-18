import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <motion.button
      onClick={handleClick}
      className="absolute top-6 left-6 z-50 p-3 rounded-xl glass border border-border/30 hover:border-primary/50 transition-all duration-300 group"
      aria-label="Go back"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </motion.button>
  );
};

export default BackButton;
