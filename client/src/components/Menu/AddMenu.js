import React, { useState } from "react";
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

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      e_name: name,
      position: position,
      birthday: birthday,
      e_address: address,
      phone: phone,
      email: email,
      salary: salary,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/employees/create",
        newEmployee
      );
      setNoti(res.status);
      setCheckSuccess(true);
      // Reset the form
      setName("");
      setPosition("");
      setBirthday("");
      setAddress("");
      setPhone("");
      setEmail("");
      setSalary("");
    } catch (error) {
      console.error(error);
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <h2>Thêm thông tin Nhân Viên</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Họ và Tên"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
          />
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="Ngày sinh"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="position-label">Position</InputLabel>
            <Select
              labelId="position-label"
              id="position-select"
              value={position}
              label="Position"
              onChange={handleChange}
            >
              <MenuItem value={"Quản lý"}>Quản lý</MenuItem>
              <MenuItem value={"Bồi bàn"}>Bồi bàn</MenuItem>
              <MenuItem value={"Thu Ngân"}>Thu Ngân</MenuItem>
              <MenuItem value={"Đầu bếp"}>Đầu bếp</MenuItem>
              <MenuItem value={"Phụ bếp"}>Phụ bếp</MenuItem>
              <MenuItem value={"Lao công"}>Lao công</MenuItem>
              <MenuItem value={"Bảo vệ"}>Bảo vệ</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 4 }}
        />

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Lương"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            required
          />
        </Stack>

        <Button variant="outlined" color="secondary" type="submit">
          Thêm
        </Button>
      </form>

      {validated && checkSuccess && noti === 201 && (
        <p style={{ color: "green" }}>Thêm nhân viên thành công!</p>
      )}
      {validated && !checkSuccess && (
        <p style={{ color: "red" }}>Thêm nhân viên không thành công!</p>
      )}
    </Container>
  );
};

export default AddEmployee;
