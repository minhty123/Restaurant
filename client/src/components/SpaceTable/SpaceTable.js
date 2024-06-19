// ReservationSection.js

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../SpaceTable/SpaceTable.scss";
import steakImage from "../../assets/images/steak.jpg";
import seatImage from "../../assets/images/reservation-seat.jpg";
import VIPImage from "../../assets/images/Nha-hang-sang-trong-1.jpg";
import gardenImage from "../../assets/images/san-vuon.jpeg";
import thuong1Image from "../../assets/images/thuong.jpg";
import thuong2Image from "../../assets/images/thuong2.jpg";
import thuong3Image from "../../assets/images/thuong3.jpg";
import thuong4Image from "../../assets/images/thuong4.jpg";
import vip1Image from "../../assets/images/vip.jpg";
import vip2Image from "../../assets/images/vip2.jpg";
import vip3Image from "../../assets/images/vip3.jpg";
import vip4Image from "../../assets/images/vip4.jpg";
const SpaceTable = ({ isOpen }) => {
  const [open, setOpen] = useState(false);
  if (!isOpen) {
    return null; // Nếu không mở, không hiển thị gì cả
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    width: "400px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    outline: "none", // Remove the outline
    borderRadius: "8px", // Rounded corners
  };

  return (
    <div className="space">
      <section id="reservation" className="breakpoint">
        <div className="content">
          <h1 className="topic">Bàn Thường</h1>
          <p>
            Thích hợp họp mặt bạn bè, đồng nghiệp - sức chứa tối đa 8 người -
            300.000VNĐ/Bàn
          </p>
          <h2>
            <button onClick={handleOpen}>ĐẶT BÀN NGAY</button>
          </h2>
        </div>
        <div className="img_container">
          <img src={thuong2Image} title="steak" alt="steak image" />
          <img src={thuong1Image} title="seat" alt="seat image" />
          <img src={thuong3Image} title="garden" alt="garden image" />
          <img src={thuong4Image} title="VIP" alt="VIP image" />
        </div>
      </section>
      <section id="menu" className="breakpoint">
        <div className="img_container">
          <img
            className="align_end"
            src={vip1Image}
            title="Fresh salad"
            alt="Fresh salad image"
          />
          <img
            className="align_end"
            src={vip2Image}
            title="Fresh fancy salad"
            alt="Fresh fancy salad image"
          />
          <img
            className="align_start"
            src={vip3Image}
            title="Mushroom dish with legumes"
            alt="Mushroom dish with legumes image"
          />
          <img
            className="align_start"
            src={vip4Image}
            title="Dessert with lemon"
            alt="Dessert with lemon image"
          />
        </div>
        <div className="content">
          <h1 className="topic">Phòng VIP</h1>

          <p>
            Không gian sang trọng, dịch vụ tốt hơn, đặc biệt có menu dành riêng
            cho khách VIP - Có thể Chứa tối đa 20 người - 3.000.000 VNĐ/Phòng
          </p>
          <h2>
            <button onClick={handleOpen}>ĐẶT BÀN NGAY</button>
          </h2>
        </div>
      </section>
      <section id="reservation" className="breakpoint">
        <div className="content">
          <h1 className="topic">Sân Vườn</h1>
          <p>
            Dành cho những vị khách thích thiên nhiên - có thể đủ chỗ cho 4
            người
          </p>
          <h2>
            <button onClick={handleOpen}>ĐẶT BÀN NGAY</button>
          </h2>
        </div>
        <div className="img_container">
          <img src={thuong2Image} title="thuong" alt="thuong image" />
          <img src={thuong1Image} title="thuong2" alt="thuong2 image" />
          <img src={thuong3Image} title="thuong3" alt="thuong3 image" />
          <img src={thuong4Image} title="thuong4" alt="thuong4 image" />
        </div>
      </section>
      <section id="menu" className="breakpoint">
        <div className="img_container">
          <img
            className="align_end"
            src={vip1Image}
            title="Vip"
            alt="Vip image"
          />
          <img
            className="align_end"
            src={vip2Image}
            title="Vip2"
            alt="Vip2 image"
          />
          <img
            className="align_start"
            src={vip3Image}
            title="Vip3"
            alt="Vip3 image"
          />
          <img
            className="align_start"
            src={vip4Image}
            title="Vip4"
            alt="Vip4 image"
          />
        </div>
        <div className="content">
          <h1 className="topic">Phòng Tiệc</h1>

          <p>
            Không gian rộng lớn, dùng để tổ chức các sự kiện, tiệc cưới, có menu
            đa dạng - Có thể Chứa tối đa 200 người
          </p>
          <h2>
            <button onClick={handleOpen}>ĐẶT BÀN NGAY</button>
          </h2>
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông tin liên hệ đặt bàn
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Điện thoại: 0123 456 789 <br />
            Email: datban@example.com
          </Typography>
          {/* Các thông tin liên hệ khác có thể thêm ở đây */}
        </Box>
      </Modal>
    </div>
  );
};

export default SpaceTable;
