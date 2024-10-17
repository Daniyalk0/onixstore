import React, { useEffect, useRef } from "react";
import Hamburger from "./menu/Hamburger";
import DesktopNav from "./menu/DesktopNav";
import Landing from "./Landing";
import NewArrivals from "./NewArrivals";
import ProductCard from "./ProductCard";
import TopSelling from "./TopSelling";
import Categories from "./Categories";
import Reviews from "./Reviews";
import Subscribe from "./Subscribe";
import Footer from "./Footer";
import { useMyContext } from "./Context";
import About from "./About";
import Signup from "../register/Signup";
import AuthLayout from "../register/AuthLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

function Home() {
  const { value, setValue, cartState, setCartState } = useMyContext();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []); // The empty dependency array ensures this runs only on mount


  return (
    <div
      className={`${cartState ? "brightness-75" : ""}`}
      onClick={() => setCartState(false)}
    >
      <Landing />
      <NewArrivals />
      <TopSelling />
      <Categories />
      <About />
      <Reviews />
    </div>
  );
}

export default Home;
