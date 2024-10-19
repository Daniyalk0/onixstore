import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";
import { useMyContext } from "./Context";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FaCheck } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import GlobalBtn from "./GlobalBtn";

function Filter({ className, setFiltered2, datad }) {
  const { value, setValue, isAnimate, animate, cartState, setCartState } =
    useMyContext();
  const [PriceShow, setPriceShow] = useState(true);
  // console.log("datad:", datad);
  const [ColorsShow, setColorsShow] = useState(null);
  const [ColorsShowState, setColorsShowState] = useState(true);
  const [Size, setSize] = useState(true);
  const [SizeValue, setSizeValue] = useState("medium");
  const [colorValue, setColorValue] = useState("");
  const [valuee, setValuee] = React.useState([0, 500]);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValuee(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault();
      setCartState(false); 
    } else {
      setCartState(false); 
    }
  };

  const filterBy = () => {

    const filteredByAnyCondition = datad?.filter((product) => {
      const isWithinPriceRange =
        valuee.length > 0
          ? product?.price >= valuee[0] && product?.price <= valuee[1]
          : true;
      console.log(
        `Product price: ${product?.price}, isWithinPriceRange: ${isWithinPriceRange}`
      );

      // Check if the product's color matches the selected color
      const isMatchingColor =
        colorValue !== ""
          ? product?.color &&
            product?.color.toLowerCase() === colorValue.toLowerCase()
          : true;
      console.log(
        `Product color: ${product?.color}, Selected color: ${colorValue}, isMatchingColor: ${isMatchingColor}`
      );

      // Check if the product's size matches the selected size
      const isMatchingSize =
        SizeValue !== ""
          ? product?.size &&
            product?.size.toLowerCase() === SizeValue.toLowerCase()
          : true;
      console.log(
        `Product size: ${product?.size}, Selected size: ${SizeValue}, isMatchingSize: ${isMatchingSize}`
      );

      // Include the product if it matches any of the conditions
      return isWithinPriceRange && isMatchingColor && isMatchingSize;
    });

    console.log("Filtered products:", filteredByAnyCondition); // Check the filtered results

    setFiltered2(filteredByAnyCondition);
  };


  const [hasRun, setHasRun] = useState(false); // Track if useEffect has run

    useEffect(() => {
        // This will run only once when the component mounts
        if (!hasRun && datad && datad.length > 0) {

            const filteredByPrice = datad.filter((product) => {
                return product.price >= valuee[0] && product.price <= valuee[1];
            });

            setFiltered2(filteredByPrice);
            setHasRun(true); // Mark as run
        }
    }, [hasRun, datad]); 

  return (
    <div
      className={`${className} ${
        animate ? "opacity-0 md:opacity-100" : "opacity-1"
      }   z-[1000] xs:z-[999] md:z-0 transition-all duration-500 w-full  xs:left-0   md:min-h-[875px] xl:min-h-[600px] min-h-screen xs:min-h-screen xs:top-[26vw] lg:min-h-[930px]  px-8 py-8  bg-zinc-100  absolute  md:relative left-0 md:w-[20vw] overflow-y-auto    ${
        value
          ? "top-[-16vw] xs:top-[-26.1vw] md:top-0 xxs:top-[-26vw]"
          : "top-[95vh]  md:top-0 xs:top-[80vh] "
      } md:px-0 md:pl-3 lg:px-0 xl:px-2 md:py-2 lg:mr-5 lg:mt-7`}
    >
      <div
        className="w-full flex justify-between items-center "
        onClick={handleNavClick}
      >
        <h1 className="font-satoshi text-2xl font-semibold xs:text-xl md:hidden">
          Filters
        </h1>
        <RxCross2
          className="text-3xl xs:text-xl md:hidden"
          onClick={() => {
            isAnimate();
            handleNavClick();
          }}
        />
      </div>
      <div className="categories w-full mt-6 flex flex-col justify-center items-center gap-3 xs:mt-3 md:mt-0 xl:gap-2 xl:mt-[0vw] ">
        <NavLink
          to={"/Men's Boot"}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e); 
            } else {
              setValue(false); 
              isAnimate();
            }
          }}
          className={`w-[90%] md:w-[100%] flex items-center justify-center gap-[60vw] md:gap-[9vw] text-zinc-500 bg-[#F0EEED] py-3 rounded-2xl xs:px-3 md:py-2 lg:gap-[13vw] xl:gap-[12vw] xl:w-[100%] ${
            cartState ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <h2 className="font-satoshi text-[2.5vw]  xs:text-[3.8vw] md:text-[1.7vw] xl:text-[0.8vw]">
            Boot
          </h2>
          <FaAngleRight className="text-lg md:text-lg xl:text-[0.8vw] md:text-[1.5vw]" />
        </NavLink>
        <NavLink
          to={"/Men's Sneaker"}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e); 
            } else {
              setValue(false); 
              isAnimate();
            }
          }}
          className={`w-[90%] md:w-[100%] flex items-center justify-center gap-[60vw] md:gap-[9vw] text-zinc-500 bg-[#F0EEED] py-3 rounded-2xl xs:px-3 md:py-2 lg:gap-[13vw] xl:gap-[12vw] xl:w-[100%] ${
            cartState ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <h2 className="font-satoshi text-[2.5vw]  xs:text-[3.8vw] md:text-[1.7vw] xl:text-[0.8vw]">
            Sneaker
          </h2>
          <FaAngleRight className="text-lg md:text-lg xl:text-[0.8vw] md:text-[1.5vw]" />
        </NavLink>
        <NavLink
          to={"/Bag"}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e); 
            } else {
              setValue(false); 
              isAnimate();
            }
          }}
          className={`w-[90%] md:w-[100%] flex items-center justify-center gap-[60vw] md:gap-[9vw] text-zinc-500 bg-[#F0EEED] py-3 rounded-2xl xs:px-3 md:py-2 lg:gap-[13vw] xl:gap-[12vw] xl:w-[100%] ${
            cartState ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <h2 className="font-satoshi text-[2.5vw]  xs:text-[3.8vw] md:text-[1.7vw] xl:text-[0.8vw]">
            Bags
          </h2>
          <FaAngleRight className="text-lg md:text-lg xl:text-[0.8vw] md:text-[1.5vw]" />
        </NavLink>
        <NavLink
          to={"/Cap"}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e); 
            } else {
              setValue(false); 
            }
          }}
          className={`w-[90%] md:w-[100%] flex items-center justify-center gap-[60vw] md:gap-[9vw] text-zinc-500 bg-[#F0EEED] py-3 rounded-2xl xs:px-3 md:py-2 lg:gap-[13vw] xl:gap-[12vw] xl:w-[100%] ${
            cartState ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <h2 className="font-satoshi text-[2.5vw] xs:text-[3.8vw] md:text-[1.7vw] xl:text-[0.8vw]">
            Caps
          </h2>
          <FaAngleRight className="text-lg md:text-lg xl:text-[0.8vw] md:text-[1.5vw]" />
        </NavLink>
      </div>
      <div
        className={`slider-container relative mt-8 xl:mt-7 flex flex-col ${
          !PriceShow && "pb-10 "
        } items-center  overflow-hidden py-0 border-b-[1px] border-[#c2c2c2] ${
          PriceShow
            ? "h-[21vw] xs:h-[27vw] md:h-[15vw] lg:h-[13vw] xl:h-[7vw]"
            : "h-[5vw] lg:h-[4vw] xl:h-[2vw]"
        } transition-all duration-200`}
      >
        <div
          className={`flex items-center  w-full justify-between  mb-6  ${
            PriceShow && "mb-0"
          }`}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e); 
            } else {
              setPriceShow((prev) => !prev);
            }
          }}
        >
          <h1
            className={`font-satoshi text-2xl font-semibold xs:text-xl md:text-lg xl:text-[1.3vw]`}
          >
            Price
          </h1>
          <FaAngleDown
            className={`${
              PriceShow ? "transform rotate-180" : ""
            } xl:text-[0.8vw]`}
          />
        </div>
        <div className="flex flex-col relative w-full justify-center items-center mt-3 xs:mt-1 md:w-[120%] md:mt-4 lg:mt-9 xl:mt-2 ">
          <Box
            sx={{
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              width: { xs: "70%", sm: "80%", md: "100%" },
              marginLeft: { xs: "0vw", sm: "0vw", md: "0vw", lg: "0vw" },
            }}
          >
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={valuee}
              onChange={handleChange}
              max={500}
              aria-labelledby="non-linear-slider"
              getAriaValueText={valuetext}
              className="range"
              valueLabelDisplay="on"
              valueLabelFormat={(valuee) => `$${valuee}`}
              sx={{
                width: { xs: "100%", sm: "80%", md: "60%", lg: "70%" }, 
                margin: "0 auto",
                color: "black", 
                "& .MuiSlider-thumb": {
                  width: { xs: 16, sm: 22, md: 24, lg: 14 }, 
                  height: { xs: 16, sm: 22, md: 24, lg: 14 },
                  backgroundColor: "black", 
                },
                "& .MuiSlider-track": {
                  height: { xs: 4, sm: 6, md: 8, lg: 9, lg: 4 },
                  borderRadius: 2,
                },
                "& .MuiSlider-rail": {
                  height: { xs: 4, sm: 6, md: 8, lg: 6 },
                  borderRadius: 2,
                  opacity: 0.5,
                  backgroundColor: "grey.300",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "white",
                  color: "#000000",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "0.9rem",
                  },

                  fontWeight: "600",
                  fontStyle: "satoshi",
                  top: { xs: "-1vw", sm: "-.3vw", lg: "-0.4vw" },

                  "&::before": {
                    display: "none", 
                  },
                },
              }}
              disabled={cartState}
            />
          </Box>
        </div>
      </div>
      <div
        className={`colors-container relative mt-8 xl:mt-7  flex flex-col  ${
          !ColorsShowState && "pb-10"
        } items-center  overflow-hidden py-0 border-b-[1px] border-[#c2c2c2] ${
          ColorsShowState
            ? "h-[18vw] xs:h-[22vw] md:h-[18vw] lg:h-[16vw] xl:h-[6vw]"
            : "h-[5vw] lg:h-[4vw] xl:h-[3vw] "
        } transition-all duration-200`}
      >
        <div
          className={`flex items-center w-full justify-between  mb-0  ${
            ColorsShowState && "mb-0"
          }`}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e);
            } else {
              setColorsShowState((prev) => !prev);
            }
          }}
        >
          <h1
            className={`font-satoshi text-2xl font-semibold xs:text-xl md:text-lg xl:text-[1.3vw] `}
          >
            Colors
          </h1>
          <FaAngleDown
            className={`${
              ColorsShowState ? "transform rotate-180" : ""
            } xl:text-[0.8vw]`}
          />
        </div>
        <div className="colors my-[3vw] xl:my-[0.8vw]  xs:my-3 md:my-[2vw] ">
          <div className="flex items-center gap-3 flex-wrap md:gap-1">
            <div
              className="red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw] rounded-full bg-red-800  lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw] md:mt-0"
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) => (prev === "red" ? "" : "red"));
                  setColorsShow((prev) => (prev === 1 ? "" : 1));
                }
              }}
            >
              {ColorsShow === 1 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>

            <div
              className="red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw]  rounded-full bg-zinc-200  lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw]md:mt-0"
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) => (prev === "white" ? "" : "white"));
                  setColorsShow((prev) => (prev === 2 ? "" : 2));
                }
              }}
            >
              {ColorsShow === 2 && (
                <FaCheck className=" text-black absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>

            <div
              className={`red w-[6vw] h-[6vw]  xs:h-[7vw] xs:w-[7vw]  rounded-full bg-zinc-700 lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[1vw]md:mt-0`}
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) => (prev === "gray" ? "" : "gray"));
                  setColorsShow((prev) => (prev === 3 ? "" : 3));
                }
              }}
            >
              {ColorsShow === 3 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>
            <div
              className={`red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw]  rounded-full bg-[#3cd76a] lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw] md:mt-0`}
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) =>
                    prev === "light-green" ? "" : "light-green"
                  );
                  setColorsShow((prev) => (prev === 4 ? "" : 4));
                }
              }}
            >
              {ColorsShow === 4 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>
            <div
              className={`red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw]  rounded-full bg-black  lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw]md:mt-0`}
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) => (prev === "black" ? "" : "black"));
                  setColorsShow((prev) => (prev === 5 ? "" : 5));
                }
              }}
            >
              {ColorsShow === 5 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>
            <div
              className={`red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw]  rounded-full bg-[#114157]  lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw] md:mt-0`}
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) =>
                    prev === "dark-blue" ? "" : "dark-blue"
                  );
                  setColorsShow((prev) => (prev === 6 ? "" : 6));
                }
              }}
            >
              {ColorsShow === 6 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>
            <div
              className={`red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw]  rounded-full bg-yellow-600 lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw]md:mt-0`}
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) => (prev === "yellow" ? "" : "yellow"));
                  setColorsShow((prev) => (prev === 7 ? "" : 7));
                }
              }}
            >
              {ColorsShow === 7 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>
            <div
              className={`red w-[6vw] h-[6vw] xs:h-[7vw] xs:w-[7vw]  rounded-full bg-[#274d79] lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[1.7vw] xl:h-[1.7vw] relative md:w-[4vw] md:h-[4vw]md:mt-0`}
              onClick={(e) => {
                if (cartState) {
                  handleNavClick(e);
                } else {
                  setColorValue((prev) => (prev === "blue" ? "" : "blue"));
                  setColorsShow((prev) => (prev === 8 ? "" : 8));
                }
              }}
            >
              {ColorsShow === 8 && (
                <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`slider-container relative mt-8 xl:mt-7 flex flex-col ${
          !Size && "pb-10"
        } items-center  overflow-hidden py-0 border-b-[1px] border-[#c2c2c2] ${
          Size
            ? "h-[21vw] xs:h-[28vw] md:h-[23vw] lg:h-[16vw] xl:h-[10vw]"
            : "h-[5vw] lg:h-[4vw] xl:h-[3vw]"
        } transition-all duration-200`}
      >
        <div
          className={`flex items-center w-full justify-between  mb-6  ${
            Size && "mb-0"
          }`}
          onClick={(e) => {
            if (cartState) {
              handleNavClick(e);
            } else {
              setSize((prev) => !prev);
            }
          }}
        >
          <h1
            className={`font-satoshi text-2xl font-semibold xs:text-xl md:text-lg xl:text-[1.3vw]`}
          >
            Size
          </h1>
          <FaAngleDown
            className={`${Size ? "transform rotate-180" : ""} xl:text-[0.8vw]`}
          />
        </div>
        <div className="sizes flex w-full  items-center flex-wrap gap-5 xs:gap-3 md:gap-2">
          <div
            className={`size min-w-[15vw] xs:min-w-[17vw] xs:py-2 font-satoshi  py-3 rounded-full bg-[#EBEEF0] text-black capitalize flex justify-center items-center px-4 xl:px-4 md:min-w-[0vw] md:py-[0.6vw] xl:min-w-[3vw] xl:py-[0.5vw] md:px-[1.6vw] ${
              SizeValue === "small" && "bg-zinc-900 text-white"
            }`}
            onClick={(e) => {
              if (cartState) {
                handleNavClick(e);
              } else {
                setSizeValue("small");
              }
            }}
          >
            <h2 className="xs:text-sm xl:text-[0.9vw] md:text-[1.8vw]">
              small
            </h2>
          </div>
          <div
            className={`size min-w-[15vw] xs:min-w-[17vw] xs:py-2 font-satoshi  py-3 rounded-full bg-[#EBEEF0] text-black capitalize flex justify-center items-center px-4 xl:px-4 md:min-w-[0vw] md:py-[0.6vw] xl:min-w-[3vw] xl:py-[0.5vw] md:px-[1.6vw] ${
              SizeValue === "medium" && "bg-zinc-900 text-white"
            }`}
            onClick={(e) => {
              if (cartState) {
                handleNavClick(e);
              } else {
                setSizeValue("medium");
              }
            }}
          >
            <h2 className="xs:text-sm xl:text-[0.9vw] md:text-[1.8vw]">
              medium
            </h2>
          </div>
          <div
            className={`size min-w-[15vw] xs:min-w-[17vw] xs:py-2 font-satoshi  py-3 rounded-full bg-[#EBEEF0] text-black capitalize flex justify-center items-center px-4 xl:px-4 md:min-w-[0vw] md:py-[0.6vw] xl:min-w-[3vw] xl:py-[0.5vw] md:px-[1.6vw] ${
              SizeValue === "large" && "bg-zinc-900 text-white"
            }`}
            onClick={(e) => {
              if (cartState) {
                handleNavClick(e);
              } else {
                setSizeValue("large");
              }
            }}
          >
            <h2 className="xs:text-sm xl:text-[0.9vw] md:text-[1.8vw]">
              large
            </h2>
          </div>
          <div
            className={`size min-w-[15vw] xs:min-w-[17vw] xs:py-2  px-4 font-satoshi  py-3 rounded-full bg-[#EBEEF0] text-black capitalize flex justify-center items-center md:min-w-[0vw] md:py-[0.6vw] xl:min-w-[3vw] xl:py-[0.5vw] md:px-[1.6vw] ${
              SizeValue === "x - large" && "bg-zinc-900 text-white"
            }`}
            onClick={(e) => {
              if (cartState) {
                handleNavClick(e);
              } else {
                setSizeValue("x - large");
              }
            }}
          >
            <h2
              className="xs:text-sm xl:text-[0.9vw] md:text-[1.8vw]
             "
            >
              x - large
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-12 md:mt-4 xs:mt-[10vw]">
        <GlobalBtn
          text={"apply filter"}
          onClick={() => {
            if (cartState) {
              handleNavClick();
            } else {
              filterBy();
              isAnimate()
            }
          }}
          className={
            "text-[3vw] w-[70vw] md:text-[1.7vw] lg:text-[1.5vw] lg:py-3 xl:py-2 xl:text-[1vw] md:py-3 xl:mt-8 lg:w-[19vw]"
          }
        />
      </div>
    </div>
  );
}

export default Filter;
