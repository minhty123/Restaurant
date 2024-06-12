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
          <h2> Locations </h2>
          <div className="address_container">
            <div className="address1">
              <p> 376 Van Brunt St </p>
              <p> Brooklyn, NY — 11231 </p>
            </div>
            <div className="address2">
              <p> 25 Union Square West </p>
              <p> New York, NY — 10003 </p>
            </div>
          </div>
        </div>

        <div id="hours">
          <h2> Hours </h2>
          <div className="open_container">
            <div className="open">
              <p> Monday - Thursday </p>
              <p> 5:30pm - 10:00pm </p>
            </div>
            <div className="open">
              <p> Friday & Saturday </p>
              <p> 5:30pm - 11:00pm </p>
            </div>
            <div className="open">
              <p> Available for private </p>
              <p> events on Sunday </p>
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
