import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditCustomer = (props) => {
  const [customer, setCustomer] = useState({});
  const { slug } = useParams();
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
    const res = await axios.get("http://localhost:8000/catetables");
    setCates(res.data.catetable);
  }
  useEffect(() => {
    getCates();
  }, []);

  async function handleSubmitEdit(e) {
    const check = e.currentTarget;
    if (check.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
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
      const res = await axios.put(
        "http://localhost:8000/customers/edit/" + slug,
        newCustomer
      );
      setNoti(res.status);
      setCheckSuccess(true);
    }
    setValidated(true);
  }
  async function getCustomer() {
    if (props.type === "edit") {
      const res = await axios.get(
        "http://localhost:8000/customers/edit" + slug
      );
      setCustomer(res.data.customer);
    }
  }
  useEffect(() => {
    getCustomer();
  }, []);

  const handleChange = (event) => {
    setCatetable(event.target.value);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <h2>Sửa thông tin Món</h2>
      <br />
      <form onSubmit={handleSubmitEdit} action={<Link to="/customers" />}>
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
          sx={{ marginBottom: 4 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Thêm
        </Button>
      </form>

      {validated && checkSuccess && noti === 201 && (
        <p style={{ color: "green" }}>Sửa Món thành công!</p>
      )}
      {validated && !checkSuccess && (
        <p style={{ color: "red" }}>Sửa Món không thành công!</p>
      )}
    </Container>
  );
};

export default EditCustomer;