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

const AddMenu = () => {
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

  const [cates, setCates] = useState([]);

  async function getCates() {
    const res = await axios.get("http://localhost:8000/categories");
    setCates(res.data.cate);
  }
  useEffect(() => {
    getCates();
  }, []);

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
            <InputLabel id="category-label">Loại Món</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              label="Loại Món"
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
          <FormControl fullWidth>
            <InputLabel id="unit-label">Trạng thái</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={status}
              label="Trạng thái"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={"Có sẵn"}>Có sẵn</MenuItem>
              <MenuItem value={"Hết"}>Hết</MenuItem>
            </Select>
          </FormControl>
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

export default AddMenu;
