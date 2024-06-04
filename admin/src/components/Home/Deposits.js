import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Tổng Thu nhập</Title>
      <Typography component="p" variant="h4">
        $25,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 12 May, 2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Xem chi tiết
        </Link>
      </div>
    </React.Fragment>
  );
}
