import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";

import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên món",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Giá",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Loại",
  },
  {
    id: "describe",
    numeric: false,
    disablePadding: false,
    label: "Mô tả",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "Action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Menu = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("category");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [menuId, setMenuId] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setMenuId(e);
  };
  const [menus, setMenus] = useState([]);

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Danh sách Món
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Create">
              <IconButton component={Link} to="/menus/create">
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  async function getMenus() {
    const res = await axios.get("http://localhost:8000/menus");
    setMenus(res.data.menu);
  }
  useEffect(() => {
    getMenus();
  }, []);
  async function deleteMenu() {
    await axios.delete("http://localhost:8000/menus/" + menuId);
    handleClose();
    window.location.reload();
  }
  const editMenu = (e) => {
    navigate("/menus/edit/" + e);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = menus.map((m) => m._id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - menus.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(menus, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [menus, order, orderBy, page, rowsPerPage]
  );

  //   //bảng hiện thị

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={menus.length}
              />
              <TableBody>
                {visibleRows.map((menu, index) => {
                  const isItemSelected = isSelected(menu._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, menu._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={menu._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {menu.name}
                      </TableCell>
                      <TableCell align="left">{menu.price}</TableCell>
                      <TableCell align="left">{menu.category}</TableCell>
                      <TableCell align="left">
                        {menu.describe.length > 15
                          ? `${menu.describe.substring(0, 15)}...`
                          : menu.describe}
                      </TableCell>
                      <TableCell align="left">{menu.status}</TableCell>
                      <TableCell align="left">
                        <Button
                          className="edit-delete"
                          onClick={() => {
                            editMenu(`${menu.slug}`);
                          }}
                        >
                          <EditIcon />
                        </Button>{" "}
                        <IconButton
                          className="edit-delete"
                          onClick={() => handleShow(`${menu._id}`)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={menus.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
      <Modal
        open={show}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" component="h2">
            Wait!
          </Typography>
          <Typography variant="body1" component="p">
            Bạn có muốn xóa món này không???
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={deleteMenu}
              sx={{ ml: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Menu;
