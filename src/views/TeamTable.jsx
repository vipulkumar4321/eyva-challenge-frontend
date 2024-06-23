import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const TeamTable = ({
  teamData,
  selected,
  setSelected,
  handleDeleteSingle,
  handleEdit,
}) => {
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = teamData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < teamData.length
                }
                checked={
                  teamData.length > 0 && selected.length === teamData.length
                }
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell className="hidden md:table-cell">Name</TableCell>
            <TableCell className="hidden md:table-cell">Status</TableCell>
            <TableCell className="hidden md:table-cell">
              Role
              <Tooltip title="Information about Role">
                <IconButton size="small" aria-label="help">
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              Email address
            </TableCell>
            <TableCell className="hidden md:table-cell">Teams</TableCell>
            <TableCell className="hidden md:table-cell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamData.map((row) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${row.id}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                className="block md:table-row"
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  className="block md:table-cell"
                >
                  <div className="flex items-center">
                    <Avatar alt={row.name} src={row.avatar} className="mr-2" />
                    <div>
                      <Typography variant="body1">{row.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        @{row.userName}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="block md:table-cell">
                  <Typography
                    variant="body2"
                    className={row.isActive ? "text-green-500" : "text-red-500"}
                  >
                    {row.isActive ? "Active" : "Inactive"}
                  </Typography>
                </TableCell>
                <TableCell className="block md:table-cell">
                  {row.role}
                </TableCell>
                <TableCell className="block md:table-cell">
                  {row.email}
                </TableCell>
                <TableCell className="block md:table-cell">
                  {row.teams.map((team, index) => (
                    <span
                      key={index}
                      className="mr-2 bg-gray-200 rounded-full px-2 py-1 text-sm"
                    >
                      {team}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="block md:table-cell">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteSingle(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
