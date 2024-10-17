import React, { useEffect, useRef } from "react";
import Container from "./Container";
import { NavLink } from "react-router-dom";
import { useMyContext } from "./Context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Categories() {
  const { cartState, setCartState } = useMyContext();
  const containerRef = useRef(null);

  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault(); // Prevent navigation if cartState is true
    } else {
      setCartState(false); // Allow navigation and reset cartState
    }
  };

  useEffect(() => {

    gsap.fromTo(
      containerRef.current.querySelectorAll(".animate-me3"),
      { opacity: 0, y: 50 }, 
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: containerRef.current, 
          start: "top center", 
          toggleActions: "play none none none", 
        },
      }
    );

  }, []); 

  return (
    <Container>
      <div
        onClick={() => setCartState(false)}
        className=" w-full px-8 flex items-center flex-col xs:px-4 md:px-2 lg:py-8 xl:px-32 bg-white"
        ref={containerRef}
      >
        <div className="overflow-hidden  my-[25px]">
          <h1 className="font-integral text-[5.5vw]  md:text-[5vw] lg:font-integral2 lg:text-[3vw] text-center xl:font-semibold w-[50vw] leading-9  xl:text-[2vw] md:leading-10 animate-me3 ">
            browse by categories
          </h1>
        </div>
        <div className="w-full p-4 flex flex-col justify-center items-center capitalize font-satoshi font-semibold text-[4vw] md:text-[3vw] tracking-normal gap-5 xs:gap-8 md:gap-4  md:grid md:grid-rows-1 md:grid-cols-5 md:mt-[20px] xl:text-[1.5vw] animate-me3">
          <NavLink
            to={"/Men's Sneaker"}
            onClick={handleNavClick}
            className="relative mx-8 xl:h-[17vw] rounded-3xl overflow-hidden bg-[#ececec] w-[100%] h-[45vw] xs:mx-0 md:m-0 md:h-[30vw] col-start-1 col-end-3"
          >
            <h2 className="absolute left-[20px] top-[15px] lg:top-[2.5vw] lg:left-[3vw] xl:top-[1.5vw] xl:left-[2vw]">
              Sneekers
            </h2>
            <img
              src="/sneek.png"
              alt=""
              className="absolute right-[-24vw] top-[-25vw] scale-125 xs:scale-100 xs:right-[-25vw] xs:top-[-23vw] md:right-[-12vw] md:top-[-2vw] xl:scale-[1.1] xl:top-[-8vw] xl:right-[-10vw]"
            />
          </NavLink>
          <NavLink
            to={"/Men's Boot"}
            onClick={handleNavClick}
            className="relative mx-8 xl:h-[17vw] rounded-3xl overflow-hidden bg-[#ececec] w-[100%] h-[45vw] xs:mx-0 md:m-0 md:h-[30vw] col-start-3 col-end-6"
          >
            <h2 className="absolute left-[20px] top-[15px] lg:top-[2.5vw] lg:left-[3vw] xl:top-[1.5vw] xl:left-[2vw]">
              Boots
            </h2>
            <img
              src="/boots.png"
              alt=""
              className="absolute  right-[-19vw] top-[-5vw]  xs:right-[-20vw] xs:top-[-6vw] scale-[0.7] md:right-[-12vw] md:top-[-5vw] xl:scale-[0.6] xl:top-[-7vw] xl:right-[-10vw]"
            />
          </NavLink>

          <NavLink
            to={"/Cap"}
            onClick={handleNavClick}
            className="relative mx-8 xl:h-[17vw] rounded-3xl overflow-hidden bg-[#ececec] w-[100%] h-[45vw] xs:mx-0 md:m-0 md:h-[30vw] col-start-1 col-end-4"
          >
            <h2 className="absolute left-[20px] top-[15px] lg:top-[2.5vw] lg:left-[3vw] xl:top-[1.5vw] xl:left-[2vw]">
              Caps
            </h2>
            <img
              src="/cap (2).png"
              alt=""
              className="absolute right-[-19vw] top-[-12vw]  xs:right-[-20vw] xs:top-[-13vw] scale-[0.7] md:right-[-13vw] md:scale-[0.6] md:top-[-11vw] lg:top-[-9vw] lg:right-[-10vw] xl:right-[-6vw] xl:scale-50 "
            />
          </NavLink>

          <NavLink
            to={"/Bag"}
            onClick={handleNavClick}
            className="relative mx-8 xl:h-[17vw] rounded-3xl overflow-hidden bg-[#ececec] w-[100%] h-[45vw] xs:mx-0 md:m-0 md:h-[30vw] col-start-4 col-end-6"
          >
            <h2 className="absolute left-[20px] top-[15px] lg:top-[2.5vw] lg:left-[3vw] xl:top-[1.5vw] xl:left-[2vw]">
              Bags
            </h2>
            <img
              src="/bag.png"
              alt=""
              className="absolute right-[-19vw] top-[-35vw]  xs:right-[-20vw] xs:top-[-39vw] scale-[0.7] md:top-[-13vw] md:right-[-9vw] md:scale-100 xl:scale-75 xl:top-[-16vw]"
            />
          </NavLink>
        </div>
      </div>
    </Container>
  );
}

export default Categories;
