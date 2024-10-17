import React, { useEffect, useRef, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import { useScroll, motion, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function About({ scrollref }) {
  const textRef = useRef();
  const TEXTS = ["Sneakers", "Boots", "Caps", "Bags"];

  const [Index, setindex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setindex((index) => index + 1),
      3100 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  
  const containerRef = useRef();
  useEffect(() => {
 
    const text = new SplitType(textRef.current, { types: 'words' });
    

    gsap.from(text.words, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        markers: false,
        toggleActions: 'play play reverse reverse',
      },
      opacity: 0.2,
      stagger: 0.04,
    });

    return () => {
      gsap.killTweensOf(text.words); 
    };
  }, []); 

  const images = [
    "https://e1.pxfuel.com/desktop-wallpaper/160/566/desktop-wallpaper-jordan-bred-4-jordan-4.jpg",
    "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?cs=srgb&dl=pexels-lilartsy-1159670.jpg&fm=jpg",
    "https://st3.depositphotos.com/13349494/18142/i/450/depositphotos_181420258-stock-photo-one-grey-cap-wooden-table.jpg",
    "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 
    );
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const containerRef2 = useRef()

  useEffect(() => {

    gsap.fromTo(
      containerRef2.current.querySelectorAll(".animate-me3"),
      { opacity: 0, y: 50 }, 
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: containerRef2.current, 
          start: "center bottom", 
          toggleActions: "play none none none", 
        },
      }
    );

   
  }, []); 

  return (
    <div
      id="about"
      className="w-full min-h-[600px]   md:min-h-[800px] xs:min-h-[500px] xl:mt-[2vw] mt-[5vw] flex flex-col items-center px-12 relative overflow-hidden xs:px-1 xs:mt-10 lg:px-7 xl:px-16 xl:min-h-[650px] " ref={containerRef2}
    >
      <div className="overflow-hidden">

      <h1 className="font-integral text-[5.5vw] text-center md:text-[5vw]  lg:text-[3vw] xl:font-semibold xl:text-[2vw] animate-me3">
        about us
      </h1>
      </div>
      <div className="lg:flex  lg:mt-[8vw] xl:mt-[0vw] w-full text-cont    my-3  animate-me3">
        <div className="w-full flex  items-center justify-between relative lg:my-[9vw]  flex-col my-[3vw] md:flex-row md:gap-14 xl:my-[0vw] xl:mt-[10vw]">
          <div
            className="  w-[100%] xs:w-[90%] xl:w-[50%] flex xxs:w-[85%] md:w-[70%] xl:mb-[3vw] "
            ref={containerRef}
          >
            <p className="text-[3vw] pacifico-regular text-justify md:text-[2vw] xl:leading-9 " ref={textRef}>
              OnixStore is an e-commerce platform specializing in stylish
              sneakers, caps, bags, and boots. It offers a seamless shopping
              experience for fashion enthusiasts. Shoppers can easily browse
              through a wide selection of trendy items. With its focus on
              quality and style, OnixStore helps customers stay on top of the
              latest fashion trends. Elevate your wardrobe with unique and
              fashionable pieces from OnixStore.
            </p>
          </div>
          <div className=" w-[80%] h-[80vw]  xs:w-[80%] xs:h-[94vw] relative z-[10] rounded-md overflow-hidden  mt-[2vw] lg:mt-[-10vw] lg:w-[80%] lg:h-[55vw] xl:w-[37vw] xl:h-[40vw] xl:mt-[-8vw]  md:h-[65vw] ">

            <div className="bg-white h-full">
              {" "}
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="image-container "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 1 }}
                  style={{
                    backgroundImage: `url(${image}) `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
              ))}
              <h1
                className={`text-shadow-outline relative w-full h-full flex justify-center items-center ${
                  currentIndex === 1
                    ? "text-[#C18900]"
                    : currentIndex === 0
                    ? "text-[#ff2525]"
                    : currentIndex == 2
                    ? "text-[#303235]"
                    : currentIndex === 3
                    ? "text-white"
                    : ""
                } transition-all duration-200`}
              >
                <TextTransition
                  className=" font-integral text-xl xl:text-3xl xl:font-integral2 tracking-wider"
                  springConfig={presets.wobbly}
                >
                  {TEXTS[index % TEXTS.length]}
                </TextTransition>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
