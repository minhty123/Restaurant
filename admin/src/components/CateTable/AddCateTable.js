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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const AddCateTable = () => {
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [reversed_time, setReversed] = useState("");
  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price < 0) {
      setError("giá không được nhỏ hơn 0");
      return;
    }
    if (reversed_time < 0) {
      setError("thời gian không được nhỏ hơn 0");
      return;
    }
    const newCates = {
      name: name,
      unit: unit,
      price: price,
      describe: describe,
      reversed_time: reversed_time,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/catetables/create",
        newCates
      );
      setNoti(res.status);
      setCheckSuccess(true);
      // Reset the form
      setName("");
      setUnit("");
      setPrice("");
      setDescribe("");
      setReversed("");
      setError("");
    } catch (error) {
      console.error(error);
    }
    setValidated(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <h1>Thêm Không gian Bàn</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Tên Không Gian"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            type="Number"
            variant="outlined"
            color="secondary"
            label="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
          />
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
              <MenuItem value={"Bàn"}>Bàn</MenuItem>

              <MenuItem value={"Phòng"}>Phòng</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="Number"
            variant="outlined"
            color="secondary"
            label="Thời gian làm sạch(phút)"
            value={reversed_time}
            onChange={(e) => setReversed(e.target.value)}
            fullWidth
            required
          />
        </Stack>
        <Button variant="outlined" color="secondary" type="submit">
          Thêm
        </Button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/catetables">
            <ArrowBackIcon />
            Danh sách Không Gian Bàn
          </Link>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {validated && checkSuccess && noti === 201 && (
        <p style={{ color: "green" }}>Thêm Không gian thành công!</p>
      )}
      {validated && !checkSuccess && (
        <p style={{ color: "red" }}>Thêm không gian không thành công!</p>
      )}
    </Container>
  );
};

export default AddCateTable;
