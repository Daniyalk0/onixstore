import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../Context";
import MobileSearch from "../MobileSearch.jsx";
import { RxCross2 } from "react-icons/rx";
import ProductCard from "../ProductCard.jsx";
import GlobalBtn from "../GlobalBtn.jsx";
import { RxCrossCircled } from "react-icons/rx";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";
import service from "../../appwrite/auth";
import configService from "../../appwrite/conf";
import { gsap } from "gsap";
import { ClipLoader } from "react-spinners";

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShop, setIsShop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const {
    cartState,
    setCartState,
    cartItems,
    decreaseQuantity,
    removeProduct,
    addProducts,
    isLogin,
    logout,
    IncreaseQuantity,
    allProducts,
    itemsLoading,
    authStatus,
    value,
    setValue,
    increaseQuantityLoading,
    decreaseQuantityLoading,
    ...authState
  } = useMyContext();

  const [namesUpdated, setNamesUpdated] = useState();
  const [subTotal, setSubTotal] = useState(1);
  const [clickedItem, setClickedItem] = useState("");

  // const [cart, setcart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    if (!isOpen) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  const handleSearchClick = () => {
    setShowSearch(!showSearch); // Toggle search visibility
    console.log("anything!!");
  };

  function logOutHandler() {
    if (authStatus) {
      service.logOut().then(() => {
        logout();
        navigate("/auth");
      });
    } else {
      navigate("/auth");
    }
  }

  useEffect(() => {
    const cartControl = () => {
      if (cartState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    cartControl();
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [cartState]);

  const getItemsLimit = () => {
    const width = window.innerWidth;
    if (width < 768) return 12; 
    if (width >= 1024 && width < 1280) return 15; 
    if (width >= 1280) return 30; 
  };

  useEffect(() => {
    const limit = getItemsLimit();
    const screenWidth = window.innerWidth;

    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      displayName:
        screenWidth >= 1280
          ? item.name 
          : item.name.length > limit
          ? item.name.slice(0, limit) + "..." 
          : item.name,
    }));


    setNamesUpdated(updatedCartItems);
  }, [cartItems]);

  useEffect(() => {
    const calculateSubtotal = () => {
      setSubTotal(
        allProducts?.reduce((total, cartItem) => {
          return total + cartItem.productPrice * cartItem.productQuantity; // 
        }, 0)
      );
    };

    calculateSubtotal();
  }, [allProducts]);


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
    if (isOpen) {
      gsap.fromTo(
        ".animate-me2",
        {
          opacity: 0, 
          y: 50, 
        },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.1, 
          delay: 0.1, 
        }
      );
    }
  }, [isOpen]); 

  useEffect(() => {
    gsap.fromTo(
      ".animateMeCart",
      {
        opacity: 0, 
        x: 100, 
      },
      {
        opacity: 1, 
        x: 0,
        duration: 0.8,
        delay: 0.3,
      }
    );
  }, [cartState]);

  return (
    <div
      className={`sm:hidden backdrop-filter backdrop-blur-md w-full  z-[999] px-8 py-8 h-[10vh] flex items-center  justify-between xs:px-3 xs:py-8 fixed  ${
        showNavbar ? "-translate-y-0" : "-translate-y-28"
      } transition-all duration-200 ${
        value ? "brightness-75 " : ""
      } transition-all duration-300 `}
      onClick={() => setValue(false)}
    >
      <div
        className={`cart min-h-screen fixed border-2 border-red-600 ${
          cartState ? "right-0" : "right-[-100vw]"
        } w-[50vw] flex justify-center flex-col z-[1000] bg-white top-[0vw] transition-all duration-300 px-3 py-4 xs:py-8 xs:w-[58vw] xs:justify-between `}
      >
        <div className="w-full flex  justify-between text-2xl font-semibold font-satoshi items-center">
          <h1>Cart</h1>
          <RxCross2 className="cursor-pointer" onClick={() => setCartState(false)} />
        </div>
        <div className="overflow-y-auto max-h-[70vh] w-full mt-[6vw] flex flex-col items-center  min-h-[70vh] gap-0  xs:gap-3">
          {allProducts?.length > 0 ? (
            allProducts?.map((prod, index) => (
              <div
                className="flex w-full justify-between items-center  px-2 border-b-[1px] border-zinc-400 xs:px-0  animateMeCart"
                key={prod?.id}
              >
                <NavLink
                  to={`/product-details/${prod?.productId}`}
                  className="flex justify-start items-start relative max-w-[120px] min-w-[120px] ml-0"
                  key={index}
                  onClick={(e) => {
                    if (itemsLoading) {
                      e.preventDefault(); // Prevent navigation if items are still loading
                    }else{
                      setCartState(false)
                    }
                  }}
                >
                  <div className="flex items-center flex-col max-w-[120px] min-w-[120px]  xs:min-w-[80px] xs:max-w-[100px] ">
                    <img
                      src={
                        configService.getFilePreview(prod?.productImage).href
                      }
                      alt=""
                      className={`h-[20vw] ${
                        itemsLoading && clickedItem === prod?.$id
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    />
                    <div className="mt-2 w-full flex flex-col items-start">
                      <h2
                        className={`capitalize font-satoshi font-semibold leading-5 text-[2.6vw] xs:leading-4  ${
                          itemsLoading && clickedItem === prod?.$id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        {prod?.productName}{" "}
                      </h2>
                    </div>
                  </div>
                </NavLink>
                <div className="flex justify-between items-end flex-col  text-[2.6vw] gap-10 py-6 xs:py-2 xs:gap-6">
                  <RxCrossCircled
                    className={`font-semibold font-satoshi text-[5vw] ${
                      itemsLoading && clickedItem === prod?.$id
                        ? "opacity-50 pointer-events-none"
                        : ""
                    } `}
                    onClick={(e) => {
                      e.stopPropagation(); // Ensure this prevents NavLink from activating
                      setClickedItem(prod?.$id);
                      removeProduct(prod?.productImage, prod?.$id);
                    }}
                  />
                  <div
                    className={`quantity border-[1px] border-zinc-300  xl:w-[20vw] lg:w-[30vw]  flex items-center justify-center px-0 py-[0.6vw]  xs:py-2 md:gap-8 xl:gap-5 xs:gap-4 bg-[#EBEEF0] xl:py-3 gap-5  ${
                      itemsLoading && clickedItem === prod?.$id
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    {decreaseQuantityLoading[prod?.$id] ? (
                      <div className="flex justify-center items-center">
                        <ClipLoader
                          color="#000000"
                          loading={true}
                          size={Math.min(10, window.innerWidth * 0.1)}
                        />
                      </div>
                    ) : (
                      <FaMinus
                        className="text-[2vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] xl:w-[1vw] md:w-[2vw]  xs:text-[3vw]"
                        onClick={(event) => {
                          if (!itemsLoading) {
                            event.preventDefault();
                            decreaseQuantity(prod?.$id); 
                          }
                        }}
            
                      />
                    )}
                    <h2 className="font-satoshi font-semibold text-[2.6vw] md:text-[3vw] lg:text-[2vw] xl:text-[1vw] w-[1vw] ">
                      {prod?.productQuantity}
                    </h2>
                    {increaseQuantityLoading[prod?.$id] ? (
                      <div className="flex justify-center items-center">
                        <ClipLoader
                          color="#000000"
                          loading={true}
                          size={Math.min(10, window.innerWidth * 0.1)}
                        />
                      </div>
                    ) : (
                      <FaPlus
                        className="text-[2vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] xl:w-[1vw] md:w-[2vw] xs:text-[3vw]"
                     
                        onClick={() => {
                          if (!itemsLoading) {
                            IncreaseQuantity(prod?.$id, 1);
                          }
                        }}
                      />
                    )}
                  </div>
                  <h2
                    className={`font-semibold font-satoshi text-zinc-700 ${
                      itemsLoading && clickedItem === prod?.$id
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    ${prod?.productPrice}.00
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <h1>no products </h1>
          )}
        </div>
        <div className="w-full flex  justify-between text-xl font-semibold font-satoshi items-center mt-8">
          <h1 className="">Sub Total:</h1>
          <h1 className="">${subTotal?.toFixed(2)}</h1>
        </div>
        <NavLink to={"/cartPage"} onClick={() => setCartState(false)}>
          <GlobalBtn
            text={"view cart"}
            className={"w-full h-11 text-[3vw] mt-12 xs:mt-6"}
          />
        </NavLink>
      </div>

      {showSearch && (
        <MobileSearch state={showSearch} setState={setShowSearch} />
      )}
      <div className="flex items-center  w-[42vw] justify-between relative z-[999] xs:w-[42vw] animate-me">
        <div
          className={`ham flex flex-col gap-[8px] xs:gap-[4px]`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`w-10 h-[0.7vw] xs:w-7  bg-black inline-block rounded-xl ${
              isOpen &&
              "rotate-45 translate-y-[14px] xs:translate-y-[9px] bg-white"
            } transition-all duration-200`}
          ></span>
          <span
            className={`w-10 h-[0.7vw] xs:w-7  bg-black inline-block rounded-xl ${
              isOpen && "opacity-0 bg-white"
            } opacity-1 transition-all duration-300`}
          ></span>
          <span
            className={`w-10 h-[0.7vw] xs:w-7  bg-black inline-block rounded-xl ${
              isOpen &&
              "-rotate-45 -translate-y-[10px] xs:-translate-y-[4px] bg-white"
            } transition-all duration-200`}
          ></span>
        </div>
        <div
          className={`logo uppercase font-integral  text-[5vw] scale-y-400 ${
            isOpen ? "text-white" : "text-black"
          } transition-all duration-300`}
        >
          <h1>onixstore</h1>
        </div>
      </div>
      <div
        className={`icons flex items-center gap-6 xs:gap-4 relative z-[999] ${
          isOpen ? "text-white" : ""
        } transition-all duration-200 animate-me`}
      >
        <IoSearch className={`w-[7vw] h-[4vh] `} onClick={handleSearchClick} />
        <LuShoppingCart
          className={`w-[7vw] h-[4vh] `}
          onClick={() => {
            setCartState(!cartState), console.log("cart");
          }}
        />
        <h2 className="absolute bg-black py-[0.2vw] px-2 rounded-full text-white left-[15vw] top-[-1.2vw] text-center font-semibold xs:text-[3vw] xs:left-[14.5vw] xs:top-[-1vw]">
          {" "}
          {allProducts?.length}
        </h2>
        <div onClick={logOutHandler}>
          {authState && authStatus ? (
            <PiSignOut className={`w-[9vw] h-[7vw]`} />
          ) : (
            <FaRegUserCircle className={`w-[9vw] h-[7vw]`} />
          )}
        </div>
      </div>

      <div
        className={`menu absolute min-h-screen w-full ${
          isOpen ? "top-0" : "-top-[100vh]"
        } transition-all duration-200 bg-black left-0 min-h-screen `}
      >
        <div className="links uppercase font-satoshi text-white font-semibold tracking-wider w-full px-8 absolute top-[17vh] text-[2rem] flex flex-col justify-start gap-10 xs:text-[1.3rem]">
          <div
            className={`overflow-hidden border-b-[1px] border-[#c4c4c4f1] w-full pb-1 transition-all duration-200 flex flex-col  ${
              isShop ? "h-[245px] xs:h-[170px]" : "h-[55px] xs:h-[35px]"
            }`}
            onClick={() => setIsShop((prev) => !prev)}
          >
            <h1
              className={`${
                isShop ? "text-zinc-300" : ""
              } w-full flex items-center justify-between animate-me2`}
            >
              Shop
              <IoMdArrowDropdown
                className={`${
                  isShop ? "rotate-180" : ""
                } transition-all duration-200`}
              />
            </h1>
            <NavLink
              to={"/Men's Sneaker"}
              className={`ml-[3vw] animate-me2 `}
              onClick={() => setIsOpen(false)}
            >
              sneekers
            </NavLink>
            <NavLink
              to={"/Cap"}
              className={`ml-[3vw] animate-me2`}
              onClick={() => setIsOpen(false)}
            >
              caps
            </NavLink>
            <NavLink
              to={"/Men's Boot"}
              className={`ml-[3vw] animate-me2`}
              onClick={() => setIsOpen(false)}
            >
              boots
            </NavLink>
            <NavLink
              to={"/Bag"}
              className={`ml-[3vw] animate-me2`}
              onClick={() => setIsOpen(false)}
            >
              bags
            </NavLink>
          </div>
          <a
            href="/#about"
            className={
              "border-b-[1px] border-[#c4c4c4f1] w-full pb-1 overflow-hidden "
            }
          >
            <h1 className="animate-me2" onClick={() => setIsOpen(false)}>
              about
            </h1>
          </a>
          <NavLink
            to={"/"}
            className={
              "border-b-[1px] border-[#c4c4c4f1] w-full pb-1 overflow-hidden "
            }
          >
            <h1 className="animate-me2" onClick={() => setIsOpen(false)}>
              home
            </h1>
          </NavLink>
          <a
            href="/#subscribe"
            className={
              "border-b-[1px] border-[#c4c4c4f1] w-full pb-1 overflow-hidden "
            }
          >
            <h1 className="animate-me2" onClick={() => setIsOpen(false)}>
              subscribe
            </h1>
          </a>
          <h1></h1>
          <h1></h1>
        </div>
      </div>
    </div>
  );
}

export default Hamburger;
