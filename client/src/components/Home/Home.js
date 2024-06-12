import React, { useEffect, useRef, useState } from "react";
import kabobImage from "../../assets/images/kabob.jpg";
import limesImage from "../../assets/images/limes.jpg";
import radishImage from "../../assets/images/radish.jpg";
import cornImage from "../../assets/images/corn.jpg";
import foodIcon01 from "../../assets/images/food_icon01.jpg";
import foodIcon02 from "../../assets/images/food_icon02.jpg";
import beerImage from "../../assets/images/beer_spec.jpg";
import breadImage1 from "../../assets/images/bread1.jpg";
import breadImage2 from "../../assets/images/bread2.jpg";
import slider1Image from "../../assets/images/slider1.jpg";
import slider2Image from "../../assets/images/slider2.jpg";
import slider3Image from "../../assets/images/slider3.JPG";
import "../Home/Home.scss";

function Home() {
  return (
    <main>
      <section id="about" className="breakpoint">
        <div className="content">
          <h1 className="highlight">Discover</h1>
          <h1 className="topic">our story</h1>
          <p className="symbol">&#10059;</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nisl
            augue, pulvinar a arcu id, porttitor consequat risus. Vivamus congue
            lacus non sem eleifend vestibulum. Morbi pulvinar ligula vitae
            ornare faucibus.
          </p>
          <h2>
            <a href="#">About us</a>
          </h2>
        </div>
        <div className="img_container">
          <img
            src="./assets/img/tomatoes.jpg"
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
            src="./assets/img/menu1.jpg"
            title="Fresh salad"
            alt="Fresh salad image"
          />
          <img
            className="align_end"
            src="./assets/img/menu2.jpg"
            title="Fresh fancy salad"
            alt="Fresh fancy salad image"
          />
          <img
            className="align_start"
            src="./assets/img/menu3.jpg"
            title="Mushroom dish with legumes"
            alt="Mushroom dish with legumes image"
          />
          <img
            className="align_start"
            src="./assets/img/menu4.jpg"
            title="Dessert with lemon"
            alt="Dessert with lemon image"
          />
        </div>
        <div className="content">
          <h1 className="highlight">Discover</h1>
          <h1 className="topic">our menu</h1>
          <p className="symbol">&#10059;</p>
          <p>
            In consectetur sit amet lectus vitae blandit. Aenean eget augue
            eleifend, ultricies neque consequat, tincidunt elit. In hac
            habitasse platea dictumst. Phasellus interdum libero ut libero
            hendrerit.
          </p>
          <h2>
            <a href="#">View the full menu</a>
          </h2>
        </div>
      </section>

      <section className="divider">
        <h1 className="highlight">The perfect</h1>
        <h1 className="topic">blend</h1>
      </section>

      <section id="reservation" className="breakpoint">
        <div className="content">
          <h1 className="highlight">Culinary</h1>
          <h1 className="topic">delight</h1>
          <p className="symbol">&#10059;</p>
          <p>
            Vestibulum mollis tempus eros eu egestas. Vivamus congue lacus non
            sem eleifend vestibulum. Morbi pulvinar ligula vitae ornare
            faucibus. Nulla facilisi.
          </p>
          <h2>
            <a href="#">Make a reservation</a>
          </h2>
        </div>
        <div className="img_container">
          <img
            src="./assets/img/meat.jpg"
            title="Meat and cheese"
            alt="Sandwiches image"
          />
          <img
            src="./assets/img/sandwiches.jpg"
            title="Sandwiches"
            alt="Sandwiches image"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
