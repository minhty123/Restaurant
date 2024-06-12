import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="row">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              Restaurant
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav main-nav clear navbar-right">
              <li>
                <a className="navactive color_animation" href="#top">
                  WELCOME
                </a>
              </li>
              <li>
                <a className="color_animation" href="#story">
                  ABOUT
                </a>
              </li>
              <li>
                <a className="color_animation" href="#pricing">
                  PRICING
                </a>
              </li>
              <li>
                <a className="color_animation" href="#beer">
                  BEER
                </a>
              </li>
              <li>
                <a className="color_animation" href="#bread">
                  BREAD
                </a>
              </li>
              <li>
                <a className="color_animation" href="#featured">
                  FEATURED
                </a>
              </li>
              <li>
                <a className="color_animation" href="#reservation">
                  RESERVATION
                </a>
              </li>
              <li>
                <a className="color_animation" href="#contact">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
