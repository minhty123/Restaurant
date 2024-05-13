import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "12 May, 2024",
    "Nguyễn Đức Anh",
    "TP.Hồ Chí Minh",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "12 May, 2024",
    "Trần Đại Sang",
    "TP.Hồ Chí Minh",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "12 May, 2024",
    "Trần Phi Hùng",
    "TP.Hồ Chí Minh",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "12 May, 2024",
    "Nguyễn Tiến Hoàng",
    "TP.Hồ Chí Minh",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "12 May, 2024",
    "Hà Ánh Linh",
    "TP.Hồ Chí Minh",
    "VISA ⠀•••• 5919",
    212.79
  ),
  createData(
    5,
    "12 May, 2024",
    "Võ Khắc Nghĩa",
    "TP.Hồ Chí Minh",
    "VISA ⠀•••• 5919",
    352.26
  ),
  createData(
    6,
    "12 May, 2024",
    "Nguyễn Hoàng Tiến",
    "TP.Hồ Chí Minh",
    "VISA ⠀•••• 5919",
    652.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Khách Hàng</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ngày Tới</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell align="right">Hóa đơn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Xem thêm
      </Link>
    </React.Fragment>
  );
}
