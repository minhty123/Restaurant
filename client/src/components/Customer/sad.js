const Customer = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("checkin");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customerId, setCustomerId] = useState("");
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isArranged, setIsArranged] = useState(false); // Thêm state này
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setCustomerId(e);
  };

  // Hàm để lấy dữ liệu từ endpoint show
  async function getCustomers() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/customers");
      setCustomers(res.data.customer); // Đảm bảo rằng bạn sử dụng đúng tên biến từ response của server
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  }

  // Hàm để lấy dữ liệu từ endpoint arrange
  async function arrangeCustomers() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/customers/arrange");
      setCustomers(res.data.customers); // Đảm bảo rằng bạn sử dụng đúng tên biến từ response của server
      setLoading(false);
    } catch (error) {
      console.error("Error arranging customers:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isArranged) {
      arrangeCustomers();
    } else {
      getCustomers();
    }
  }, [isArranged]); // Thêm isArranged vào dependencies

  async function deleteCustomer() {
    await axios.delete("http://localhost:8000/customers/" + customerId);
    handleClose();
    window.location.reload();
  }

  const editCustomer = (e) => {
    navigate("/customers/" + e);
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

  // Bảng hiển thị
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
          <Button onClick={() => setIsArranged(true)}>Arrange</Button>
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
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <TableHead>
                  {/* Cấu trúc EnhancedTableHead sẽ nằm ở đây */}
                </TableHead>
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
      )}
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

export default Customer;
