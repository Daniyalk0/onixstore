import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import products from "../products.json"; // Adjust the path accordingly
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

function MobileSearch({ state, setState }) {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [searchProductsState, setsearchProductsState] = useState(true);
  const [crossIcon, setcrossIcon] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [filteredProducts, setfilteredproducts] = useState();

  const [product, setproduct] = useState(products);
  console.log(product);

  const TopSelling = [
    {
      id: "124e13b9-2d54-4b2f-a74d-a77b362d6ead",
      category: "Men's Sneaker",
      name: "ULTRABOOST 22 SHOES",
      seller: "Addidas",
      price: 420,
      stock: 20,
      ratings: 4,
      ratingsCount: 3725,
      img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      shipping: 1,
      quantity: 0,
    },
    {
      id: "6602468a-a3a8-4c2c-9d3a-fd54e2c5daf7",
      category: "Men's Boot",
      name: "RESPONSE 3MC ADV BOOTS",
      seller: "Addidas",
      price: 104,
      stock: 6,
      ratings: 5,
      ratingsCount: 354,
      img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b513f2cec8b440978d60ab6d014ad452_9366/Response_3MC_ADV_Boots_Black_EG9391_01_standard.jpg",
      shipping: 26,
      quantity: 0,
    },
    {
      id: "71dfc7f9-844b-4be7-816f-891a5cbaa0f1",
      category: "Cap",
      name: "Superlite Hat",
      seller: "Addidas",
      price: 10,
      stock: 10,
      ratings: 5,
      ratingsCount: 47,
      img: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/272d5d9cb7b74415a6c9ac8e015a4ccc_9366/Superlite_Hat_Black_EX7048_01_standard.jpg",
      shipping: 24,
      quantity: 0,
    },
    {
      id: "35ac57f9-870a-4299-aac8-e5d8d2716b31",
      category: "Bag",
      name: "Excel Backpack",
      seller: "Addidas",
      price: 62,
      stock: 18,
      ratings: 5,
      ratingsCount: 168,
      img: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/ac09bb56249b43158485aca1007cc1ef_9366/Excel_Backpack_Black_EX6933_01_standard.jpg",
      shipping: 14,
      quantity: 0,
    },
  ];

  useEffect(() => {
    const handleScrollLock = () => {
      if (window.innerWidth <= 768) {
        if (state) {
          document.body.style.overflow = "hidden";
          setVisible(true); 
          setTimeout(() => {
            setOpacity(true); 
          }, 50); 
        } else {
          setOpacity(false);
          setTimeout(() => {
            setVisible(false); 
            document.body.style.overflow = "auto";
          }, 200); 
        }
      }
    };
  
    handleScrollLock();
  
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [state]);
  

  const InputChange = (value) => {
    setinputValue(value);


    if (value === "") {
      setfilteredproducts([]);
    } else {
      showProductsOnChange(value);
    }

    if (value !== "" && value !== null) {
      setcrossIcon(true);
      setsearchProductsState(false);
    } else {
      setsearchProductsState(true);
      setcrossIcon(false);
    }
  };

  const crossIconClick = () => {
    setinputValue("");
    setcrossIcon(false);

  };

  const showProductsOnChange = (inputValue) => {
    const trimmedInputValue = inputValue.trim(); // Trim any leading or trailing spaces
    const searchedProducts = product?.filter((pro) =>
      pro.name.toLowerCase().includes(trimmedInputValue.toLowerCase())
    );
    setfilteredproducts(searchedProducts);
  };

  return (
    <div
      className={`fixed md:hidden  z-[1000] top-0 left-0 w-full min-h-screen bg-white transition-opacity duration-200 ${
        opacity ? "opacity-1" : "opacity-0"
      } ${visible ? "block" : "hidden"} px-6 py-5`} 
    >
      <div className="mt-[1vw]">
        <FaArrowLeft onClick={() => setState(false)} className="text-2xl" />
      </div>
      <div className="flex w-full flex-col justify-center items-center mt-[10vw]">
        <div className="relative flex justify-center items-center w-[93vw] h-[7vw] rounded-full overflow-hidden xs:h-[10vw]">
          <IoSearchOutline className="absolute left-2 text-zinc-500 text-2xl" />
          <input
            type="text"
            value={inputValue}
            placeholder="Search Products.."
            className="w-[100%] h-full px-10 text-xl font-satoshi bg-[#ececec] focus:outline-none focus:border-[#2c2c2c] transition-all duration-150 border-b-[1px] border-zinc-400 "
            onChange={(e) => InputChange(e.target.value)}
          />
          <RxCross2
            className={`absolute right-3 text-zinc-900 text-md ${
              crossIcon ? "inline-block" : "hidden"
            }`}
            onClick={crossIconClick}
          />
        </div>
        <div className="overflow-y-auto max-h-[75vh] w-full mt-[6vw] flex flex-col items-center ">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((prod) => (
              <NavLink to={`/product-details/${prod?.id}`} onClick={() => setState(false)}>

              <ProductCard
                key={prod.id}
                heading={prod?.name}
                imgg={prod?.img}
                ratingg={prod?.ratings}
                newPrice={prod?.price}
                className={"flex  w-[70%] items-center xs:flex-row xs:w-[70vw]"}
                classNamee={"w-[30vw] h-[30vw] xs:w-[30vw] xs:h-[30vw]"}
                margin={""}
                textClass={"text-[3vw]"}
                ratingClass={"w-[14vw] text-[2.2vw]"}
                priceClass={"text-[3vw]"}
                />
                </NavLink>
            ))
          ) : inputValue.length > 0 ? (
            <p className="font-satoshi text-zinc-700 font-semibold ">No results found</p>
          ) : (
            <>
              <h1 className="mt-4 font-integral tracking-wide">Top Selling</h1>
              {TopSelling?.map((prod) => (
                <NavLink to={`/product-details/${prod?.id}`} onClick={() => setState(false)}>
                <ProductCard
                  key={prod.id}
                  heading={prod?.name}
                  imgg={prod?.img}
                  ratingg={prod?.ratings}
                  newPrice={prod?.price}
                  className={"flex  w-[70%] items-center xs:flex-row xs:w-[70vw]"}
                  classNamee={"w-[30vw] h-[30vw] xs:w-[30vw] xs:h-[30vw]"}
                  margin={""}
                  textClass={"text-[3vw]"}
                  ratingClass={"w-[14vw] text-[2.2vw]"}
                  priceClass={"text-[3vw]"}
                />
              </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileSearch;
