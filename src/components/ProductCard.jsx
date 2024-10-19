import React, { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";

import { Rating } from "@smastrom/react-rating";
import { useMyContext } from "./Context";

function ProductCard({
  imgg,
  heading,
  ratingg,
  newPrice,
  oldPrice,
  className,
  classNamee,
  margin,
  textClass,
  priceClass,
  ratingClass,
  prod,
  ...props
}) {
  const {authStatus} = useMyContext()

  const [displayText, setDisplayText] = useState(heading);

  useEffect(() => {
    const updateTextLength = () => {
      const width = window.innerWidth;
      let maxLength;

      if (width >= 1280) {

        maxLength = 24;
      } else if (width >= 768) {

        maxLength = 16;
      } else if (width <= 500){
      maxLength = 14
      }
      
      else {

        maxLength = 20;
      }

      setDisplayText(heading?.length > maxLength ? `${heading.slice(0, maxLength)}...` : heading);
    };

    updateTextLength(); 
    window.addEventListener('resize', updateTextLength); 

    return () => window.removeEventListener('resize', updateTextLength);
  }, [heading]);

  return (
    <div
      className={`${className} my-6 p-0  rounded-md w-[200px] h-[300px] 2xl:p-2  xl:my-0  xs:h-[230px] lg:h-[400px] lg:w-[300px] xl:w-[270px] md:h-[390px] xs:w-[140px]`} {...props}
    >
      <div
        className={` w-full h-[24vw] ${classNamee}  xl:h-[19vw] xs:h-[25vw] px-2 md:h-[23vw] lg:h-[22vw]`}
      >
        <img src={imgg} alt="no image" className="rounded-xl w-full h-full " />
      </div>
      <div
        className={`mt-[20px] lg:mt-[10px] flex flex-col  gap-1 md:gap-[4px] xs:px-2 p-2  ${margin}`}
      >
        <h1
          className={`font-satoshi font-semibold uppercase text-[1.7vw] tracking-wide md:text-[1.6vw] xl:text-[1.2vw] ${textClass}`}
        >
          {displayText}
        </h1>

        <div className="rating flex items-center gap-1">
          <div className={`stars w-[11vw] md:w-[10vw] xl:w-[6vw] ${ratingClass}`}>
            <Rating
              style={{ maxWidth: 400 }}
              value={ratingg}
              readOnly
              className=""
            />
          </div>
          <div className={`numbers font-satoshi ml-[5px] text-zinc-800 md:text-zinc-600 md:text-[1.6vw] xl:text-[1vw] text-[1.5vw] ${ratingClass}`}>
            {ratingg}/5
          </div>
        </div>
        <div className="price flex items-center gap-2 text-[2vw] md:text-[1.8vw] xl:text-[1.2vw]">
          <div className={`newPrice font-satoshi font-semibold ${priceClass}`}>
            ${newPrice}
          </div>
          <div className="oldPrice font-satoshi font-semibold text-zinc-400 line-through">
            {oldPrice ? "$" + oldPrice : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
