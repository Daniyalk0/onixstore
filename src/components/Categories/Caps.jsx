import React, { useEffect } from 'react'
import AllProducts from '../AllProducts'
import { useLocation } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Caps() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner
  }, [pathname]);




  return (
    <div className=''><AllProducts/></div>
  )
}

export default Caps