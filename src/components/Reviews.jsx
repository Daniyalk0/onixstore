import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@smastrom/react-rating/style.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import { FaArrowLeft } from "react-icons/fa";
import Container from "./Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


function Reviews() {
  const swiperRef = useRef(null);
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
            start: "bottom bottom", 
            toggleActions: "play none none none", 
          },
        }
      );

  }, []);

  return (
    <Container>

    <div  className="w-full px-6 my-10 lg:px-8 bg-white xs:my-[-1px] xs:py-10 " ref={containerRef}>
      <div className="flex items-center w-full justify-between xl:px-14 overflow-hidden">
        <h1 className="font-integral text-[5.5vw] animate-me3  md:text-[5vw] lg:font-integral2 lg:text-[3.5vw] text-left xl:font-semibold xl:text-[2vw] capitalize w-[40vw] leading-10 xs:leading-8 xl:mt-[20px]">
          our happy customers
        </h1>
        <div className="arrow flex gap-4 lg:gap-8 animate-me3">
          <FaArrowLeft
            className="text-[5vw] xl:text-[1.5vw] md:text-[5vw] lg:font-integral2 lg:text-[3vw] "
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <FaArrowRight
            className="text-[5vw] xl:text-[1.5vw] md:text-[5vw] lg:font-integral2 lg:text-[3vw] "
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
      <Swiper


        slidesPerView="auto"
        className="h-auto"
        speed={700}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            // slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        <div className="xl:w-full xl:flex xl:justify-center xl:items-center ">
          <SwiperSlide className="flex justify-center items-center xl:w-auto z-[1] animate-me3">
            <div className=" font-satoshi px-[8vw] py-8 gap-2 flex flex-col xs:px-[4vw] bg-[#ededed] mt-[50px] rounded-xl md:w-[43vw] md:px-[3vw] md:mt-[90px] lg:w-full xl:px-4 xl:w-[25vw] xl:mt-[50px]">
              <div className="stars w-[14vw] md:w-[15vw] xl:w-[6vw]">
                <Rating
                  style={{ maxWidth: 400 }}
                  value={2}
                  readOnly
                  className=""
                />
              </div>
              <div className="name font-semibold flex items-center capitalize gap-1 md:text-[2.4vw] md:gap-2 lg:text-[1.9vw] xl:text-[1.1vw] xl:gap-[2px]">
                james .h
                <RiVerifiedBadgeFill className="text-green-700 mt-[0.5vw] lg:mt-0" />
              </div>
              <div className="para text-zinc-500 tracking-normal xs:leading-4 text-[2.7vw] leading-6 md:text-[2.4vw] lg:text-[1.7vw] xl:text-[0.9vw] xl:leading-4 xl:w-[90%] 2xl:leading-6 xs:w-[90%]">
                "I'm blown away by the quality and style of the clothes I
                received from Shop.co. From casual wear to elegant dresses,
                every piece I've bought has exceeded my expectations.”
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center xl:w-auto animate-me3">
            <div className=" font-satoshi px-[8vw] py-8 gap-2 flex flex-col xs:px-[4vw] bg-[#ededed] mt-[50px] rounded-xl md:w-[43vw] md:px-[3vw] md:mt-[90px]  lg:w-full xl:px-4 xl:w-[25vw] xl:mt-[50px]">
              <div className="stars w-[14vw] md:w-[15vw] xl:w-[6vw]">
                <Rating
                  style={{ maxWidth: 400 }}
                  value={2}
                  readOnly
                  className=""
                />
              </div>
              <div className="name font-semibold flex items-center capitalize gap-1 md:text-[2.4vw] md:gap-2 lg:text-[1.9vw] xl:text-[1.1vw] xl:gap-[2px]">
                james .h
                <RiVerifiedBadgeFill className="text-green-700 mt-[0.5vw] lg:mt-0" />
              </div>
              <div className="para text-zinc-500 tracking-normal text-[2.7vw] leading-6 md:text-[2.4vw] lg:text-[1.7vw] xl:text-[0.9vw] xl:leading-4 xl:w-[90%] 2xl:leading-6">
                "I'm blown away by the quality and style of the clothes I
                received from Shop.co. From casual wear to elegant dresses,
                every piece I've bought has exceeded my expectations.”
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center xl:w-auto animate-me3">
            <div className=" font-satoshi px-[8vw] py-8 gap-2 flex flex-col xs:px-[4vw] bg-[#ededed] mt-[50px] rounded-xl md:w-[43vw] md:px-[3vw] md:mt-[90px]  lg:w-full xl:px-4 xl:w-[25vw] xl:mt-[50px]">
              <div className="stars w-[14vw] md:w-[15vw] xl:w-[6vw]">
                <Rating
                  style={{ maxWidth: 400 }}
                  value={2}
                  readOnly
                  className=""
                />
              </div>
              <div className="name font-semibold flex items-center capitalize gap-1 md:text-[2.4vw] md:gap-2 lg:text-[1.9vw] xl:text-[1.1vw] xl:gap-[2px]">
                james .h
                <RiVerifiedBadgeFill className="text-green-700 mt-[0.5vw] lg:mt-0" />
              </div>
              <div className="para text-zinc-500 tracking-normal text-[2.7vw] leading-6 md:text-[2.4vw] lg:text-[1.7vw] xl:text-[0.9vw] xl:leading-4 xl:w-[90%] 2xl:leading-6">
                "I'm blown away by the quality and style of the clothes I
                received from Shop.co. From casual wear to elegant dresses,
                every piece I've bought has exceeded my expectations.”
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center xl:w-auto animate-me3">
            <div className=" font-satoshi px-[8vw] py-8 gap-2 flex flex-col xs:px-[4vw] bg-[#ededed] mt-[50px] rounded-xl md:w-[43vw] md:px-[3vw] md:mt-[90px]  lg:w-full xl:px-4 xl:w-[25vw] xl:mt-[50px]">
              <div className="stars w-[14vw] md:w-[15vw] xl:w-[6vw]">
                <Rating
                  style={{ maxWidth: 400 }}
                  value={2}
                  readOnly
                  className=""
                />
              </div>
              <div className="name font-semibold flex items-center capitalize gap-1 md:text-[2.4vw] md:gap-2 lg:text-[1.9vw] xl:text-[1.1vw] xl:gap-[2px]">
                james .h
                <RiVerifiedBadgeFill className="text-green-700 mt-[0.5vw] lg:mt-0" />
              </div>
              <div className="para text-zinc-500 tracking-normal text-[2.7vw] leading-6 md:text-[2.4vw] lg:text-[1.7vw] xl:text-[0.9vw] xl:leading-4 xl:w-[90%] 2xl:leading-6">
                "I'm blown away by the quality and style of the clothes I
                received from Shop.co. From casual wear to elegant dresses,
                every piece I've bought has exceeded my expectations.”
              </div>
            </div>
          </SwiperSlide>
        </div>

      </Swiper>
    </div>
        </Container>
  );
}

export default Reviews;
