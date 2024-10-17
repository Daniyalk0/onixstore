import React, { useEffect, useRef, useState } from "react";
import GlobalBtn from "./GlobalBtn";
import Container from "./Container";
import { useMyContext } from "./Context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const containerRef = useRef(null);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("hasAnimated");

    if (!hasAnimated) {
      gsap.fromTo(
        ".animate-me",
        {
          opacity: 0, 
          y: 50, 
        },
        {
          opacity: 1,
          y: 0, 
          duration: 1.5, 
          delay: 2.2, 
        }
      );

      sessionStorage.setItem("hasAnimated", "true");
    }else{
      gsap.fromTo(
        ".animate-me",
        {
          opacity: 0, 
          y: 50,
        },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          delay: 0.2, 

        }
      );
    }
  }, []); 

  useEffect(() => {

      gsap.fromTo(
        containerRef.current.querySelectorAll(".animate-me2"),
        { opacity: 0, y: 50 }, 
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current, 
            start: "bottom bottom", 
            toggleActions: "play none none none", 
          },
        }
      );
    
  }, []);

  return (
    <Container>
      <div className={`w-full xl:pt-[5.4vw] pt-[22vw]   bg-white`}>
        <div className="flex flex-col lg:flex-row lg:items-start xl:pb-4">
          <div className="w-full py-6 xs:px-3 xs:py-4 sm:px-3 md:px-6 md:py-8 lg:pl-14 lg:pr-0 lg:w-[60%] lg:mt-[90px] xl:px-14 2xl:px-8">
            <div className="font-integral text-[7vw] leading-none md:text-[6vw] lg:font-integral2 lg:text-[4vw] overflow-hidden">
              <h1 className="animate-me">FIND CLOTHES</h1>
              <h1 className="animate-me">THAT MATCHES </h1>
              <h1 className="animate-me">YOUR STYLE</h1>
            </div>
            <div className="overflow-hidden">
              <p className="font-satoshi text-zinc-500 mt-[14px] pr-6 md:w-[80vw] md:mt-[20px] lg:w-[47vw] animate-me">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
            </div>

            <div className="overflow-hidden">
              <GlobalBtn
              route={"/Men's Sneaker"}
                text={"shop now"}
                className={
                  " w-[95vw] text-[2.2vw] py-3 mt-[15px] md:w-[94vw] md:mt-[25px] lg:w-[20vw] lg:text-[1.1vw] xl:w-[13vw] xxs:w-[93vw] animate-me" 
                }
                />
            </div>
            <div className="flex w-full items-center justify-center gap-7 flex-wrap mt-[35px] xs:ml-[20px] lg:flex-row lg:flex-nowrap xl:ml-0 xl:justify-start overflow-hidden">
              <div className="font-satoshi capitalize animate-me">
                <div className="leading-8 border-r-[2px] border-zinc-300 inline-block pr-2 xs:pr-4 md:leading-normal xl:leading-8">
                  <h2 className="text-[6vw] font-semibold xs:text-[6.5vw] lg:text-[3vw]">
                    200+
                  </h2>
                  <p className="text-[2.7vw] text-zinc-500 xs:text-[3.1vw] lg:text-[1.5vw] xl:text-[1vw]">
                    international brands
                  </p>
                </div>
              </div>
              <div className="font-satoshi capitalize animate-me">
                <div className="leading-8 border-r-[2px] border-zinc-300 inline-block pr-2 xs:border-none md:leading-normal xl:leading-8">
                  <h2 className="text-[6vw] font-semibold xs:text-[6.5vw] lg:text-[3vw]">
                    2,000+
                  </h2>
                  <p className="text-[2.7vw] text-zinc-500 xs:text-[3.1vw] lg:text-[1.5vw] xl:text-[1vw]">
                    high quality products
                  </p>
                </div>
              </div>
              <div className="font-satoshi capitalize animate-me">
                <div className="leading-8 inline-block pr-4 md:leading-normal xl:leading-8">
                  <h2 className="text-[6vw] font-semibold xs:text-[6.5vw] lg:text-[3vw]">
                    30,000+
                  </h2>
                  <p className="text-[2.7vw] text-zinc-500 xs:text-[3.1vw] lg:text-[1.5vw] pr-[30px] xl:text-[1vw]">
                    happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="image mt-[40px] flex items-center relative   py-6 xs:px-3 xs:py-3 sm:px-3 justify-center md:mt-[20px] xs:mt-[0px] lg:mt-[30px] lg:mr-[20px] overflow-hidden">
            <img
              src="Vector (1).png"
              alt=""
              className="star1 absolute bottom-0 left-2 xs:w-[10vw] xs:bottom-2 lg:bottom-10 lg:left-8 lg:w-[3vw] animate-me"
            />
            <img
              src="Vector.png"
              alt=""
              className="star2 absolute top-[-4vw] right-[1vw] md:right-[4vw] md:top-[-2vh] xs:w-[20vw] lg:top-[-0vw] lg:w-[5vw] animate-me"
            />
            <img
              src="/image.png"
              alt="Rectangle Image"
              className="w-[90vw] lg:w-[100vw] animate-me"
            />
          </div>
        </div>
        <div
          className="brands bg-zinc-900 px-6 py-10 mt-[30px] mb-0 flex items-center justify-around flex-wrap gap-4 lg:gap-0 lg:mt-0 xl:justify-center xl:gap-32 "
          ref={containerRef}
        >
          <img
            src="./brands/versace.png"
            alt=""
            className="xl:scale-120 animate-me2"
          />
          <img
            src="./brands/zara.png"
            alt=""
            className="xl:scale-120 animate-me2"
          />
          <img
            src="./brands/gucci.png"
            alt=""
            className="xl:scale-120 animate-me2"
          />
          <img
            src="./brands/prada.png"
            alt=""
            className="xl:scale-120 animate-me2"
          />
          <img
            src="./brands/calvin.png"
            alt=""
            className="xl:scale-120 animate-me2"
          />
        </div>
      </div>
    </Container>
  );
}

export default Landing;
