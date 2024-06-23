import React from "react";
import { Button, Pagination } from "@mui/material";

const PaginationControls = ({
  currentPage,
  handlePageChange,
  totalRows,
  rowsPerPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="mt-4 mb-4 flex space-x-2 justify-between items-center">
      <Button
        variant="contained"
        onClick={() => handlePageChange(null, Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
      <Button
        variant="contained"
        onClick={() =>
          handlePageChange(null, Math.min(currentPage + 1, totalPages))
        }
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
