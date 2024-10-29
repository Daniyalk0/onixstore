import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import products from "../products.json";
import { FaCheck } from "react-icons/fa6";
import "@smastrom/react-rating/style.css";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import GlobalBtn from "./GlobalBtn";

import { Rating } from "@smastrom/react-rating";
import RelatedProducts from "./RelatedProducts";
import Container from "./Container";
import { useMyContext } from "./Context";
import service from "../appwrite/conf";
import { ClipLoader } from "react-spinners";
import { gsap } from "gsap";

function ProductDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(products);
  const [pro, setPro] = useState(null);
  const [related, setRelated] = useState();
  const [productImg, setProductImg] = useState(1);
  const [productColor, setProductColor] = useState();
  const [productColorState, setProductColorState] = useState(1);
  const [productSize, setProductSize] = useState();

  const [productQuantity, setProductQuantity] = useState(1);
  const { pathname } = useLocation();

  const [isColorAvailable, setisColorAvailable] = useState(true);
  const {
    addProducts,
    decreaseQuantity,
    addToCart,
    IncreaseQuantity,
    addProductsByQuantity,
    isProductAvailable,
    allProducts,
    addProductByQuantityLoading,
    cartItems,
    authStatus,
  } = useMyContext();

  const [isProductSaved, setIsProductSaved] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const dat = data?.find((d) => d.id === slug);
    setPro(dat);
    setProductSize(dat?.size);
    setProductColor(dat?.color);
    console.log("colro value", productColor);
    console.log("size value", productSize);

    console.log("datttt", dat);
    console.log(slug);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (pro) {
      const filteredProducts = data?.filter(
        (product) => product.category === pro.category && product.id !== pro.id
      );
      setRelated(filteredProducts);
      console.log(filteredProducts);
    }
  }, [pro, data]);

  const checkColor = (prod) => {
    if (prod !== pro?.color) {
      setisColorAvailable(false);
    } else {
      setisColorAvailable(true);
    }
  };

  const sizeHandle = (e) => {
    setPro((prevPro) => ({
      ...prevPro,
      size: e,
    }));

    console.log("Updated size:", e);
  };

  useEffect(() => {
    const checkProduct = async () => {
      try {
        const exists = allProducts.some(
          (product) => product.productId === slug
        );

        if (exists) {
          setIsProductSaved(true);
        } else {
          console.log("Product is not saved in the database.");
          setIsProductSaved(false);
        }
      } catch (error) {
        console.error("Error checking product:", error);
      }
    };

    if (slug) {
      checkProduct();
    }
  }, [slug, allProducts, cartItems, addProductByQuantityLoading]);
  const getItemsLimit = () => {
    const width = window.innerWidth;
    console.log(width);

    return width < 768 ? 20 : 9;
  };

  // console.log(pro);

  const handleAddToCart = async () => {
    const limit = getItemsLimit();

    const updatedProduct = {
      ...pro,
      displayName:
        pro.name.length > limit ? pro.name.slice(0, limit) + "..." : pro.name,
    };
    console.log(updatedProduct);

    await addProductsByQuantity(
      updatedProduct?.img,
      updatedProduct,
      productQuantity,
      productColor,
      productSize
    );
  };

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
    } else {
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

  return (
    // <Container>
    <div className="w-full flex justify-center overflow-hidden flex-col">
      <div className="px-6 py-3 mt-[20vw]  xs:mt-[33vw] lg:flex lg:mt-[8vw] xl:flex justify-center items-center xl:mt-[2vw] xl:justify-around 2xl:gap-32 max-w-[1500px] ">
        <div className="productImages flex flex-col lg:flex-row-reverse lg:items-center xl:gap-6">
          <div
            className={`flex justify-center lg:h-[40vw] lg:p-2 xl:h-[30vw] overflow-hidden`}
          >
            <img
              src={
                productImg === 1 && isColorAvailable
                  ? pro?.img
                  : !isColorAvailable
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTEghTW2XOwmp-PbaaC76eKvC7jH61oZfDQ&s"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTEghTW2XOwmp-PbaaC76eKvC7jH61oZfDQ&s"
              }
              alt=""
              className="w-[330px] lg:w-[400px] md:h-[350px] h-[320px] md:w-[370px] xl:w-[360px] xl:py-5 rounded-3xl 2xl:w-[390px] animate-me"
            />
          </div>
          <div className="flex justify-center gap-3 mt-[5vw] xs:gap-3 md:gap-8 lg:flex-col lg:gap-4 xl:mt-0 animate-me">
            <div
              className={` w-[150px] bg-[#EBEEF0] rounded-2xl  p-3 overflow-hidden  lg:h-[13vw] lg:w-[130px]  xl:h-[9vw] xl:w-[120px] 2xl:w-[150px] xs:h-[25vw] xs:w-[25vw] border-[1px] transition-all duration-200  ${
                productImg === 1 && isColorAvailable
                  ? " border-[#272727]"
                  : "border-transparent"
              }`}
              onClick={() => {
                setProductImg(1);
                setProductColorState(1);
                setProductColor(pro?.color);
                setisColorAvailable(true);
              }}
            >
              {" "}
              <img src={pro?.img} alt="" />
            </div>
            <div
              className={`w-[150px] bg-[#EBEEF0] rounded-2xl  p-3 overflow-hidden  lg:h-[13vw] lg:w-[130px]  xl:h-[9vw] xl:w-[120px] 2xl:w-[150px] xs:h-[25vw] xs:w-[25vw] border-[1px] transition-all duration-200  ${
                productImg === 2 ? " border-[#272727]" : "border-transparent"
              }`}
              onClick={() => setProductImg(2)}
            ></div>

            <div
              className={`w-[150px] bg-[#EBEEF0] rounded-2xl  p-3 overflow-hidden  lg:h-[13vw] lg:w-[130px]  xl:h-[9vw] xl:w-[120px] 2xl:w-[150px] xs:h-[25vw] xs:w-[25vw] border-[1px] transition-all duration-200  ${
                productImg === 3 ? " border-[#272727]" : "border-transparent"
              }`}
              onClick={() => setProductImg(3)}
            ></div>
          </div>
        </div>
        <div className="productDet mt-[10vw] lg:w-[46vw] xl:w-1/2 2xl:w-[40vw] ">
          <div className="font-integral text-[3.5vw] leading-7 pr-[10vw] md:text-[5vw]  lg:text-[3vw] xs:text-[5vw] lg:pr-0 xl:leading-8 xl:text-[2.5vw] overflow-hidden">
            <h1 className="animate-me">{pro?.name}</h1>
          </div>
          <div className="overflow-hidden">
            <div className="rating flex items-center gap-1 py-4 md:mt-2 md:py-3  animate-me">
              <div className="stars w-[11vw] md:w-[16vw] xl:w-[6vw] xs:w-[20vw] lg:w-[12vw] lg:mb-1 ">
                <Rating
                  style={{ maxWidth: 400 }}
                  value={pro?.ratings}
                  readOnly
                  className="gap-1 "
                />
              </div>
              <div className="numbers font-satoshi ml-[5px] text-zinc-800 md:text-zinc-600 md:text-[3vw] xl:text-[1vw] text-[1.5vw] xs:text-[3vw] lg:text-[1.5vw] lg:font-semibold">
                {pro?.ratings}/5
              </div>
            </div>
          </div>
          <div className="price flex items-center gap-2 text-[2vw] md:text-[3.5vw] xl:text-[1.8vw] xs:text-[5vw] overflow-hidden">
            <div className="newPrice font-satoshi font-semibold animate-me">
              ${pro?.price}
            </div>
            <div className="oldPrice font-satoshi font-semibold text-zinc-400 line-through animate-me">
              {pro?.oldPrice ? "$" + oldPrice : ""}
            </div>
          </div>
          <div className="para text-zinc-500 tracking-normal text-[2.7vw] leading-6 md:text-[2.5vw] md:w-[85vw] lg:text-[1.7vw] xl:text-[0.9vw] xl:leading-4 xl:w-[80%] 2xl:leading-6 xs:text-[3.3vw] lg:w-[47vw] lg:mt-2 overflow-hidden">
            <p className="animate-me">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
              voluptates at provident incidunt voluptate, vel dicta!
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="colors my-[3vw] xs:my-[4vw] lg:my-[4.5vw] xl:my-2 animate-me">
              <div className="para text-zinc-500 tracking-normal text-[2.9vw] leading-6 md:text-[3vw] lg:text-[2vw] xl:text-[1vw] xl:text-zinc-600 xl:leading-4 xl:w-[90%] 2xl:leading-6 capitalize xs:text-[3.7vw] xl:mb-1">
                select colors
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`red w-[8vw] h-[8vw] xs:h-[10vw] xs:w-[10vw] rounded-full  mt-[2vw] lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[2.2vw] xl:h-[2.2vw] relative bg-${productColor} cursor-pointer`}
                  onClick={() => {
                    setProductColorState(1);
                    checkColor(productColor);
                  }}
                >
                  {productColorState === 1 && (
                    <FaCheck
                      className={`${
                        productColor === "zinc-200"
                          ? "text-black"
                          : "text-white"
                      } absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] top-[32%] left-[29%] text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw]`}
                    />
                  )}
                </div>

                <div
                  className="red w-[8vw] h-[8vw] xs:h-[10vw] xs:w-[10vw]  rounded-full bg-[#1e2e3e] mt-[2vw] lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[2.2vw] xl:h-[2.2vw] relative cursor-pointer"
                  onClick={() => {
                    setProductColorState(2);
                    checkColor("black");
                  }}
                >
                  {productColorState === 2 && (
                    <FaCheck className="text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] sm:top-[32%] sm:left-[29%] sm:text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw] " />
                  )}
                </div>

                <div
                  className={`red w-[8vw] h-[8vw] xs:h-[10vw] xs:w-[10vw]  rounded-full bg-[#362415] mt-[2vw] lg:w-[4vw] lg:h-[4vw] lg:mt-2 xl:w-[2.2vw] xl:h-[2.2vw] relative cursor-pointer`}
                  onClick={() => {
                    setProductColorState(3);
                    checkColor("dark-red");
                  }}
                >
                  {productColorState === 3 && (
                    <FaCheck className=" text-white absolute xl:top-[14%] xl:left-[32%]  xl:w-[35%] lg:left-[31%] lg:top-[30%] lg:text-[1.6vw] md:top-[31%] md:left-[32%] md:text-[3vw] sm:top-[32%] sm:left-[29%] sm:text-[3vw] xs:top-[30%] xs:left-[28%] xs:text-[4vw] " />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden my-[7vw] lg:my-[3vw]">
            <div className="size  w-full  animate-me xl:my-0">
              <div className="para text-zinc-500 tracking-normal text-[2.9vw] leading-6 md:text-[3vw] lg:text-[1.7vw] xl:text-[1vw] xl:leading-4 xl:w-[90%] 2xl:leading-6 capitalize xs:text-[3.7vw] xl:text-zinc-600 ">
                choose size
              </div>
              <div className="sizes capitalize flex justify-center xl:gap-10  mt-[2vw]  xl:w-[55%]  lg:gap-1 lg:mt-3 bg-[#EBEEF0] rounded-full overflow-hidden relative lg:w-[80%] md:w-[70%] w-[75%] gap-6 xs:gap-0  2xl:w-[65%]  xs:justify-around xs:w-[80%] xs:items-center 2xl:gap-14 lg:justify-around md:justify-around  xs:py-2 xl:px-3 xl:py-0">
                <div
                  className={`absolute bg-zinc-500 h-full 2xl:w-[24%] w-[23%] top-0 z-[1] xs:w-[23%] ${
                    productSize === "small"
                      ? "rounded-l-full"
                      : productSize === "x - large"
                      ? "rounded-r-full"
                      : "rounded-full"
                  } transition-all duration-200 ${
                    productSize === "small"
                      ? "left-0 xs:left-[-2vw]"
                      : productSize === "medium"
                      ? "left-[24%]"
                      : productSize === "large"
                      ? "left-[49%] xs:left-[52%] xl:left-[50%]"
                      : "left-[77%]"
                  }`}
                />
                <div
                  className={`small  z-10 xs:max-h-[46px] text-center px-3 py-3  rounded-3xl text-[3vw] md:text-[2.7vw] xs:py-0 lg:text-[1.5vw] xs:px-0 lg:h-full xl:text-[1vw] xl:py-2 xl:px-1 transition-all duration-200 cursor-pointer ${
                    productSize === "small" ? "text-white" : ""
                  }`}
                  onClick={(e) => {
                    setProductSize("small");
                    sizeHandle("small");
                  }}
                >
                  {" "}
                  small
                </div>
                <div
                  className={`small z-10 xs:px-3  xs:max-h-[46px] text-center px-3 py-3  rounded-3xl text-[3vw] xs:py-0 md:text-[2.7vw] lg:text-[1.5vw] lg:h-full xl:text-[1vw] xl:py-2 xl:px-1 $transition-all duration-200 cursor-pointer ${
                    productSize === "medium" ? "text-white" : ""
                  }`}
                  onClick={() => setProductSize("medium")}
                >
                  {" "}
                  medium
                </div>
                <div
                  className={`small z-10 xs:px-0 xs:max-h-[46px] text-center px-3 py-3  rounded-3xl text-[3vw] md:text-[2.7vw] xs:py-0 lg:text-[1.5vw] lg:h-full xl:text-[1vw] xl:py-2 xl:px-1 $transition-all duration-200 cursor-pointer ${
                    productSize === "large" ? "text-white" : ""
                  }`}
                  onClick={() => setProductSize("large")}
                >
                  {" "}
                  large
                </div>
                <div
                  className={`small z-10 xs:px-0 xs:max-h-[46px] text-center px-3 py-3  rounded-3xl text-[3vw] xs:py-0 md:text-[2.7vw] lg:text-[1.5vw] lg:h-full lg:px-4 xl:text-[1vw] xl:py-2 xl:px-1 transition-all duration-200 cursor-pointer ${
                    productSize === "x - large" ? "text-white" : ""
                  }`}
                  onClick={() => setProductSize("x - large")}
                >
                  {" "}
                  x - large
                </div>
              </div>
            </div>
          </div>
          <div className="addToCart flex items-center gap-4 overflow-hidden">
            <div
              className={`animate-me quantity  xl:w-[20vw] lg:w-[30vw]  flex items-center justify-center px-6 py-[2vw] rounded-full gap-5 xs:py-4 md:gap-8 xl:gap-5 xs:gap-4 bg-[#EBEEF0] xl:py-3 ${
                isProductSaved && "bg-zinc-300"
              }`}
            >
              <FaMinus
                className={`text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] xl:w-[1vw] md:w-[2vw] xs:text-[3vw] ${
                  isProductSaved && "text-zinc-400"
                } cursor-pointer`}
                onClick={
                  isProductSaved
                    ? undefined
                    : () => setProductQuantity((prev) => Math.max(prev - 1, 1))
                }
              />

              <h2
                className={`font-satoshi font-semibold text-[4vw] md:text-[3vw] lg:text-[2vw] xl:text-[1vw] w-[1vw] ${
                  isProductSaved && "text-zinc-400"
                }`}
              >
                {productQuantity}
              </h2>
              <FaPlus
                className={`text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] xl:w-[1vw] md:w-[2vw] xs:text-[3vw] ${
                  isProductSaved && "text-zinc-400"
                } cursor-pointer`}
                onClick={
                  !isProductSaved
                    ? () => setProductQuantity((prev) => prev + 1)
                    : null
                }
              />
            </div>

            <GlobalBtn
               onClick={() => {
                if (authStatus) {
                  handleAddToCart()
                    setTimeout(() => {
                      setProductQuantity(1)
                    }, 200);
                } else {
                  navigate("/auth");
                }
              }}
              text={
                addProductByQuantityLoading ? (
                  <div className="flex justify-center items-center">
                    <ClipLoader
                      color="#ffffff"
                      loading={true}
                      size={Math.min(20, window.innerWidth * 0.1)}
                    />
                  </div>
                ) : isProductSaved ? (
                  "already added"
                ) : (
                  "add to cart"
                )
              }
              className={`${
                isProductSaved && "text-zinc-400 bg-zinc-300"
              } xs:py-0 px-20 text-[3vw]  md:py-4 md:text-[2.5vw] lg:text-[1.8vw] xl:text-[1vw] md:w-[70vw] py-8 w-[60vw] xs:w-[60vw] h-[9vw] xs:h-[11vw] xl:h-[4vw] lg:h-[7vw] text-center xl:w-[35vw] xxs:w-[50vw] animate-me`}
            />
          </div>
        </div>
      </div>
      <RelatedProducts productss={related} slug={slug} />
    </div>
    /* </Container> */
  );
}

export default ProductDetails;
