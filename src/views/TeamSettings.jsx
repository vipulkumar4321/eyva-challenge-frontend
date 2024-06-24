import React, { useState } from "react";
import { Button } from "@mui/material";
import TeamTable from "./TeamTable";
import DeleteDialog from "../components/DeleteDialog";
import PaginationControls from "../components/PaginationControls";
import RowsPerPageSelect from "../components/RowsPerPageSelect";
import SearchBox from "../components/SearchBox";
import ConfirmationModal from "../components/ConfirmationModal";

const TeamSettings = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("multiple");
  const [deleteId, setDeleteId] = useState(null);
  const [teamData, setTeamData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(teamData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("Done!");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSelected = () => {
    if (selected.length > 0) {
      setDeleteType("multiple");
      setOpen(true);
      setModalText("Users Successfully Deleted!");
    }
  };

  const handleDeleteSingle = (id) => {
    setDeleteType("single");
    setDeleteId(id);
    setOpen(true);
    setModalText("User Successfully Deleted!");
  };

  const handleConfirmDelete = () => {
    if (deleteType === "multiple") {
      const updatedTeamData = teamData.filter(
        (row) => !selected.includes(row.id)
      );
      setTeamData(updatedTeamData);
      setFilteredData(updatedTeamData);
      setSelected([]);
    } else {
      const updatedTeamData = teamData.filter((row) => row.id !== deleteId);
      setTeamData(updatedTeamData);
      setFilteredData(updatedTeamData);
      setSelected([]);
    }
    setOpen(false);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    setModalText(
      "Sorry, Edit is under development. user's ID: " + JSON.stringify(id)
    );
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // Function to handle search filtering
  const handleSearch = (searchTerm) => {
    const filtered = teamData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container mx-auto px-4">
      <div className="py-4 flex flex-col md:flex-row mb-4 md:mb-0 justify-between items-center">
        <div className="flex justify-between items-center">
          <p className="mr-4">Team members</p>
          <p className="mr-4">{filteredData.length} users</p>
          <RowsPerPageSelect
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
        <SearchBox handleSearch={handleSearch} />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white my-4 py-2 px-4 rounded-md"
          disabled={selected.length === 0} // Disable if no items selected
        >
          Delete Selected
        </Button>
      </div>
      <TeamTable
        teamData={currentRows}
        selected={selected}
        setSelected={setSelected}
        handleDeleteSingle={handleDeleteSingle}
        handleEdit={handleEdit}
      />
      <PaginationControls
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        totalRows={filteredData.length}
      />
      <DeleteDialog
        open={open}
        deleteType={deleteType}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        text={modalText}
      />
    </div>
  );
};

export default TeamSettings;
