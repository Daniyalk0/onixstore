import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

function LoadingLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [loadingColor, setLoadingColor] = useState(true);
  const [loadingText, setLoadingText] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  useEffect(() => {

    const incrementLoadingText = () => {
      setLoadingText((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          return prev; 
        }
      });
    };

    const timerDelay = setTimeout(() => {
      const timer = setInterval(() => {
        incrementLoadingText();
      }, 15);

      return () => clearInterval(timer); 
    }, 100); 

    return () => {
      clearTimeout(timerDelay);
    };
  }, []); 

  useEffect(() => {
    document.body.classList.add("overflow-hidden");


    const colorTimer = setTimeout(() => {
      setLoadingColor(false); 
    }, 1800);


    const timer = setTimeout(() => {
      document.body.classList.remove("overflow-hidden"); 
      setLoading(false); 
    }, 2000);


    return () => {
      clearTimeout(timer);
      clearTimeout(colorTimer);
      document.body.classList.remove("overflow-hidden"); 
    };
  }, []);

  useEffect(() => {
    const scaleAnimation = gsap.fromTo(
      ".loading-text",
      { scale: 4, opacity: 0.4 }, 
      { scale: 7, opacity: 1, duration: 0.3 } 
    );

    return () => scaleAnimation.kill(); 
  }, [loadingText]); 

  return (
    <div className="w-full h-screen relative">
      <div
        className={`w-full h-[100%] bg-zinc-800 fixed z-[1200] ${
          loadingColor ? "translate-y-0" : "translate-y-[-100%]"
        } transition-all duration-500 ${!loading && "opacity-0"} ease-in-out`}
      ></div>
      <h1
        className={`loading-text text-white text-center transition-transform duration-300 font-integral2 scale-[4] fixed z-[1300] top-[50%] left-[50%] flex items-center justify-center ${
          !loading && "hidden"
        }`}
      >
        {loadingText}
        <p className="font-satoshi">%</p>
      </h1>
      <div
        className={`w-full h-[100%] bg-zinc-800 fixed z-[1200] ${
          loadingColor ? "translate-y-[50%] " : "translate-y-[100%]"
        } transition-all duration-500 ${!loading && "opacity-0"} ease-in-out`}
      ></div>

      <div className="w-full h-full">{children}</div>
    </div>
  );
}

export default LoadingLayout;
