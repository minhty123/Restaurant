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

const EditEmployee = (props) => {
  const [employee, setEmployee] = useState({});
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
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

      // Kiểm tra số điện thoại có 10 số
      if (phone.length !== 10) {
        setError("Số điện thoại phải có 10 số");
        return;
      }

      // Kiểm tra ngày sinh không lớn hơn hiện tại và đủ 18 tuổi trở lên
      const currentDate = new Date();
      const selectedDate = new Date(birthday);
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
      if (selectedDate >= currentDate || selectedDate > minAgeDate) {
        setError("Không đủ tuổi");
        return;
      }

      // Kiểm tra lương không nhỏ hơn 0
      if (salary < 0) {
        setError("Lương không được nhỏ hơn 0");
        return;
      }
      const newEmployee = {
        e_name: name,
        gender: gender,
        position: position,
        birthday: birthday,
        e_address: address,
        phone: phone,
        salary: salary,
      };
      const res = await axios.put(
        "http://localhost:8000/employees/edit/" + slug,
        newEmployee
      );
      setNoti(res.status);
      setCheckSuccess(true);
      setError("");
    }
    setValidated(true);
  }
  async function getEmployee() {
    if (props.type === "edit") {
      const res = await axios.get(
        "http://localhost:8000/employees/edit" + slug
      );
      setEmployee(res.data.employee);
    }
  }
  useEffect(() => {
    getEmployee();
  }, []);

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <h2>Sửa thông tin Nhân Viên</h2>
      <br />
      <form onSubmit={handleSubmitEdit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Họ và tên"
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
          <FormControl fullWidth>
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={gender}
              label="Giới tính"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={"Nam"}>Nam</MenuItem>
              <MenuItem value={"Nữ"}>Nữ</MenuItem>
            </Select>
          </FormControl>
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
          Sửa
        </Button>
      </form>
      {error && <div className="error">{error}</div>}
      {validated && checkSuccess && noti === 201 && (
        <p style={{ color: "green" }}>Sửa nhân viên thành công!</p>
      )}
      {validated && !checkSuccess && (
        <p style={{ color: "red" }}>Sửa nhân viên không thành công!</p>
      )}
    </Container>
  );
};

export default EditEmployee;
