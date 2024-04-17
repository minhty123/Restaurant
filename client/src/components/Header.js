import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
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
    <div className="fixed w-full">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer">
            <span>
              <BiRestaurant size={32} />
            </span>
            <h1 className="text-xl font-semibold">FoodieWeb</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="/"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Home
            </Link>

            <div className="relative group">
              <div className="flex items-center gap-1">
                <Link
                  to="/dishes"
                  className="hover:text-brightColor transition-all cursor-pointer"
                  onClick={closeMenu}
                >
                  Dishes
                </Link>

                <BiChevronDown className="cursor-pointer" size={25} />
              </div>

              <ul className="absolute hidden space-y-2 group-hover:block bg-white border border-gray-300 rounded-lg p-5">
                <li>
                  <Link
                    to="/dishes"
                    className="text-gray-800 hover:text-brightColor transition-all cursor-pointer"
                    onClick={closeMenu}
                  >
                    Spicy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dishes"
                    className="text-gray-800 hover:text-brightColor transition-all cursor-pointer"
                    onClick={closeMenu}
                  >
                    Tasty
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dishes"
                    className="text-gray-800 hover:text-brightColor transition-all cursor-pointer"
                    onClick={closeMenu}
                  >
                    Delicious
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dishes"
                    className="text-gray-800 hover:text-brightColor transition-all cursor-pointer"
                    onClick={closeMenu}
                  >
                    Crispy
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              to="/about"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              to="/menu"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Menu
            </Link>

            <Link
              to="/review"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Reviews
            </Link>

            <Button title="Login" />
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
            to="/dishes"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Dishes
          </Link>
          <Link
            to="/about"
            className="hover:text-brightColor transition-allcursor-pointer"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/menu"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            to="/review"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Reviews
          </Link>

          <Button title="Login" />
        </div>
      </div>
    </div>
  );
};

export default Header;
