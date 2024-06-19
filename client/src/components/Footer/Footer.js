import React from "react";
import "../Footer/Footer.scss";
const Footer = () => {
  return (
    <footer>
      <div id="top">
        <a href="#go_to_top" className="menu_link">
          <p id="arrow"> &lsaquo; </p>
        </a>
      </div>
      <div id="info" className="breakpoint">
        <div id="locations">
          <h2> Địa chỉ </h2>
          <div className="address_container">
            <div className="address1">
              <p> 451 Lê Văn Việt</p>
              <p> TP.Thủ Đức </p>
            </div>
            <div className="address2">
              <p> Tầng 51 Bitexco Financial Tower</p>
              <p> TP. Hồ Chí Minh </p>
            </div>
          </div>
        </div>

        <div id="hours">
          <h2> Thời gian hoạt động </h2>
          <div className="open_container">
            <div className="open">
              <p> Monday - Saturday </p>
              <p> 8:00am - 11:00pm </p>
            </div>
            <div className="open">
              <p> Available for private </p>
              <p> events on Sunday </p>
            </div>
          </div>
        </div>
        <div id="contact">
          <h2> Liên hệ đặt bàn </h2>
          <div className="contact_container">
            <div className="phone">
              <p> SĐT: 0379020715 </p>
              <p> Email: minhty1456@gmail.com </p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright_container">
        <div id="copyright">
          <div>
            <p>
              {" "}
              Copyright 2014 &copy; Handcrafted with love by{" "}
              <a href="#">PixelGrade </a> Team{" "}
            </p>
            <p> Coded with love by Patricia Georgescu 2018 &copy; </p>
          </div>
          <div>
            <p>
              {" "}
              Permissions and Copyright <span className="dot">
                {" "}
                &middot;{" "}
              </span>{" "}
              Contact The Team{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
