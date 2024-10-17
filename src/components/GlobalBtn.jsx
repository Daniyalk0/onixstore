import React from "react";
import { NavLink } from "react-router-dom";

function GlobalBtn({ className, text, route, ...props }) {
  return (
    <NavLink to={route}>
      <button
        className={`px-7 py-[9px] hover:text-black hover:bg-zinc-300 transition-all duration-300 bg-black text-white rounded-full text-[0.8vw] font-satoshi tracking-wide ${className} capitalize`}
        {...props}
      >
        {text}
      </button>
    </NavLink>
  );
}

export default GlobalBtn;
