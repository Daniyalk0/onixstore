import React, { useEffect } from 'react'
import Filter from '../Filter'
import AllProducts from '../AllProducts'
import { useMyContext } from '../Context'
import { useLocation } from 'react-router-dom'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Sneekers() {
  const {value , setValue, cartState, setCartState} = useMyContext()
  const { pathname } = useLocation();

  const handleNavClick = (e) => {
    if (cartState) {
      e.preventDefault(); 
      setCartState(false)// Prevent navigation if cartState is true
    } 
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner
  }, [pathname]);


  return (
    <div onClick={handleNavClick} className=''>
      <AllProducts/>
      {/* <Filter/> */}
      </div>
  )
}

export default Sneekers