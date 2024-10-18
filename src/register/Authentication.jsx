import React, { useEffect, useRef } from "react";
import Login from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { useMyContext } from "../components/Context";
import { gsap } from "gsap";

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isLogin, handleToggle, isAnimating, animatee } = useMyContext();
  useEffect(() => {
    console.log(isAnimating);
    
  }, [isAnimating])

  useEffect(() => {
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
        delay: 0.3,
      }
    );
  }, []);


  
  return (
    <div className="w-full h-screen  flex justify-center items-center xl:mt-[3vw] lg:mt-[3vw] md:mt-[3.5vw] mt-[3vw] xs:h-[170vw] xxs:h-[180vw] animate-me">
      <div className={` w-[85%] xs:w-[95%] h-[112vw] xs:mt-[13vw] xs:h-[80%]   md:w-[80%] md:h-[80vw] xl:w-[60%]  flex items-center justify-between rounded-2xl overflow-hidden lg:w-[80%]  xxs:mt-[20vw] ${isAnimating ? 'xl:h-[0px] lg:h-[0px] md:h-[0px] h-[0px] xs:h-[0px] xxs:h-[0px]' : 'xl:h-[540px] lg:h-[800px] md:h-[750px] h-[700px] xs:h-[590px] xxs:h-[77%]'} transition-all duration-500 border-2 border-black `}>

        <div className="h-full w-full flex justify-center items-center lg:w-[70%] md:w-[75%] ">
          {isLogin ? (
            <Login handleToggle={handleToggle} />
          ) : (
            <Signup
              className="xl:h-full xl:w-full "
              handleToggle={handleToggle}
            />
          )}
        </div>

        <div
          className="w-[40%] h-[100%] rounded-r-full hidden md:block lg:w-[30%] md:w-[25%] transition-all duration-500 tranlate-x-[20vw]"
          style={{
            backgroundImage: `url(${isLogin ? "login.png" : "signup.png"})`,

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Authentication;
