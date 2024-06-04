import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkin, setCheckin] = useState(dayjs());
  const [checkout, setCheckout] = useState(dayjs());
  const [quantity, setQuantity] = useState("");
  const [catetable, setCatetable] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  const [cates, setCates] = useState([]);

  async function getCates() {
    const res = await axios.get("http://localhost:8000/catetables");
    setCates(res.data.catetable);
  }
  useEffect(() => {
    getCates();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    //sdt phải đủ 10 số
    if (phone.length !== 10) {
      setError("Số điện thoại phải có 10 số");
      return;
    }
    //số lượng >0
    if (quantity < 0) {
      setError("lượng khách phải lớn hơn 0");
      return;
    }
    //checkin phải nhỏ hơn checkout
    if (checkin > checkout) {
      setError("checkin phải nhỏ hơn checkout.");
      return;
    }

    const newCustomer = {
      name: name,
      address: address,
      phone: phone,
      checkin: checkin,
      checkout: checkout,
      quantity: quantity,
      catetable: catetable,
      note: note,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/customers/create",
        newCustomer
      );
      setNoti(res.status);
      setCheckSuccess(true);
      // Reset the form
      setName("");
      setPhone("");
      setAddress("");
      setCheckin(dayjs());
      setCheckout(dayjs());
      setQuantity("");
      setCatetable("");
      setNote("");
      setError("");
    } catch (error) {
      console.error(error);
    }
    setValidated(true);
  }
  const handleChange = (event) => {
    setCatetable(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <React.Fragment>
        <h2>Thêm thông tin Khách hàng</h2>
        <br></br>
        <form onSubmit={handleSubmit} action={<Link to="/login" />}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Họ và tên"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Số điện thoại"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Địa chỉ"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            fullWidth
            required
            sx={{ marginBottom: 4 }}
          />
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Số lượng"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel id="category-label">Loại bàn</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={catetable}
                label="Loại bàn"
                onChange={handleChange}
              >
                {cates.map((cate) => (
                  <MenuItem key={cate._id} value={cate.name}>
                    {cate.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Checkin"
                value={checkin}
                onChange={(newValue) => setCheckin(newValue)}
                fullWidth
                required
              />
              <DateTimePicker
                label="Checkout"
                value={checkout}
                onChange={(newValue) => setCheckout(newValue)}
                fullWidth
                required
              />
            </LocalizationProvider>
          </Stack>

          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Ghi chú"
            name="note"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            fullWidth
            sx={{ marginBottom: 4 }}
          />
          {error && <div className="error">{error}</div>}
          <Button variant="outlined" color="secondary" type="submit">
            Thêm
          </Button>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/customers">
              <ArrowBackIcon />
              Danh sách Khách Hàng
            </Link>
          </div>
        </form>
        {validated && checkSuccess && noti === 201 && (
          <p style={{ color: "green" }}>Thêm khách hàng thành công!</p>
        )}
        {validated && !checkSuccess && (
          <p style={{ color: "red" }}>Thêm khách hàng không thành công!</p>
        )}
      </React.Fragment>
    </Container>
  );
};

export default AddCustomer;
