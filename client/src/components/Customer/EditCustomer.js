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

const EditCustomer = (props) => {
  const [customer, setCustomer] = useState(null);
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [amount, setAmount] = useState("");
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
      if (amount < 0) {
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
        amount: amount,
        o_catetable: catetable,
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
      setAmount(res.data.customer.amount);
      setCatetable(res.data.customer.o_catetable);
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
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
                  type="datetime-local"
                  variant="outlined"
                  color="secondary"
                  label="Checkin"
                  name="checkin"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  type="datetime-local"
                  variant="outlined"
                  color="secondary"
                  label="Checkout"
                  name="checkout"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
                sx={{ marginBottom: 4 }}
              />
              <Button variant="outlined" color="secondary" type="submit">
                Sửa
              </Button>
            </form>
            {error && <div className="error">{error}</div>}
            {validated && checkSuccess && noti === 201 && (
              <p style={{ color: "green" }}>Sửa Món thành công!</p>
            )}
            {validated && !checkSuccess && (
              <p style={{ color: "red" }}>Sửa Món không thành công!</p>
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
