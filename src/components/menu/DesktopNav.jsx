import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import Container from "../Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import ProductCard from "../ProductCard";
import products from "../../products.json"; // Adjust the path accordingly
import { useMyContext } from "../Context";
import { RxCrossCircled } from "react-icons/rx";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import GlobalBtn from "../GlobalBtn";
import { PiSignOut } from "react-icons/pi";
import service from "../../appwrite/auth";
import configService from "../../appwrite/conf";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ClipLoader } from "react-spinners";

function DesktopNav({ className }) {
  const [isShop, setIsShop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [inputValue, setinputValue] = useState("");
  const [crossIcon, setcrossIcon] = useState(false);
  const [product, setproduct] = useState(products);
  const [searchProductsState, setsearchProductsState] = useState(true);
  const [filteredProducts, setfilteredproducts] = useState();
  const [subTotal, setSubTotal] = useState(null);
  const navigate = useNavigate();
  const [clickedItem, setClickedItem] = useState("");

  const [shopHidden, setShopHidden] = useState(true);

  const {
    cartState,
    setCartState,
    cartItems,
    decreaseQuantity,
    removeProduct,
    addProducts,
    namesUpdated,
    setNamesUpdated,
    isLogin,
    logout,
    IncreaseQuantity,
    allProducts,
    itemsLoading,
    authStatus,
    increaseQuantityLoading,
    decreaseQuantityLoading,
    allProductsLoading,
    ...authState
  } = useMyContext();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        // Scroll down
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
        // Scroll up or at the top
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const InputChange = (value) => {
    showProductsOnChange(value);
    setinputValue(value);
    console.log(value); // Log the updated value directly

    if (value !== "" && value !== null) {
      setcrossIcon(true);
      setsearchProductsState(false);
    } else {
      setsearchProductsState(true);
      setcrossIcon(false);
    }
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

  const crossIconClick = () => {
    setinputValue("");
    setcrossIcon(false);
    setsearchProductsState(true);
  };

  const showProductsOnChange = (inputValue) => {
    const trimmedInputValue = inputValue.trim(); // Trim any leading or trailing spaces
    const searchedProducts = product?.filter((pro) =>
      pro.name.toLowerCase().includes(trimmedInputValue.toLowerCase())
    );
    setfilteredproducts(searchedProducts);
  };

  const getItemsLimit = () => {
    const width = window.innerWidth;
    if (width < 768) return 8;
    if (width >= 1024 && width < 1280) return 15;
    if (width >= 1280) return 30;
  };

  useEffect(() => {
    const limit = getItemsLimit();

    // Get the current screen width
    const screenWidth = window.innerWidth;

    const slicedNames = cartItems.map((item) => ({
      ...item,
      name:
        screenWidth >= 1280
          ? item.name
          : item.name.length > limit
          ? item.name.slice(0, limit) + "..."
          : item.name,
    }));

    setNamesUpdated(slicedNames);
  }, [cartItems]);

  useEffect(() => {
    const calculateSubtotal = () => {
      setSubTotal(
        allProducts?.reduce((total, cartItem) => {
          return total + cartItem.productPrice * cartItem.productQuantity;
        }, 0)
      );
    };

    calculateSubtotal();
  }, [allProducts]);


  useEffect(() => {
    const animateMeCart = document.querySelectorAll('.animateMe')
        gsap.fromTo(
          animateMeCart,
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
        delay: 2.2,
        onComplete: () => setShopHidden(false),
      }
    );
  }, []);

  return (
    <Container>
      <div
        className={`hidden fixed sm:flex items-center px-3 py-8 justify-between xl:py-6 xl:px-14 2xl:px-10 2xl:gap-10 2xl:w-full xl:w-[100%] top-0 z-[999] backdrop-filter backdrop-blur-md ${className} ${
          showNavbar ? "-translate-y-0" : "-translate-y-24"
        } transition-transform duration-300  md:px-8   `}
      >
    
        <div className="h-3 flex items-center justify-between xl:w-[75%] 2xl:w-[73%] ">
          <div className={` flex items-center md:gap-5`}>
            <div
              className={`logo uppercase font-integral text-[3.5vw] scale-y-400 transition-all duration-300 xl:text-[2.2vw] tracking-tight overflow-hidden`}
            >
              <h1 className="animate-me ">onixstore</h1>
            </div>
            <div
              className={`itmes text-[2vw] font-satoshi font-light flex items-center gap-5 mx-2  md:mt-2 lg:gap-4 xl:gap-5 xl:text-[1.1vw] xl:font-extralight xl:ml-[30px] 2xl:text-[0.8vw] 2xl:ml-[30px]  nav-item ${
                shopHidden ? "overflow-hidden" : ""
              } `}
            >
              <NavLink to={"/"}>
                <h1 className={`animate-me nav-link-wrapper `}>Home</h1>
              </NavLink>
              <div
                className="flex items-center relative"
                onMouseEnter={() => setIsShop(true)}
                onMouseLeave={() => setIsShop(false)}
              >
                <h1
                  className="flex items-center animate-me nav-link-wrapper w-full"
                  onClick={() => setIsShop((prev) => !prev)}
                >
                  Shop
                  <FaChevronDown
                    className={`${
                      isShop ? "rotate-180" : ""
                    } transition-all duration-150 w-4`}
                  />
                </h1>
                <div
                  className={`${
                    isShop ? "inline-block" : "hidden"
                  } transition-all duration-200 py-2 px-2 bg-zinc-800 rounded-b-md absolute top-[95%] left-[-7%] text-zinc-200 text-[1.5vw] tracking-wide leading-loose xl:text-[0.9vw] xl:font-extralight xl:tracking-normal xl:left-[-0.8vw] z-[999]`}
                >
                  <NavLink
                    to={"/Men's Sneaker"}
                    onClick={() => setIsShop(false)}
                  >
                    <h2>Sneekers</h2>
                  </NavLink>
                  <NavLink to={"/Cap"} onClick={() => setIsShop(false)}>
                    <h2>Caps</h2>
                  </NavLink>
                  <NavLink to={"/Men's Boot"} onClick={() => setIsShop(false)}>
                    <h2>Boots</h2>
                  </NavLink>
                  <NavLink to={"/Bag"} onClick={() => setIsShop(false)}>
                    <h2>Bags</h2>
                  </NavLink>
                </div>
              </div>
              <a href="/#about">
                <h1 className="animate-me nav-link-wrapper w-full">About</h1>
              </a>
              <a href="/#subscribe">
                <h1 className="animate-me nav-link-wrapper w-full">
                  Subscribe
                </h1>
              </a>
            </div>
          </div>
          <div className="search relative w-[25%] md:w-[30%] flex items-center border-none md:mt-2 xl:w-[23vw] 2xl:w-[19vw]  animate-me">
            <input
              type="text"
              name=""
              id=""
              value={inputValue}
              className="rounded-xl pl-7 text-zinc-700 w-full bg-[#EBEEF0] text-[2vw] placeholder:text-xs py-1 font-semibold xl:py-[1.2vh] xl:text-xs xl:font-semibold 2xl:py-[1.8vh] focus:outline-[#00000020] z-[999]"
              placeholder="Search Product.."
              onChange={(e) => InputChange(e.target.value)}
            />
            <CiSearch className="absolute left-2 text-zinc-600" />
            <RxCross2
              className={`absolute right-3 text-zinc-600 xl:text-xs ${
                crossIcon ? "inline-block" : "hidden"
              }`}
              onClick={crossIconClick}
            />
            <div
              className={`xl:w-[22vw] xl:h-[20vw] md:h-[30vw] md:px-0 md:gap-5 sm:gap-0 absolute sm:w-[22vw] sm:h-[35vw] sm:top-[3vw] sm:left-[0.1vw] xl:top-[2.4vw] xl:left-[0.5vw] bg-zinc-200 rounded-b-2xl overflow-y-auto px-3 py-3 overflow-x-hidden hide-scrollbar flex flex-col justify-start lg:h-[20vw] lg:top-[4vw] md:top-[4vw] md:w-[23vw] md:left-[1.3vw] lg:w-[25vw] items-center xl:gap-2 lg:gap-0 ${
                searchProductsState ? "opacity-0" : "opacity-1"
              } transition-all duration-200`}
            >
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((pro, index) => (
                  <NavLink
                    to={`/product-details/${pro?.id}`}
                    onClick={() => {
                      setsearchProductsState(true), setinputValue("");
                    }}
                  >
                    <ProductCard
                      key={index}
                      heading={pro?.name}
                      imgg={pro?.img}
                      newPrice={pro?.price}
                      ratingg={pro?.ratings}
                      classNamee={
                        "xl:min-w-[120px] xl:max-w-[120px] lg:min-w-[110px] lg:max-w-[110px] xl:h-[8vw] lg:h-[10vw] sm:h-[14.9vw] md:w-[90%]"
                      }
                      className={
                        "flex sm:h-[20vw] sm:flex-col lg:px-0 xl:h-[10vw] lg:flex-row justify-between items-center sm:justify-center sm:items-center lg:w-full gap-0 lg:my-2 md:my-1 sm:w-[90%]"
                      }
                      textClass={"xl:text-xs lg:text-[1vw] md:text-[1.5vw]"}
                      margin={
                        "px-2 py-0 ml-0 md:mt-2 w-full xl:gap-0 md:flex justify-center items-center sm:mt-1 lg:items-start"
                      }
                      ratingClass={"xl:w-[4vw] lg:w-[6vw] lg:text-[1.5vw]"}
                      priceClass={"xl:text-[0.8vw] lg:text-[1.1vw]"}
                    />
                  </NavLink>
                ))
              ) : (
                <div className="no-results-message">No results found</div>
              )}
            </div>
          </div>
        </div>
        <div className="h-3 flex items-center gap-3 md:mt-2 xl:gap-4 relative  animate-me">
          <div
            className={`${
              authStatus ? "opacity-1" : "opacity-0"
            } transition-all duration-300 cursor-pointer`}
          >
            <LuShoppingCart
              className={`md:text-[2.6vw] xl:text-[1.5vw] 2xl:text-[1.3vw]`}
              onClick={() => {
                setCartState(!cartState), console.log("cart");
              }}
            />
            <h2 className=" absolute bg-black px-[0.5vw] py-[0.2vw] rounded-full text-white font-semibold font-satoshi text-[0.6vw] top-[-1vw] left-[0.8vw] lg:left-[1.3vw] lg:top-[-1.7vw] lg:px-[0.7vw] lg:py-[0.3vw] text-center lg:text-[0.8vw] md:text-[0.9vw] md:left-[1.5vw] md:px-[0.7vw] sm:text-[1vw] sm:left-[1.3vw] sm:px-[0.7vw] xl:left-[0.7vw] xl:top-[-1vw] xl:text-[0.6vw] xl:px-[0.5vw] xl:py-[0.2vw]">
              {allProducts?.length}
            </h2>
          </div>
          <div onClick={logOutHandler}>
            {authState && authStatus ? (
              <PiSignOut
                className={`md:text-[2.6vw] xl:text-[1.5vw] 2xl:text-[1.3vw] cursor-pointer`}
              />
            ) : (
              <FaRegUserCircle
                className={`md:text-[2.6vw] xl:text-[1.5vw] 2xl:text-[1.3vw] cursor-pointer`}
              />
            )}
          </div>
        </div>
      </div>
      <div
          className={`cart min-h-screen fixed bg-zinc-100  ${
            cartState ? "right-0 lg:right-[-4vw] xl:right-0 top-0" : "right-[-100vw]"
          } w-[50vw] flex justify-center flex-col z-[1200] top-[0vw] transition-all duration-500 px-3 md:px-1 py-8 xs:py-8 xs:w-[56vw] xs:justify-between lg:px-4 xl:w-[35vw] xl:py-6 `}
        >
          <div className="w-full flex  justify-between text-2xl font-semibold font-satoshi items-center lg:text-[1vw] lg:uppercase">
            <h1>Cart</h1>
            <RxCross2
              className="cursor-pointer"
              onClick={() => setCartState(false)}
            />
          </div>
          <div className="overflow-y-auto max-h-[70vh] w-full mt-[6vw] flex flex-col items-center  min-h-[70vh] gap-0  xs:gap-3 md:gap-3 xl:px-0  xl:mt-[1vw] overflow-x-hidden">
            {allProducts?.length > 0 ? (
              allProducts?.map((prod, index) => (
                <div
                  className="flex w-full justify-between items-center  px-2 border-b-[1px] border-zinc-400 xs:px-0  xl:px-0 animateMe"
                  key={prod?.id}

                >
                  <NavLink
                    to={`/product-details/${prod?.productId}`}
                    className={`flex justify-start items-start relative max-w-[120px] min-w-[120px] ml-0`}
                    key={index}
                    onClick={(e) => {
                      if (itemsLoading) {
                        e.preventDefault(); // Prevent navigation if items are still loading
                      }
                    }}
                  >
                    <div
                      className={`flex items-center flex-col max-w-[120px] min-w-[120px] xs:min-w-[80px] xs:max-w-[100px] md:flex-row md:min-w-[140px] md:max-w-[140px] lg:min-w-[160px] lg:max-w-[160px] xl:min-w-[100px] xl:max-w-[100px] `}
                      key={index}
                    >
                      <img
                        src={
                          configService.getFilePreview(prod?.productImage).href
                        }
                        alt=""
                        className={`h-[20vw] lg:h-[17vw] xl:h-[7vw] ${
                          itemsLoading && clickedItem === prod?.$id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      />
                      <div className="mt-2 w-full flex flex-col items-start md:gap-10 md:ml-2 md:mt-5 lg:gap-7 xl:gap-3">
                        <h2
                          className={`capitalize font-satoshi font-semibold leading-5 text-[2.6vw] xs:leading-4 md:text-[2vw]  lg:w-[25vw] xl:text-[1vw] xl:w-[20vw] ${
                            itemsLoading && clickedItem === prod?.$id
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }`}
                        >
                          {prod?.productName}{" "}
                        </h2>
                        <div
                          className={`quantity border-[1px] border-zinc-300  xl:w-[5vw] lg:w-[12vw] items-center justify-center px-0 py-[0.6vw]  xs:py-2 md:gap-8  xs:gap-4 bg-[#EBEEF0]  gap-5 hidden md:flex xl:py-1 xl:gap-2 xl:justify-between ${
                            itemsLoading && clickedItem === prod?.$id
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }`}
                          onClick={(e) => e.preventDefault()}
                        >
                          {decreaseQuantityLoading[prod.$id] ? (
                            <div className="flex justify-center items-center">
                              <ClipLoader
                                color="#000000"
                                loading={true}
                                size={Math.min(15, window.innerWidth * 0.1)}
                              />
                            </div>
                          ) : (
                            <FaMinus
                              className="text-[2vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[0.8vw] xl:w-[1vw] md:w-[2vw]  xs:text-[3vw]"
                              onClick={(event) => {
                                if (!itemsLoading) {
                                  if (prod.productQuantity === 1) {
                                    removeProduct(prod?.productImage, prod?.$id);
                                  }
                                  event.preventDefault(); // Prevent navigation
                                  decreaseQuantity(prod?.$id); // Call your decreaseQuantity function
                                }
                              }}
                            />
                          )}
                          <h2
                            className={`font-satoshi font-semibold text-[2.6vw] md:text-[3vw] lg:text-[2vw] xl:text-[0.9vw] w-[1vw] text-center ${
                              itemsLoading && clickedItem === prod?.$id
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
                          >
                            {prod?.productQuantity}
                          </h2>
                          {increaseQuantityLoading[prod?.$id] ? (
                            <div className="flex justify-center items-center">
                              <ClipLoader
                                color="#000000"
                                loading={true}
                                size={Math.min(15, window.innerWidth * 0.1)}
                              />
                            </div>
                          ) : (
                            <FaPlus
                              className="text-[2vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[0.8vw] xl:w-[1vw] md:w-[2vw] xs:text-[3vw]"
                              // onClick={() => setProductQuantity((prev) => prev + 1)}
                              onClick={() => {
                                if (!itemsLoading) {
                                  IncreaseQuantity(prod?.$id, 1);
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <div className="flex justify-between items-end flex-col  text-[2.6vw] gap-10 py-6 xs:py-2 xs:gap-6 md:gap-11 xl:gap-7">
                    <RxCrossCircled
                      className="font-semibold font-satoshi text-[5vw] lg:text-[3vw] xl:text-[1.4vw] text-zinc-500"
                      onClick={(e) => {
                        e.stopPropagation(); // Ensure this prevents NavLink from activating
                        setClickedItem(prod?.$id);
                        removeProduct(prod?.productImage, prod?.$id);
                      }}
                    />
                    <div className="quantity border-[2px] border-zinc-800  xl:w-[20vw] lg:w-[0vw]  flex items-center justify-center px-0 py-[0.6vw]  xs:py-2 md:gap-8 xl:gap-5 xs:gap-4 bg-[#EBEEF0] xl:py-3 gap-5 md:hidden ">
                      <FaMinus
                        className="text-[2vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] xl:w-[1vw] md:w-[2vw]  xs:text-[3vw]"
                        // onClick={() =>
                        //   setProductQuantity((prev) => {
                        //     if (prev > 1) {
                        //       return prev - 1;
                        //     } else {
                        //       return prev; // Or you can return 1 to ensure it never goes below 1
                        //     }
                        //   })
                        // }
                      />
                      <h2 className="font-satoshi font-semibold text-[2.6vw] md:text-[3vw] lg:text-[2vw] xl:text-[1vw] w-[1vw] "></h2>
                      <FaPlus
                        className="text-[2vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] xl:w-[1vw] md:w-[2vw] xs:text-[3vw]"
                        // onClick={() => setProductQuantity((prev) => prev + 1)}
                        onClick={() => IncreaseQuantity(prod, 1)}
                      />
                    </div>
                    <h2 className="font-semibold font-satoshi text-zinc-500 lg:text-[1.8vw] xl:text-[1vw] ">
                      ${prod?.productPrice}.00
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <h1>no products </h1>
            )}
          </div>
          <div className="w-full flex  justify-between text-xl font-semibold font-satoshi items-center mt-8 md:mt-0 xl:text-[1vw]">
            <h1 className="">Sub Total:</h1>
            <h1 className="">${subTotal?.toFixed(2)}</h1>
          </div>

          <GlobalBtn
            onClick={() => setCartState(false)}
            text={"view cart"}
            route={"/CartPage"}
            className={
              "w-full h-11 text-[3vw] mt-12 xs:mt-6 md:h-14 md:mt-8 xl:h-9 xl:text-[1vw]"
            }
          />
        </div>
    </Container>
  );
}

export default DesktopNav;
