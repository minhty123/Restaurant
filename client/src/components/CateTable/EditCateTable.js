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

const EditCateTable = (props) => {
  const [catetable, setCateTable] = useState({});
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [noti, setNoti] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmitEdit(e) {
    const check = e.currentTarget;
    if (check.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      // Kiểm tra lương không nhỏ hơn 0
      if (price < 0) {
        setError("Gía không được nhỏ hơn 0");
        return;
      }
      const newCates = {
        name: name,
        unit: unit,
        price: price,
        describe: describe,
      };
      const res = await axios.put(
        "http://localhost:8000/catetables/edit/" + slug,
        newCates
      );
      setNoti(res.status);
      setCheckSuccess(true);
      setError("");
    }
    setValidated(true);
  }
  async function getCateTable() {
    if (props.type === "edit") {
      const res = await axios.get(
        "http://localhost:8000/catetables/edit" + slug
      );
      setCateTable(res.data.catetable);
    }
  }
  useEffect(() => {
    getCateTable();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <h2>Sửa Không Gian</h2>
      <br />
      <form onSubmit={handleSubmitEdit}>
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
            type="text"
            variant="outlined"
            color="secondary"
            label="Mô tả"
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            fullWidth
            required
          />
        </Stack>

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
              <MenuItem value={"Chỗ"}>Cái</MenuItem>
            </Select>
          </FormControl>
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
        <Button variant="outlined" color="secondary" type="submit">
          Thêm
        </Button>
      </form>
      {error && <div className="error">{error}</div>}
      {validated && checkSuccess && noti === 201 && (
        <p style={{ color: "green" }}>Sửa Món thành công!</p>
      )}
      {validated && !checkSuccess && (
        <p style={{ color: "red" }}>Sửa Món không thành công!</p>
      )}
    </Container>
  );
};

export default EditCateTable;
