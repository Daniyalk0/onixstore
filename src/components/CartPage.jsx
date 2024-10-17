import React, { useEffect } from "react";
import Container from "./Container";
import { useMyContext } from "./Context";
import { IoTrashBin } from "react-icons/io5";
import { useState } from "react";
import { FaMinus, FaP } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import service from "../appwrite/conf";
import { gsap } from "gsap";
import { ClipLoader } from "react-spinners";

function CartPage() {
  const {
    namesUpdated,
    allProducts,
    addProducts,
    decreaseQuantity,
    removeProduct,
    itemsLoading,
    IncreaseQuantity,
    increaseQuantityLoading,
    decreaseQuantityLoading,
  } = useMyContext();
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(allProducts.length ? 10 : 0); 
  const [total, setTotal] = useState(0);
  const [AppliedPromoCode, setAppliedPromoCode] = useState();
  const [promoCodeText, setpromoCodeText] = useState(true);
  const [clickedItem, setClickedItem] = useState("");

  useEffect(() => {
    const hasAnimatedCartPage = sessionStorage.getItem("hasAnimatedCartPage");

    if (!hasAnimatedCartPage) {
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

      sessionStorage.setItem("hasAnimatedCartPage", "true");
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

  const viewport = window.innerWidth;
  useEffect(() => {
    console.log(viewport);
  }, [viewport]);

  const [promoCode, setPromoCode] = useState(""); 
  const [promoDiscount, setPromoDiscount] = useState(0); 

  const validPromoCodes = {
    SAVE10: 0.1, 
    SAVE50: 50, 
  };

  useEffect(() => {
    // Calculate Subtotal
    const newSubtotal = allProducts.reduce(
      (acc, item) => acc + item.productPrice * item.productQuantity,
      0
    );

    // Apply Discount (20% off subtotal)
    const newDiscount = newSubtotal * 0.2;

    // Calculate the Total Amount before promo code
    const totalBeforePromo = newSubtotal - newDiscount + deliveryFee;

    // Apply Promo Code Discount
    const newTotal = totalBeforePromo - promoDiscount;

    // Update states
    setSubtotal(newSubtotal);
    setDiscount(newDiscount);
    setTotal(newTotal);
  }, [allProducts, deliveryFee, promoDiscount]);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value.toUpperCase()); // Convert promo code to uppercase
  };

  const applyPromoCode = () => {
    const promoDiscountValue = validPromoCodes[promoCode] || 0;
    if (promoDiscountValue) {
      setpromoCodeText(false);
      setPromoCode("");
    }

    const totalBeforePromo = subtotal - discount + deliveryFee;

    // Calculate the promo discount (percentage or fixed)
    const discountFromPromo =
      typeof promoDiscountValue === "number" && promoDiscountValue <= 1
        ? totalBeforePromo * promoDiscountValue // percentage-based promo
        : promoDiscountValue; // fixed amount promo

    // Apply promo discount
    setPromoDiscount(discountFromPromo);
    setAppliedPromoCode(promoCode); // Track applied promo code
  };

  return (
    <Container>
      <div className="w-full  mt-[23vw] px-8 xs:px-3 lg:px-14 xs:mt-[26vw]  md:mt-[16vw] lg:mt-28 md:px-11 ">
        <div className="overflow-hidden">
          <h1 className="font-integral text-[6vw]  md:text-[5vw]  lg:text-[3.5vw] text-left xl:font-semibold xl:text-[1.6vw] capitalize  leading-[7vw] xs:leading-8 tracking-wide  xs:tracking-wider xs:text-[6vw] lg:leading-10 xl:w-[40%] 2xl:text-[2vw] text-black animate-me">
            YOUR CART
          </h1>
        </div>
        <div className="flex flex-col items-center px-8 xs:px-4 lg:flex-row lg:items-start lg:justify-between  lg:mt-7 lg:px-4 xl:px-16">
          
          <div className=" border-t-[1px] border-[#1010102d] lg:border-b-[1px]  w-full flex flex-col gap-10  overflow-y-auto pt-7 xs:mt-10 lg:pt-0 lg:w-[62%] lg:mt-0  lg:max-h-[400px] xl:max-h-[400px] xl:w-[55%] mt-10 mb-16 xl:min-h-[320px] animate-me">
            {allProducts.length > 0 ? (
              allProducts.map((cart) => (
                <div
                  key={cart?.$id}
                  className="flex items-center w-full justify-between relative xxs:w-[98%]"
                >
                  <div className="flex items-center gap-2 w-full h-full overflow-hidden">
                    <div className="w-[30%] md:w-[20%] xl:w-[20%] animate-me">
                      <img
                        src={service.getFilePreview(cart?.productImage)}
                        alt=""
                        className={`w-full h-full ${
                          itemsLoading && clickedItem === cart?.$id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      />
                    </div>
                    <div className="details capitalize md:w-[80%] w-[70%] py-0 h-full xl:flex xl:flex-col xl:gap-[0.1vw]">
                      <div className="overflow-hidden">
                        <h1
                          className={`animate-me font-satoshiBold tracking-tighter md:text-[2.5vw] text-[3vw] xs:text-[3.5vw] lg:text-[1.9vw] xl:text-[1.1vw] ${
                            itemsLoading && clickedItem === cart?.$id
                              ? "opacity-50 pointer-events-none"
                              : ""
                          } ${viewport < 768 ? "truncate-ellipsis" : ""}`}
                        >
                          {cart?.productName}
                        </h1>
                      </div>
                      <div
                        className={`overflow-hidden size flex items-center font-satoshi gap-1 text-[2.5vw] xs:text-[3vw] lg:text-[1.3vw] xl:text-[0.7vw] ${
                          itemsLoading && clickedItem === cart?.$id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        <p className="animate-me">size:</p>
                        <p className="text-zinc-500 animate-me">
                          {cart?.productSize}
                        </p>
                      </div>
                      <div
                        className={`color overflow-hidden flex items-center font-satoshi gap-1 text-[2.5vw] xs:text-[3vw] lg:text-[1.3vw] xl:text-[0.7vw] ${
                          itemsLoading && clickedItem === cart?.$id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        <p className="animate-me">color:</p>
                        <p className="text-zinc-500 animate-me">
                          {cart?.productColor}
                        </p>
                      </div>
                      <div
                        className={`quantity flex items-center mt-5 justify-start gap-[50%] lg:gap-[60%] xs:mt-3 md:mt-3 md:gap-[64%] xl:mt-3 xl:gap-[75%] ${
                          itemsLoading && clickedItem === cart?.$id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        <div className="overflow-hidden">
                          <h1 className="text-[4vw] text-black lg:text-[2.5vw] font-satoshiBold xl:text-[1.4vw] animate-me">
                            ${cart?.productPrice}
                          </h1>
                        </div>
                        <div className="flex items-center gap-5 xs:items-center xs:justify-center xs:gap-5 xl:gap-4 xxs:gap-3 overflow-hidden">
                          {decreaseQuantityLoading[cart?.$id] ? (
                            <div className="flex justify-center items-center">
                              <ClipLoader
                                color="#000000"
                                loading={true}
                                size={Math.min(20, window.innerWidth * 0.1)}
                              />
                            </div>
                          ) : (
                            <FaMinus
                              className="text-[3vw] font-satoshiBold xs:text-[4vw] lg:text-[2vw] xl:text-[1vw] animate-me cursor-pointer"
                              onClick={(event) => {
                                if (!itemsLoading) {
                                  event.preventDefault(); // Prevent navigation
                                  decreaseQuantity(cart?.$id); // Call your decreaseQuantity function
                                }
                              }}
                            />
                          )}

                          <p className="text-[3.3vw] font-satoshiBold xs:text-[4vw] lg:text-[2vw] xl:text-[1vw] animate-me">
                            {cart?.productQuantity}
                          </p>
                          {increaseQuantityLoading[cart?.$id] ? (
                            <div className="flex justify-center items-center">
                              <ClipLoader
                                color="#000000"
                                loading={true}
                                size={Math.min(20, window.innerWidth * 0.1)}
                              />
                            </div>
                          ) : (
                            <FaPlus
                              className="text-[3vw] xs:text-[4vw] font-satoshiBold lg:text-[2vw] xl:text-[1vw] animate-me cursor-pointer"
                              onClick={() => {
                                if (!itemsLoading) {
                                  IncreaseQuantity(cart?.$id, 1);
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <IoTrashBin
                    className={`text-red-600 absolute text-[4vw] lg:text-[2vw] xl:text-[1.1vw] right-[0.4vw] top-3 z-[998] cursor-pointer animate-me ${
                      itemsLoading && clickedItem === cart?.$id
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={(e) => {
                      setClickedItem(cart?.$id);
                      removeProduct(cart?.productImage, cart?.$id);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="overflow-hidden">
                <h1 className="text-center animate-me">No Products</h1>
              </div>
            )}
          </div>
          <div className=" w-[110%] xs:w-[100%] lg:w-[36%] font-satoshiBold capitalize xl:w-[34%] ">
            <div className="overflow-hidden">
              <h1 className="text-[3.5vw] lg:text-[1.8vw] animate-me">
                order summary
              </h1>
            </div>
            <div className="mt-3">
              <div className="flex flex-col gap-3">
                <div className="w-full flex items-center justify-between lg:text-[1.2vw] xl:text-[1vw] overflow-hidden">
                  <p className="text-zinc-400 font-satoshi animate-me">
                    subtotal
                  </p>
                  <p className="animate-me">${subtotal.toFixed(2)}</p>
                </div>
                <div className="w-full flex items-center justify-between lg:text-[1.2vw] xl:text-[1vw] overflow-hidden">
                  <p className="text-zinc-400 font-satoshi animate-me">
                    discount (20%)
                  </p>
                  <p className="text-red-500 animate-me">
                    -${discount.toFixed(2)}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between lg:text-[1.2vw] xl:text-[1vw] overflow-hidden">
                  <p className="text-zinc-400 font-satoshi animate-me">
                    delivery free
                  </p>
                  <p className="animate-me">${deliveryFee.toFixed(2)}</p>
                </div>
                {promoDiscount > 0 && (
                  <div className="w-full flex items-center justify-between lg:text-[1.2vw] xl:text-[1vw] overflow-hidden">
                    <p className="text-zinc-400 font-satoshi animate-me">
                      promo code discount
                    </p>
                    <p className="animate-me">${promoDiscount.toFixed(2)}</p>
                  </div>
                )}
              </div>
              <div className="w-full flex items-center justify-between lg:text-[1.3vw] lg:mt-6 xl:text-[1.2vw] mt-8 overflow-hidden">
                <p className="text-zinc-900 font-satoshi animate-me">total</p>
                <p className="text-[3.5vw] lg:text-[1.8vw] xl:text-[1.4vw] animate-me">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="promo capitalize  lg:w-[100%] lg:h- flex items-center justify-between lg:h-[4.3vw] mt-4 xl:h-[3vw] h-[8vw] mb-8 xs:h-[10vw] ">
              <div className="w-full h-full relative flex items-center font-satoshi justify-between animate-me">
                <IoMdPricetag className="absolute left-[2%] top-[33%] lg:text-[1.9vw] -rotate-90 text-zinc-400 xl:text-[1.4vw] xl:top-[27%] xl:left-[1.6%] text-[3vw] lg:left-[3%] lg:top-[33%] " />
                <input
                  type="text"
                  onChange={(e) => handlePromoCodeChange(e)}
                  value={promoCode}
                  placeholder="Add promo code "
                  className=" pl-10 w-[70%] xs:w-[73%] lg:w-[71%] h-full lg:pl-11 rounded-full lg:text-[1.5vw] placeholder:lg:text-[1.2vw] placeholder:xl:font-satoshiBold placeholder:xl:text-[0.9vw]  xl:font-satoshiBold xl:text-[0.9vw] xl:w-[70%] xl:pl-8 outline-none focus:border-[1px] border-[#00000035]"
                />
                {promoCodeText && (
                  <p className=" font-satoshiBold text-red-500  xl:text-[0.6vw] w-full absolute xl:top-[3.3vw] xl:left-[1vw] top-[8.4vw] text-[1.5vw] left-[2vw] xs:top-[9.6vw] md:top-[4.5vw] md:text-[0.7vw] md:left-[1.6vw]">
                    use 'SAVE10' to get 10% discount
                  </p>
                )}
                <button
                  className="text-center w-[25%] lg:w-[27%] rounded-full bg-black text-white h-[100%] lg:text-[1.3vw] tracking-wide xl:w-[25%] xl:text-[0.9vw]"
                  onClick={applyPromoCode}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <button className="w-full h-[8vw] animate-me  rounded-full lg:mt-6 bg-zinc-900 text-white font-satoshi tracking-wider xl:h-[3vw] xs:h-[10vw] flex items-center justify-center gap-2 lg:h-[4.4vw]">
                <h2> Go to Checkout</h2>
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
