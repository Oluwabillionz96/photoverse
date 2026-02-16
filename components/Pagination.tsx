import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Pagination = ({
  totalPages,
  setCurrentPage,
  currentPage,
}: {
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex w-full overflow-x-auto justify-center my-6 gap-2">
      {/* Previous Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          className="glass border-border/30 hover:border-primary/50 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border/30"
        >
          Prev
        </Button>
      </motion.div>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <div
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground"
            >
              ...
            </div>
          );
        }

        const isActive = page === currentPage;
        
        return (
          <motion.div
            key={page}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setCurrentPage(page as number)}
              variant={isActive ? "default" : "outline"}
              className={`w-10 h-10 p-0 ${
                isActive
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/50 border-0"
                  : "glass border-border/30 hover:border-primary/50 hover:bg-primary/10"
              }`}
            >
              {page}
            </Button>
          </motion.div>
        );
      })}

      {/* Next Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          className="glass border-border/30 hover:border-primary/50 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border/30"
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
};

export default Pagination;
