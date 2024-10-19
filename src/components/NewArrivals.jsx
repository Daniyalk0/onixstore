import React, { useEffect, useRef, useState } from "react";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import products from "../products.json";
import { NavLink } from "react-router-dom";
import { useMyContext } from "./Context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function NewArrivals() {
  const [product, setProducts] = useState(products);
  const { cartState, setCartState, allProductsLoading } = useMyContext();
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
          start: "center bottom", 
          toggleActions: "play none none none",
        },
      }
    );


}, []); 

  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault();
    } else {
      setCartState(false);
    }
  };

  return (
    <div
      className="flex w-full justify-center items-center xl:mt-[0px] lg:py-8 bg-white"
      ref={containerRef}
    >
      <div className="w-full px-4 py-14 xl:py-10 overflow-hidden lg:px-10 xl:px-14 max-w-[1600px] xxs:py-6 xxs:mt-[5vw]" >
        <div className="overflow-hidden">
          <h1 className="font-integral text-[5.5vw]  md:text-[5vw] lg:font-integral2 lg:text-[3vw] text-center xl:font-semibold xl:text-[2vw] animate-me3">
            new arrivals
          </h1>
        </div>

        <div className="flex items-center md:justify-center lg:justify-center lg:gap-6 2xl:justify-center overflow-auto xl:pt-[5vw] xs:pt-[7vw] animate-me3 ">
          <NavLink
            to={`/Product-details/${product[44].id}`}
            className={""}
            onClick={handleNavClick}
          >
            {product[44] && (
              <ProductCard
                ratingg={product[44].ratings}
                newPrice={product[44].price}
                heading={product[44].name}
                imgg={product[44].img}
                className={'xxs:my-0 '}
                classNamee={'xxs:h-[33vw]'} 
                textClass={'xxs:text-[2.3vw] text-auto'}
                priceClass={'text-[2.6vw] text-[2vw] lg:text-[1.4vw] xl:text-[1.2vw]'}
              />
            )}
          </NavLink>
          <NavLink
            to={`/Product-details/${product[30]?.id}`}
            onClick={handleNavClick}
          >
            {product[30] && (
              <ProductCard
                ratingg={product[30].ratings}
                newPrice={product[30].price}
                heading={product[30].name}
                imgg={product[30].img}
                className={'xxs:my-0 '}
                classNamee={'xxs:h-[33vw]'} 
                textClass={'xxs:text-[2.3vw]'}
                priceClass={'text-[2.6vw] text-[2vw] lg:text-[1.4vw] xl:text-[1.2vw]'}
              />
            )}
          </NavLink>
          <NavLink
            to={`/Product-details/${product[2]?.id}`}
            onClick={handleNavClick}
          >
            {product[2] && (
              <ProductCard
                ratingg={product[2].ratings}
                newPrice={product[2].price}
                heading={product[2].name}
                imgg={product[2].img}
                className={'xxs:my-0 '}
                classNamee={'xxs:h-[33vw]'} 
                textClass={'xxs:text-[2.3vw]'}
                priceClass={'text-[2.6vw] text-[2vw] lg:text-[1.4vw] xl:text-[1.2vw]'}
              />
            )}
          </NavLink>
          <NavLink
            to={`/Product-details/${product[18]?.id}`}
            onClick={handleNavClick}
          >
            {product[18] && (
              <ProductCard
                ratingg={product[18].ratings}
                newPrice={product[18].price}
                heading={product[18].name}
                imgg={product[18].img}
                className={'xxs:my-0 '}
                classNamee={'xxs:h-[33vw]'} 
                textClass={'xxs:text-[2.3vw]'}
                priceClass={'text-[2.6vw] text-[2vw] lg:text-[1.4vw] xl:text-[1.2vw]'}
              />
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
