import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

const Pagination = ({
  totalPages,
  setCurrentPage,
  currentPage,
}: {
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}) => {
  return (
    <div className="flex w-full overflow-hidden justify-center my-2 gap-3">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          className={`p-4 rounded-full bg-black/10  hover:bg-black/10 ${
            currentPage === index + 1 ? "text-white bg-blue-500" : "text-black"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
