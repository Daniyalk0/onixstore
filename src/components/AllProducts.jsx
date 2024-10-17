import React, { useEffect, useState, useRef } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import products from "../products.json";
import { useMyContext } from "./Context";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from "./Container";
import { IoCartSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipLoader } from "react-spinners";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function AllProducts({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    value,
    setValue,
    animate,
    setanimate,
    isAnimate,
    addProducts,
    cartState,
    setCartState,
    authStatus,
    allProducts,
    cartNotification,
    addProductLoading,
  } = useMyContext();
  const [data, setdata] = useState(products);
  const [filteredData, setfilteredData] = useState([]);
  const [filteredData2, setfilteredData2] = useState([]);
  const path = useLocation();
  const [cleanedPath, setCleanedPath] = useState("");

  const getItemsLimit = () => {
    const width = window.innerWidth;

    if (width < 768) return 20; 
    return 9; 
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  useEffect(() => {
    const pathObject = location.pathname;
    const pathString = decodeURIComponent(pathObject);

    if (typeof pathString === "string") {
      const cleaned = pathString.replace(/[\$\/]/g, "");

      if (cleaned) {
        const filter = data.filter((dat) => dat.category === cleaned);
        const limit = getItemsLimit();
        const limitedFiltered = filter.slice(0, limit);

        const updatedFiltered = limitedFiltered.map((item) => ({
          ...item,
          displayName:
            window.innerWidth >= 768
              ? item.name 
              : item.name.length > limit
              ? item.name.slice(0, limit) + "..." 
              : item.name,
        }));

        const productIdsToCheck = allProducts.map(
          (product) => product.productId
        );


        const filtered = updatedFiltered.map((product) => {
          if (productIdsToCheck.includes(product.id)) {
     

            return {
              ...product, 
              isAvailable: true,
            };
          } else {
            return {
              ...product,
              isAvailable: false, 
            };
          }
        });

        setfilteredData(filtered);
      }

     
      setCleanedPath(cleaned);
    } else {
      console.log("Path is not a string:", pathString);
    }
  }, [location, data, allProducts]); 
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault(); 
    } else {
      setCartState(false); 
    }
  };

  useEffect(() => {

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("hasAnimatedBags");
    });

    const hasAnimatedBags = sessionStorage.getItem("hasAnimatedBags");

    if (!hasAnimatedBags) {

      gsap.fromTo(
        ".animate-me-products",
        {
          opacity: 0, 
          y: 50, 
        },
        {
          opacity: 1, 
          y: 0,
          duration: 1, 
          delay: 2.2,
        }
      );


      sessionStorage.setItem("hasAnimatedBags", "true");
    } else {
      gsap.fromTo(
        ".animate-me-products",
        {
          opacity: 0, 
          y: 50, 
        },
        {
          opacity: 1, 
          y: 0,
          duration: 1, 
          delay: 0.01, 
        }
      );
    }

    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.removeItem("hasAnimatedBags");
      });
    };
  }, []); // Run only on component mount

  const viewport = window.innerWidth;

  return (
    <>
      <Container>
        <div
          className={`${
            viewport > 768 ? "animate-me-products" : ""
          } w-full transition-all duration-300 min-h-screen bg-zinc-100 mt-26 px-0 py-6 xl:px-14 xl:mt-[-2vw] md:flex lg:px-11
          xs:mt-0 xl:flex items-center justify-between relative ${
            cartState ? "brightness-75" : ""
          }`}
          onClick={handleNavClick}
        >
          <div className="flex w-full justify-between items-center mt-[12vw] md:mt-28  xs:mt-18 relative z-1  flex-col md:z-0 md:w-[30%] xl:w-[20%] xl:px-0 lg:mt-[2vw] xl:mt-[-25vw] ">
            <div className="flex justify-between items-center w-full px-7  md:px-3 xs:py-7 xl:w-[20vw]  xl:px-0 xs:mt-3 mt-8 md:mt-0 lg:px-1 xl:mt-0">
              <h1 className="font-satoshi text-xl font-semibold md:text-lg xl:text-[1.3vw] xl:tracking-wider xs:text-[4vw] xs:tracking-wide hidden md:flex">
                Filters
              </h1>
              <h1 className="font-satoshi text-xl font-semibold md:text-lg xl:text-[1.3vw] xl:tracking-wider xs:text-[4vw] xs:tracking-wide md:hidden">

              </h1>
              <img
                src="/Frame 19.png"
                alt=""
                className="w-[7vw] md:w-[5vw] xl:w-[2.6vw]"
                onClick={isSmallScreen ? isAnimate : null}
              />
            </div>
            <Filter
              className={""}
              setFiltered2={setfilteredData2}
              datad={filteredData}
            />
          </div>
          <div
            className={`${
              viewport <= 768 ? "animate-me-products " : ""
            } all md:mt-[12vw] xl:mt-[10vw] w-full mt-2 px-0 py-2 md:py-0 xs:mt-[-2vw] grid grid-cols-2 md:h-[108vw] md:grid-cols-3 gap-x-0 gap-y-4 md:gap-x-0  place-items-center lg:h-auto lg:mt-[15vw] xl:h-[87vw] xl:w-[69vw] md:gap-y-3 ${
              value ? "hidden" : ""
            } relative`}
          >


            {filteredData && filteredData.length > 0 ? (
              filteredData.map((prod, index) => {
                const isFiltered = filteredData2?.some(
                  (filteredProduct) => filteredProduct.id === prod.id
                );

                return (
                  <div
                    key={index}
                    className={`w-[44vw] md:w-[23vw] md:h-[40vw] h-[62vw] xs:h-[62vw] lg:h-[35vw] lg:w-[23vw] xl:h-[28vw] xl:w-[22vw] flex justify-center xs:justify-center xs:items-center items-start rounded-2xl relative overflow-hidden ${
                      !isFiltered ? "blur brightness-75" : ""
                    }`}
                  >
                    {addProductLoading[prod?.id] ? (
                      <div className="flex justify-center items-center">
                        <ClipLoader
                          color="#000000"
                          loading={true}
                          size={Math.min(20, window.innerWidth * 0.1)}
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (authStatus) {
                            console.log(prod?.img);

                            if (!prod?.isAvailable) {
                              addProducts(prod?.img, prod);
                            } else {
                              alert("already added!");
                            }
                          } else {
                            navigate("/auth");
                          }
                        }}
                        className={`absolute xl:left-[17vw] xl:top-[1vw] text-zinc-100 bg-[#1a0f0f42] xl:p-[0.45vw] rounded-full flex items-center justify-center xl:text-[0.9vw] transition-all duration-200 lg:left-[18vw] lg:top-[4vw] md:left-[19vw] md:top-[3.4vw] md:text-[1.4vw] md:p-1 left-[36vw] top-[5vw] p-2 xs:left-[35vw] xs:top-[2.4vw] xs:text-[3vw] xs:p-[1.6vw]`}
                      >
                        {prod?.isAvailable ? (
                          <IoCheckmarkDoneSharp className="text-green-700" />
                        ) : (
                          <IoCartSharp />
                        )}
                      </button>
                    )}

                    <NavLink to={`/Product-details/${prod?.id}`} key={prod?.id} >
                      <ProductCard
                        onClick={handleNavClick}
                        imgg={prod.img}
                        heading={prod.displayName}
                        ratingg={prod.ratings}
                        newPrice={prod?.price}
                        className={
                          "w-[320px] my-0 xs:flex flex-col justify-center items-center"
                        }
                        classNamee={`h-[42vw] md:h-[21vw] px-3 lg:h-[20vw] xs:h-[44vw] xs:px-0 xl:h-[20vw] xs:w-[43vw] md:top-[-2vw] md:w-[24vw] lg:w-[23vw] xl:w-[20vw]`}
                        margin={`mt-[0vw] ml-[7vw] md:ml-0 xs:ml-0 px-3 xs:px-0 xs:w-[43vw] md:px-2 xl:pl-3  lg:mt-[-0.3vw] xl:px-0 xl:mt-0`}
                        textClass={
                          "text-[2.5vw] xs:text-[3vw] md:text-[1.8vw] xl:text-[1vw]"
                        }
                        priceClass={
                          "text-[2.5vw] xs:text-[3.3vw] xl:text-[1.3vw] lg:text-[2vw]"
                        }
                      />
                    </NavLink>
                  </div>
                );
              })
            ) : (
              <p>No products available for this category</p> // Display message if no products
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default AllProducts;
