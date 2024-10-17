import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import products from "../products.json";
import ProductCard from "./ProductCard";

function RelatedProducts({ productss, slug }) {
  const [product, setProduct] = useState(products);


  return (
    <div className="flex w-full justify-center items-center mt-[5vw] xs:mt-[1vw] md:mt-[2vw]">
      <div className="w-full px-4  py-14 xl:py-10 overflow-hidden lg:px-6 lg:py-8 xl:px-14 max-w-[1600px] ">
        <div className="leading-9 flex flex-col w-full justify-center my-8 xs:leading-6 xs:my-0 md:flex-row md:gap-2 xl:my-0">
          <h1 className="font-integral text-[5.5vw]    md:text-[5vw]  lg:text-[3vw] text-center xl:font-semibold xl:text-[2vw]">
            you might
          </h1>
          <h1 className="font-integral text-[5.5vw]  md:text-[5vw]  lg:text-[3vw] text-center xl:font-semibold xl:text-[2vw]">
            also like
          </h1>
        </div>{" "}
        <div className="flex items-center lg:justify-center md:pl-44 lg:pl-[50vw] lg:gap-6 2xl:justify-center overflow-auto xl:pt-[5vw] md:justify-center xs:pt-[3vw] xl:pl-[60vw]">
          {productss
            ?.filter((prod) => prod.img) 
            .map((prod) => (
              <NavLink to={`/Product-details/${prod?.id}`} key={prod?.id}>
                <ProductCard
                  ratingg={prod.ratings}
                  imgg={prod.img}
                  heading={prod.name}
                  newPrice={prod.price}
                />
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
