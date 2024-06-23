import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const RowsPerPageSelect = ({ rowsPerPage, handleRowsPerPageChange }) => {
  return (
    <div className="w-28">
      <FormControl fullWidth className="ml-4">
        <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
        <Select
          labelId="rows-per-page-label"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          label="Rows per page"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default RowsPerPageSelect;
