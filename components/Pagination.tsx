import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
  return (
    <div className="flex w-full overflow-hidden justify-center my-2 gap-3">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <FaAngleLeft />
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <FaAngleRight />
      </Button>
    </div>
  );
};

export default Pagination;
