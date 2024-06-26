import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className=" w-full">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer">
            <span>
              <BiRestaurant size={32} />
            </span>
            <a href="/">
              <h1 className="text-xl font-semibold">VERLEN</h1>
            </a>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="/menus"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Thực Đơn
            </Link>
            <Link
              to="/employees"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Nhân Viên
            </Link>

            <Link
              to="/customers"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Khách Hàng
            </Link>

            <Link
              to="/tables"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Bàn
            </Link>
            <Link
              to="/catetables"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Không gian
            </Link>
            <Box display="flex" alignItems="center">
              <Avatar alt="User Avatar" src="/assets/img/pic1.png" />
              <Typography variant="body1" style={{ marginRight: 8 }}>
                Minh Ty
              </Typography>
            </Box>
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="/"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/employees"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Employees
          </Link>
          <Link
            to="/customers"
            className="hover:text-brightColor transition-allcursor-pointer"
            onClick={closeMenu}
          >
            Orders
          </Link>
          <Link
            to="/tables"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Tables
          </Link>
          <Link
            to="/menus"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>

          <Button title="Login" />
        </div>
      </div>
    </div>
  );
};

export default Header;
