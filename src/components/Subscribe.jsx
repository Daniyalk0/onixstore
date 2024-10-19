import React, { useEffect, useState, useRef } from "react";
import Container from "./Container";
import { MdEmail } from "react-icons/md";
import { useMyContext } from "./Context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Subscribe() {
  const containerRef = useRef(null);


  const {value, setValue, cartState, setCartState} = useMyContext()
  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault();
    } else {
      setCartState(false); 
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
            start: "center bottom", 
            toggleActions: "play none none none", 
          },
        }
      );


  }, []); 


  return (
    <Container>
      <div onClick={() => setCartState(false)} className={`w-full overflow-hidden flex justify-center  ${value ? 'hidden' : ''} bg-white ${cartState ? 'brightness-75' : ''}`} id="subscribe" ref={containerRef}>
        <div className="mt-[40px] mb-[20px] h-auto   px-8 bg-black text-white w-[90%] flex flex-col justify-evenly xl:justify-around xl:px-0 xl:py-6 rounded-3xl py-10 gap-8 lg:flex-row lg:items-center animate-me3">
          <h1 className="font-integral text-[6vw]  md:text-[5vw] lg:font-integral2 lg:text-[3.5vw] text-left xl:font-semibold xl:text-[2.5vw] capitalize  leading-[7vw] xs:leading-8 tracking-wide  xs:tracking-wider xs:text-[6vw] lg:leading-10 xl:w-[40%] 2xl:text-[2vw]">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h1>
          <div className="email-cont w-[100%] font-satoshi flex flex-col gap-4 capitalize relative xl:w-[30%]">
              <MdEmail  className="absolute left-[3%] text-zinc-400 text-[4vw] top-[15%] md:top-[13%] lg:w-[3vw] lg:top-[9%] lg:left-[5%] xl:top-[12%] xl:left-[1%] xl:text-[1.5vw] 2xl:top-[11%] xs:left-[4%] xs:top-[2.7vw] xs:text-[5vw]"/>
            <input
              type="text"
              name=""
              onClick={handleNavClick}
              id=""
              className=" rounded-full pl-14 text-zinc-700 w-full bg-white text-[3vw] px-6 py-4 font-semibold xl:text-xs xl:font-semibold 2xl:py-[1.8vh] placeholder:text-[2.5vw] border-none outline-none xs:pl-10 md:pl-16 placeholder:text-lg lg:pt-1 lg:pb-3 xl:pt-4 xl:placeholder:text-[1vw] xl:pl-12 xl:pb-3 xl:placeholder:font-normal xl:text-[2vw] 2xl:pb-5 2xl:pt-6 2xl:placeholder:text-[0.9vw] 2xl:pl-14 xs:placeholder:text-[3vw] xs:placeholder:font-normal xs:pt-3 xs:pb-3 placeholder:text-zinc-400"
              placeholder="Enter Your Email Address"
            />
            <button 
              onClick={handleNavClick}
              className="px-6 py-4 bg-white text-black rounded-full w-full text-[3vw] capitalize font-semibold lg:text-[2vw] xl:text-[1vw] xl:py-3">
              subscribe to newsletter
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Subscribe;
