import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, phone, email, checkin, checkout);
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
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Checkin"
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

export default AddCustomer;
