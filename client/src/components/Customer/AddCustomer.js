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
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [catetable, setCatetable] = useState("");
  const [note, setNote] = useState("");

  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  const [cates, setCates] = useState([]);

  async function getCates() {
    const res = await axios.get("http://localhost:8000/tables/create");
    setCates(res.data.catetable);
  }
  useEffect(() => {
    getCates();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const newCustomer = {
      c_name: name,
      c_address: address,
      phone: phone,
      checkin: checkin,
      checkout: checkout,
      o_catetable: catetable,
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
      form.reset();
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
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Checkin"
              name="checkin"
              onChange={(e) => setCheckin(e.target.value)}
              value={checkin}
              fullWidth
              required
            />
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Checkout"
              name="checkout"
              onChange={(e) => setCheckout(e.target.value)}
              value={checkout}
              fullWidth
              required
            />
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
            required
          />

          <Button variant="outlined" color="secondary" type="submit">
            Thêm
          </Button>
        </form>
      </React.Fragment>
    </Container>
  );
};

export default AddCustomer;
