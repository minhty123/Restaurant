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
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMenu = {
      m_name: name,
      describe: describe,
      price: price,
      category: category,
      unit: unit,
      image: image,
      status: status,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/menus/create",
        newMenu
      );
      setNoti(res.status);
      setCheckSuccess(true);
      // Reset the form
      setName("");
      setDescribe("");
      setPrice("");
      setCategory("");
      setUnit("");
      setImage("");
      setStatus("");
    } catch (error) {
      console.error(error);
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
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
            label="Tên món"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Loại món</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              label="Loại món"
              onChange={handleChange}
            >
              <MenuItem value={"Món Chính"}>Món Chính</MenuItem>
              <MenuItem value={"Món Khai Vị"}>Món Khai Vị</MenuItem>
              <MenuItem value={"Món Tráng Miệng"}>Món Tráng Miệng</MenuItem>
              <MenuItem value={"Món Ăn Chay"}>Món Ăn Chay</MenuItem>
              <MenuItem value={"Món Ăn Truyền Thống"}>
                Món Ăn Truyền Thống
              </MenuItem>
              <MenuItem value={"Đồ Uống"}>Đồ Uống</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Mô tả"
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 4 }}
        />
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="unit-label">Đơn vị</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={unit}
              label="Đơn vị"
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value={"Phần"}>Món Chính</MenuItem>
              <MenuItem value={"Đĩa"}>Món Khai Vị</MenuItem>
              <MenuItem value={"Ly"}>Món Tráng Miệng</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
          />
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Đường dẫn hình ảnh"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
