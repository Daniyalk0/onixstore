import React, { useEffect, useState, useRef } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import Container from "./Container";
import { useMyContext } from "./Context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const { value, setValue, cartState, setCartState } = useMyContext();
  const containerRef = useRef(null);

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
      <div
        className={`w-full px-6 py-8 md:px-7 xl:px-16 xl:mt-[2vw] ${
          value ? "hidden" : ""
        } ${cartState ? "brightness-75" : ""} bg-white`}
        onClick={() => setCartState(false)}
        ref={containerRef}
      >
        <div className="preFooter xl:flex xl:items-center xl:justify-between">
          <div className="logoSocials flex flex-col gap-3 xl:w-[16vw] xl:gap-4">
            <div
              className={`logo uppercase font-integral  text-[4.5vw] scale-y-400  transition-all duration-300 xl:text-[2.2vw] tracking-tight xs:text-[6vw] lg:text-[4vw] overflow-hidden`}
            >
              <h1 className="animate-me3">onixstore</h1>
            </div>
            <div className="overflow-hidden">
              <p className="font-satoshi text-[3vw] text-zinc-500 w-[85vw] leading-6 xs:text-[3.6vw] xs:w-full xs:text-zinc-500 lg:text-[2.5vw] xl:text-[0.9vw] xl:w-full xl:tracking-tight xl:leading-4 xl:text-zinc-500 2xl:leading-6 animate-me3">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
            </div>
            <div className="socials flex gap-5 text-[3vw] text-white mt-[4vw] xs:gap-3 xl:gap-2 xl:mt-3 overflow-hidden">
              <div className="border-[1px] border-[#3a3a3abf] xl:border-[#c2c2c2] p-4 rounded-full text-black text-[3.5vw] md:text-[2.5vw] xl:text-[1vw] xl:px-2 xl:h-0 xl:flex justify-center items-center xl:py-[1.1vw] animate-me3">
                <FaTwitter />
              </div>
              <div className=" p-4 rounded-full bg-black text-[3.5vw] md:text-[2.5vw] text-white xl:text-[1.1vw] xl:px-2 xl:h-0 xl:flex justify-center items-center xl:py-[1.2vw] animate-me3">
                <FaFacebookF />
              </div>
              <div className="border-[1px] border-[#3a3a3abf] xl:border-[#c2c2c2] p-4 rounded-full text-black text-[3.5vw] md:text-[2.5vw] xl:text-[1vw] xl:px-2 xl:h-0 xl:flex justify-center items-center xl:py-[1.1vw] animate-me3">
                <FaInstagram />
              </div>
              <div className="border-[1px] border-[#3a3a3abf] xl:border-[#c2c2c2] p-4 rounded-full text-black text-[3.5vw] md:text-[2.5vw] xl:text-[1vw] xl:px-2 xl:h-0 xl:flex justify-center items-center xl:py-[1.1vw] animate-me3">
                <FaGithub />
              </div>
            </div>
          </div>
          <div className="links capitalize font-satoshi mt-[10vw] grid grid-cols-2 gap-12 xl:grid-cols-4 xl:mt-0 xl:gap-[7vw] 2xl:gap-14">
            <div className="flex flex-col gap-[3vw] lg:gap-[2vw] xl:gap-3">
              <div className="overflow-hidden">
                <h2 className="uppercase text-zinc-900 tracking-[1vw] text-[4vw] md:text-[3vw] md:tracking-[0.7vw] xl:text-[1.1vw] xl:tracking-[0.2vw] font-semibold xl:mb-2 animate-me3">
                  company
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  about
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  features
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  work
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  career
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-[3vw] lg:gap-[2vw] xl:gap-3">
              <div className="overflow-hidden">
                <h2 className="uppercase text-zinc-900 tracking-[1vw] text-[4vw] md:text-[3vw] md:tracking-[0.7vw] xl:text-[1.1vw] xl:tracking-[0.2vw] font-semibold xl:mb-2 animate-me3">
                  help
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  customer support
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  delivery details
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  terms & conditions
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  privacy policy
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-[3vw] lg:gap-[2vw] xl:gap-3">
              <div className="overflow-hidden">
                <h2 className="uppercase text-zinc-900 tracking-[1vw] text-[4vw] md:text-[3vw] md:tracking-[0.7vw] xl:text-[1.1vw] xl:tracking-[0.2vw] font-semibold xl:mb-2 animate-me3">
                  faq
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  account
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  manage deliveries
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  orders
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  payment
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-[3vw] lg:gap-[2vw] xl:gap-3">
              <div className="overflow-hidden">
                <h2 className="uppercase text-zinc-900 tracking-[1vw] text-[4vw] md:text-[3vw] md:tracking-[0.7vw] xl:text-[1.1vw] xl:tracking-[0.2vw] font-semibold xl:mb-2 animate-me3">
                  resources
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  free ebook
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                  development tutorial
                </h2>
              </div>
              <div className="overflow-hidden">

              <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                how to - blog
              </h2>
              </div>
              <div className="overflow-hidden">

              <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] animate-me3">
                youtube playlist
              </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomFooter border-t-[1px] border-[#878787a5] mt-[15vw] flex flex-col justify-center items-center pt-8 xl:mt-[5vw] xl:flex-row xl:justify-between">
        <div className="overflow-hidden">

          <h2 className="text-[4vw] md:text-[3vw] xl:text-[1.1vw] text-zinc-500 lg:text-[2.5vw] 2xl:text-[1vw] font-satoshi animate-me3">
            Shop.co © 2000-2024, All Rights Reserved
          </h2>
          </div>
          <div className="flex items-center justify-center mt-[2vw] xl:mt-[0.7vw] overflow-hidden">
            <img
              src="Badge (5).png"
              alt=""
              className="w-[17vw] md:w-[12vw] -mx-[2vw] xl:w-[4.5vw] xl:-mx-[0.3vw] animate-me3"
            />
            <img
              src="Badge (1).png"
              alt=""
              className="w-[17vw] md:w-[12vw] -mx-[2vw] xl:w-[4.5vw] xl:-mx-[0.3vw] animate-me3"
            />
            <img
              src="Badge (2).png"
              alt=""
              className="w-[17vw] md:w-[12vw] -mx-[2vw] xl:w-[4.5vw] xl:-mx-[0.3vw] animate-me3"
            />
            <img
              src="Badge (3).png"
              alt=""
              className="w-[17vw] md:w-[12vw] -mx-[2vw] xl:w-[4.5vw] xl:-mx-[0.3vw] animate-me3"
            />
            <img
              src="Badge (4).png"
              alt=""
              className="w-[17vw] md:w-[12vw] -mx-[2vw] xl:w-[4.5vw] xl:-mx-[0.3vw] animate-me3"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
