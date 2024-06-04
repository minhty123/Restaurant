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
import PageNotFound from "../NotFound/PageNotFound";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditCustomer = (props) => {
  const [customer, setCustomer] = useState(null);
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkin, setCheckin] = useState(dayjs());
  const [checkout, setCheckout] = useState(dayjs());
  const [quantity, setQuantity] = useState("");
  const [catetable, setCatetable] = useState("");
  const [note, setNote] = useState("");
  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const [cates, setCates] = useState([]);
  const [error, setError] = useState("");
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
      const res = await axios.put(
        "http://localhost:8000/customers/edit/" + slug,
        newCustomer
      );
      setNoti(res.status);
      setCheckSuccess(true);
      setError("");
    }
    setValidated(true);
  }
  async function getCustomer() {
    if (props.type === "edit") {
      const res = await axios.get("http://localhost:8000/customers/" + slug);
      setCustomer(res.data.customer);
      setName(res.data.customer.name);
      setPhone(res.data.customer.phone);
      setAddress(res.data.customer.address);
      setCheckin(res.data.customer.checkin);
      setCheckout(res.data.customer.checkout);
      setQuantity(res.data.customer.quantity);
      setCatetable(res.data.customer.catetable);
      setNote(res.data.customer.note);
    }
  }
  useEffect(() => {
    getCustomer();
  }, []);

  const handleChange = (event) => {
    setCatetable(event.target.value);
  };
  return (
    <>
      {customer ? (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
          <React.Fragment>
            <h2>Sửa thông tin Khách hàng</h2>
            <br />
            <form onSubmit={handleSubmitEdit} action={<Link to="/customers" />}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Họ và tên"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Số điện thoại"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
                    value={dayjs(checkin)}
                    onChange={(newValue) => setCheckin(newValue)}
                    fullWidth
                    required
                  />
                  <DateTimePicker
                    label="Checkout"
                    value={dayjs(checkout)}
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
                sx={{ marginBottom: 4 }}
              />
              <Button variant="outlined" color="secondary" type="submit">
                Sửa
              </Button>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/customers">
                  <ArrowBackIcon />
                  Danh sách Khách Hàng
                </Link>
              </div>
            </form>
            {error && <div className="error">{error}</div>}
            {validated && checkSuccess && noti === 200 && (
              <p style={{ color: "green" }}>
                Sửa Thông tin khách hàng thành công!
              </p>
            )}
            {validated && !checkSuccess && (
              <p style={{ color: "red" }}>
                Sửa thông tin khách hàng không thành công!
              </p>
            )}
          </React.Fragment>
        </Container>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default EditCustomer;
