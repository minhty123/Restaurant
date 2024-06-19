// ReservationSection.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../Menu/Menu.scss";

import montt1Image from "../../assets/images/monantt1.jpg";
import montt2Image from "../../assets/images/monantt2.jpg";
import montt3Image from "../../assets/images/montt3.jpg";
import montt4Image from "../../assets/images/montt5.jpeg";
import monngoai1Image from "../../assets/images/monngoai1.jpg";
import monngoai2Image from "../../assets/images/monngoai3.jpg";
import monngoai3Image from "../../assets/images/monngoai4.jpg";
import monngoai4Image from "../../assets/images/monngoai11.jpg";

const ViewMenu = ({ isOpen }) => {
  const [open, setOpen] = useState(false);
  if (!isOpen) {
    return null;
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
    <div className="menus">
      <section id="menu" className="breakpoint">
        <div className="content">
          <h1 className="topic">Ẩm thực Truyền Thống</h1>
          <p>
            Hãy đến với nhà hàng của chúng tôi và khám phá thực đơn truyền thống
            đậm đà, từ những chiếc nem rán giòn tan, phở gà nóng hổi đến những
            món bánh mỳ bò kho thơm ngon. Kết thúc bữa ăn với chè đậu xanh ngọt
            mát hay bánh flan mềm mịn. Hãy để chúng tôi mang đến cho bạn một
            trải nghiệm ẩm thực đầy hứng khởi và đậm đà vị ngon của đất nước.
          </p>
          <h2>
            <button onClick={handleOpen}>ĐẶT BÀN NGAY</button>
          </h2>
        </div>
        <div className="img_container">
          <img src={montt3Image} title="montt3" alt="montt3 image" />
          <img src={montt2Image} title="montt2" alt="montt2 image" />
          <img src={montt4Image} title="montt4" alt="montt4 image" />
          <img src={montt1Image} title="montt1" alt="montt1 image" />
        </div>
      </section>
      <section id="menu" className="breakpoint">
        <div className="content">
          <h1 className="topic">Ẩm thực nước ngoài</h1>
          <p>
            Ẩm thực nước ngoài là một thế giới phong phú và đa dạng, từ những
            món ăn đậm chất châu Âu với sự hòa quyện của phong cách cổ điển và
            hiện đại, đến những món ăn đầy màu sắc và hương vị đặc trưng của
            châu Á hay sự đa dạng trong ẩm thực châu Phi với những gia vị độc
            đáo. Quá trình chuẩn bị từng món ăn thường được chú trọng đến từng
            chi tiết, từ lựa chọn nguyên liệu tươi ngon đến kỹ năng nấu nướng
            tinh tế, mang lại cho khách hàng trải nghiệm ẩm thực tuyệt vời và
            đậm đà văn hóa.
          </p>
          <h2>
            <button onClick={handleOpen}>ĐẶT BÀN NGAY</button>
          </h2>
        </div>
        <div className="img_container">
          <img src={monngoai1Image} title="ngoai1" alt="ngoai1 image" />
          <img src={monngoai2Image} title="ngoai2" alt="ngoai2 image" />
          <img src={monngoai3Image} title="ngoai3" alt="ngoai3 image" />
          <img src={monngoai4Image} title="ngoai4" alt="ngoai4 image" />
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

export default ViewMenu;
