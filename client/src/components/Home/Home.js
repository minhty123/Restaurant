import React, { useRef, useState, useEffect } from "react";
import SpaceTable from "../SpaceTable/SpaceTable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ViewMenu from "../Menu/Menu";
import breakfastImage from "../../assets/images/breakfast.jpg";
import limesImage from "../../assets/images/limes.jpg";
import gardenImage from "../../assets/images/san-vuon.jpeg";
import VIPImage from "../../assets/images/Nha-hang-sang-trong-1.jpg";
import steakImage from "../../assets/images/steak.jpg";
import seatImage from "../../assets/images/reservation-seat.jpg";
import menu1Image from "../../assets/images/menu1.jpg";
import menu2Image from "../../assets/images/menu2.jpg";
import menu3Image from "../../assets/images/menu4.jpg";
import cvImage from "../../assets/images/cong-viec-nhan-vien-phuc-vu-nha-hang.jpg";
import ResImage from "../../assets/images/nha-hang-sen-2.jpg";
import "../Home/Home.scss";

function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [open, setOpen] = useState(false);
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
    <main>
      <section id="about" className="breakpoint">
        <div className="content">
          <h1 className="highlight">Discover</h1>
          <h1 className="topic">our story</h1>
          <p className="symbol">&#10059;</p>
          <p>
            Khởi nguồn từ niềm đam mê ẩm thực và lòng yêu mến nền văn hóa ẩm
            thực truyền thống, nhà hàng của chúng tôi đã ra đời với sứ mệnh mang
            đến những trải nghiệm ẩm thực tuyệt vời nhất. Từ những nguyên liệu
            tươi ngon được chọn lọc kỹ lưỡng, chúng tôi tự hào mang đến cho thực
            khách những món ăn đậm đà hương vị, kết hợp tinh tế giữa truyền
            thống và hiện đại. Với đội ngũ đầu bếp tài năng và không gian ấm
            cúng, chúng tôi hy vọng mỗi bữa ăn tại nhà hàng sẽ là một hành trình
            khám phá đầy thú vị, nơi mọi người có thể tận hưởng và chia sẻ những
            khoảnh khắc tuyệt vời cùng nhau.
          </p>
          <h2>
            <a href="#">About us</a>
          </h2>
        </div>
        <div className="img_container">
          <img src={ResImage} title="Stuffed tomatoes" alt="Stuffed tomatoes" />
          <img
            className="align_end"
            src={cvImage}
            title="Stuffed tomatoes"
            alt="Stuffed tomatoes"
          />
        </div>
      </section>

      <section className="divider">
        <h1 className="highlight">Tasteful</h1>
        <h1 className="topic">recipes</h1>
      </section>

      <section id="menu" className="breakpoint">
        <div className="img_container">
          <img
            className="align_end"
            src={breakfastImage}
            title="Fresh salad"
            alt="Fresh salad image"
          />
          <img
            className="align_end"
            src={menu1Image}
            title="Fresh fancy salad"
            alt="Fresh fancy salad image"
          />
          <img
            className="align_start"
            src={menu2Image}
            title="Mushroom dish with legumes"
            alt="Mushroom dish with legumes image"
          />
          <img
            className="align_start"
            src={menu3Image}
            title="Dessert with lemon"
            alt="Dessert with lemon image"
          />
        </div>
        <div className="content">
          <h1 className="highlight">Discover</h1>
          <h1 className="topic">our menu</h1>
          <p className="symbol">&#10059;</p>
          <p>
            Chào mừng bạn đến với nhà hàng của chúng tôi, nơi hội tụ những tinh
            hoa ẩm thực đặc sắc. Thực đơn của chúng tôi đa dạng và phong phú, từ
            các món ăn truyền thống đậm đà hương vị đến những món ăn hiện đại
            đầy sáng tạo. Chúng tôi tự hào sử dụng những nguyên liệu tươi ngon
            nhất, kết hợp với tay nghề điêu luyện của các đầu bếp để mang đến
            cho bạn những trải nghiệm ẩm thực khó quên. Hãy cùng khám phá và
            thưởng thức các món ăn tuyệt vời trong không gian ấm cúng và sang
            trọng của chúng tôi.
          </p>
          <h2>
            <button onClick={handleOpen}>Đặt Bàn Ngay</button>
          </h2>
        </div>
      </section>
      <ViewMenu isOpen={isMenuOpen} />

      <section className="divider">
        <h1 className="highlight">The perfect</h1>
        <h1 className="topic">Space</h1>
      </section>

      <section id="reservation" className="breakpoint">
        <div className="content">
          <h1 className="highlight">Table</h1>
          <h1 className="topic">Space</h1>
          <p className="symbol">&#10059;</p>
          <p>
            Nhà hàng của chúng tôi được thiết kế để tạo ra một không gian lý
            tưởng, nơi bạn có thể thư giãn và tận hưởng những bữa ăn tuyệt vời
            cùng gia đình và bạn bè. Với sự kết hợp hài hòa giữa nét hiện đại và
            sự ấm áp của truyền thống, chúng tôi cam kết mang đến cho bạn một
            trải nghiệm ẩm thực đầy thú vị và đáng nhớ.
          </p>
          <h2>
            <button onClick={() => setIsReservationOpen(true)}>
              Xem Không Gian
            </button>
          </h2>
        </div>
        <div className="img_container">
          <img src={steakImage} title="steak" alt="steak image" />
          <img src={seatImage} title="seat" alt="seat image" />
          <img src={gardenImage} title="garden" alt="garden image" />
          <img src={VIPImage} title="VIP" alt="VIP image" />
        </div>
      </section>
      <SpaceTable isOpen={isReservationOpen} />
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
    </main>
  );
}

export default Home;
