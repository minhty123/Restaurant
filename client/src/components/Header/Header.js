import React, { useState, useEffect } from "react";
import "./Header.scss"; // Import CSS styles

const Header = () => {
  const [menuFixed, setMenuFixed] = useState(false);

  useEffect(() => {
    const fixMenu = () => {
      const scrolling =
        window.pageYOffset || document.documentElement.scrollTop;
      setMenuFixed(scrolling > 100);
    };

    window.addEventListener("scroll", fixMenu);
    return () => {
      window.removeEventListener("scroll", fixMenu);
    };
  }, []);

  const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    const toTop = targetSection.getBoundingClientRect().top;
    window.scrollBy({ top: toTop, left: 0, behavior: "smooth" });
  };

  const toggleMenuOnClick = () => {
    const menuIconOpen = document.getElementById("open_menu");
    const menuIconClose = document.getElementById("close_menu");
    const menuBox = document.getElementsByClassName("container")[0];
    const menu = document.getElementsByTagName("nav")[0];

    if (menuIconOpen.classList.contains("show")) {
      menuIconClose.classList.add("show");
      menuBox.classList.add("show_menu");
      menu.classList.add("show_menu");
    } else {
      menuIconOpen.classList.add("show");
      menuBox.classList.remove("show_menu");
      menu.classList.remove("show_menu");
    }
  };

  return (
    <header id="go_to_top" className={menuFixed ? "fixed_menu" : ""}>
      <div className="gradient">
        <div className="container">
          <h2 id="logo">
            <a href="/"> VERLEN </a>
          </h2>
          <img
            id="open_menu"
            className="menu_icon show"
            src="./assets/img/menu.png"
            alt="Open menu"
            onClick={toggleMenuOnClick}
          />
          <img
            id="close_menu"
            className="menu_icon"
            src="./assets/img/x.png"
            alt="Close menu"
            onClick={toggleMenuOnClick}
          />
          <nav>
            <a
              href="#go_to_top"
              className="menu_link active"
              onClick={smoothScroll}
            >
              {" "}
              Welcome{" "}
            </a>
            <a href="#about" className="menu_link" onClick={smoothScroll}>
              {" "}
              About{" "}
            </a>
            <a href="#menu" className="menu_link" onClick={smoothScroll}>
              {" "}
              Menu{" "}
            </a>
            <a href="#reservation" className="menu_link" onClick={smoothScroll}>
              {" "}
              Tables{" "}
            </a>
            <a href="#info" className="menu_link" onClick={smoothScroll}>
              {" "}
              Contact{" "}
            </a>
          </nav>
        </div>
      </div>
      <div className="welcome_container">
        <h1 className="highlight">Welcome</h1>
        <h1 className="brand"> The VERLEN </h1>
        <span className="symbol"> &#10059; </span>
        <h2> Ready to be opened </h2>
      </div>
    </header>
  );
};

export default Header;
