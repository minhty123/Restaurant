import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import dayjs from "dayjs";
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
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
    label: "name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "address",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "phone",
  },
  {
    id: "checkin",
    numeric: false,
    disablePadding: false,
    label: "Checkin",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Số lượng",
  },
  {
    id: "catetable",
    numeric: false,
    disablePadding: false,
    label: "Loại Bàn",
  },
  {
    id: "o_table",
    numeric: false,
    disablePadding: false,
    label: "Số bàn",
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

const FilterCustomer = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("checkin");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = (e) => {
  //   setShow(true);
  // };

  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setCustomerId(e);
  };
  const [customers, setCustomers] = useState([]);
  const [catetables, setCateTables] = useState([]);
  const [name, setName] = useState(localStorage.getItem("selectedName") || "");
  const location = useLocation();

  async function getCateTables() {
    const res = await axios.get("http://localhost:8000/catetables");
    setCateTables(res.data.catetable);
  }
  async function getCustomers(name) {
    try {
      const res = await axios.post("http://localhost:8000/customers/filter", {
        name: name,
      });
      setCustomers(res.data.customers);
    } catch (error) {
      console.error("Error getting customers:", error);
    }
  }

  async function arrangeCustomers(name) {
    try {
      const res = await axios.post(`http://localhost:8000/customers/filter`, {
        name: name,
        arrange: true,
      });
      setCustomers(res.data.customers);
      console.log(res.data.customers);
    } catch (error) {
      console.error("Error arranging customers:", error);
    }
  }

  useEffect(() => {
    if (name) {
      getCustomers(name);
      getCateTables(name); // Bạn cần định nghĩa hàm này hoặc bỏ nó nếu không cần
    }

    return () => {
      localStorage.removeItem("selectedName"); // Xóa name khỏi Local Storage khi component unmount
    };
  }, [name]);
  const handleAutocompleteChange = async (event, option) => {
    if (option) {
      const selectedName = option.name;
      localStorage.setItem("selectedName", selectedName);
      navigate("/customers/filter/" + name);
      setName(selectedName);
    }
  };

  async function deleteCustomer() {
    await axios.delete("http://localhost:8000/customers/" + customerId);
    handleClose();
    window.location.reload();
  }
  const editCustomer = (e) => {
    navigate("/customers/" + e);
  };

  const FilterCates = async (name) => {
    try {
      localStorage.setItem("selectedName", name);
      navigate("/customers/filter/" + name);
      const response = await axios.post("/customers/filter", { name });
    } catch (error) {
      console.error("Error fetching filtered customers:", error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = customers.map((c) => c._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(customers, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [customers, order, orderBy, page, rowsPerPage]
  );

  //   //bảng hiện thị
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
              Danh sách Khách hàng
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
              <IconButton component={Link} to="/customers/create">
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
  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            <Button variant="contained" onClick={() => arrangeCustomers(name)}>
              Arrange
            </Button>

            <div style={{ marginLeft: "20px" }}>
              {" "}
              {/* Tạo một khoảng trống giữa Button và Autocomplete */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={catetables}
                getOptionLabel={(option) => option.name}
                onChange={handleAutocompleteChange}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Loại Bàn"
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </div>
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
                rowCount={customers.length}
              />

              <TableBody>
                {visibleRows.map((customer, index) => {
                  const isItemSelected = isSelected(customer._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, customer._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={customer._id}
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
                        {customer.name}
                      </TableCell>
                      <TableCell align="left">{customer.address}</TableCell>
                      <TableCell align="left">{customer.phone}</TableCell>
                      <TableCell align="left">
                        {dayjs(customer.checkin).format("HH:mm DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">{customer.quantity}</TableCell>
                      <TableCell align="left">{customer.catetable}</TableCell>
                      <TableCell align="left">{customer.o_table}</TableCell>
                      <TableCell align="left">
                        <Button
                          className="edit-delete"
                          onClick={() => {
                            editCustomer(`edit/${customer.slug}`);
                          }}
                        >
                          <EditIcon />
                        </Button>{" "}
                        <IconButton
                          className="edit-delete"
                          onClick={() => handleShow(`${customer._id}`)}
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
            count={customers.length}
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
            Bạn có muốn xóa Khách hàng này không???
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={deleteCustomer}
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

export default FilterCustomer;
