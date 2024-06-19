import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

export default function Orders() {
  // Generate Order Data
  const [customers, setCustomers] = useState([]);
  async function getCustomers() {
    const res = await axios.get("http://localhost:8000/customers");
    const sortedCustomers = res.data.customers
      .sort((a, b) => new Date(b.checkin) - new Date(a.checkin)) // Sort by check-in date descending
      .slice(0, 10); // Get the top 10 customers
    setCustomers(sortedCustomers);
  }
  useEffect(() => {
    getCustomers();
  }, []);
  function preventDefault(event) {
    event.preventDefault();
  }
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  }

  return (
    <React.Fragment>
      <Title>Khách Hàng</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ngày Tới</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Loại Bàn (Không gian)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{formatDate(customer.checkin)}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.catetable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/customers" sx={{ mt: 3 }}>
        Xem thêm
      </Link>
    </React.Fragment>
  );
}
