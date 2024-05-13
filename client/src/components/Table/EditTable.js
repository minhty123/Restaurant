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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditTable = (props) => {
  const [table, setTable] = useState({});
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  //   const [reserved, setReserved] = useState("");
  //   const [reserved_time, setReserved_time] = useState("");
  const [status, setStatus] = useState("");
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

      if (capacity < 0) {
        setError("số ghế không được nhỏ hơn 0");
        return;
      }

      const newTable = {
        name: name,
        capacity: capacity,
        type: type,
        status: status,
      };
      const res = await axios.put(
        "http://localhost:8000/tables/edit/" + slug,
        newTable
      );
      setNoti(res.status);
      setCheckSuccess(true);
    }
    setValidated(true);
  }
  async function getTable() {
    if (props.type === "edit") {
      const res = await axios.get("http://localhost:8000/tables/" + slug);
      setTable(res.data.table);
      setName(res.data.table.name);
      setCapacity(res.data.table.capacity);
      setType(res.data.table.type);
      setStatus(res.data.table.status);
    }
  }
  useEffect(() => {
    getTable();
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <h2>Sửa thông tin Bàn</h2>
      <br />
      <form onSubmit={handleSubmitEdit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Số bàn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Loại bàn</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={type}
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
            type="number"
            variant="outlined"
            color="secondary"
            label="số lượng"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/tables">
            <ArrowBackIcon />
            Danh sách Bàn
          </Link>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {validated && checkSuccess && noti === 200 && (
        <p style={{ color: "green" }}>Sửa Thông tin bàn thành công!</p>
      )}
      {validated && !checkSuccess && (
        <p style={{ color: "red" }}>Sửa Thông tin bàn không thành công!</p>
      )}
    </Container>
  );
};

export default EditTable;
