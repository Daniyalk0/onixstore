import React, { useEffect, useState, useRef } from "react";
import Container from "./Container";
import ProductCard from "./ProductCard";
import products from "../products.json";
import { NavLink } from "react-router-dom";
import { useMyContext } from "./Context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function TopSelling() {
  const [product, setProducts] = useState(products);
  const {cartState, setCartState} = useMyContext()
  const containerRef = useRef(null);


  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault(); 
    } else {
      setCartState(false); 
    }
  };
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


  return (

    <div  className="flex w-full justify-center items-center bg-white" ref={containerRef}>
      <div className="w-full px-4  py-14 xl:py-10 overflow-hidden lg:px-10 lg:py-8 xl:px-14 max-w-[1600px]">
        <div className="overflow-hidden">

        <h1 className="font-integral text-[5.5vw]  md:text-[5vw] lg:font-integral2 lg:text-[3vw] text-center xl:font-semibold xl:text-[2vw] animate-me3">
          Top Selling
        </h1>
        </div>
        <div className="flex items-center lg:justify-center lg:gap-6 2xl:justify-center overflow-auto xl:pt-[5vw] md:justify-center xs:pt-[7vw] animate-me3">
          <NavLink to={`/Product-details/${product[0]?.id}`} onClick={handleNavClick}>
            {product[0] && (
              <ProductCard
                ratingg={product[0].ratings}
                imgg={product[0].img} 
                heading={product[0].name}
                newPrice={product[0].price} 
              />
            )}
          </NavLink>
          <NavLink to={`/Product-details/${product[12]?.id}`} onClick={handleNavClick}>

          {product[12] && (
            <ProductCard
              ratingg={product[12].ratings}
              imgg={product[12].img} 
              heading={product[12].name}
              newPrice={product[12].price} 
            />
          )}
          </NavLink>
          <NavLink to={`/Product-details/${product[43]?.id}`} onClick={handleNavClick}>

          {product[43] && (
            <ProductCard
              ratingg={product[43].ratings}
              imgg={product[43].img}
              heading={product[43].name}
              newPrice={product[43].price} 
            />
          )}
          </NavLink>
          <NavLink to={`/Product-details/${product[35]?.id}`} onClick={handleNavClick}>

          {product[35] && (
            <ProductCard
              ratingg={product[35].ratings}
              imgg={product[35].img} 
              heading={product[35].name}
              newPrice={product[35].price}
            />
          )}
          </NavLink>

        </div>
      </div>
    </div>
  );
}

export default TopSelling;
