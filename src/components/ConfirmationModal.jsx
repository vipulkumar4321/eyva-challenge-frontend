import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const ConfirmationModal = ({ isOpen, onClose, text }) => {
  const handleBackdropClick = (event) => {
    // Close modal only if backdrop (outside modal content) is clicked
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} onClick={handleBackdropClick}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton size="small" aria-label="help">
          <TaskAltOutlinedIcon fontSize="small" />
        </IconButton>
        <p id="confirmation-modal-description">{text}</p>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
