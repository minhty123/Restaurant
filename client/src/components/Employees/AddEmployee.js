import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const newEmployee = {
      e_name: form.name.value,
      position: form.position.value,
      birthday: form.birthday.value,
      e_address: form.address.value,
      phone: form.phone.value,
      email: form.email.value,
      salary: form.salary.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/employees/create",
        newEmployee
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
              label="Name"
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
              label="Phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              fullWidth
              required
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Birthday"
              name="birthday"
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

          <Button variant="outlined" color="secondary" type="submit">
            Thêm
          </Button>
        </form>
      </React.Fragment>
    </Container>
  );
};

export default AddEmployee;
