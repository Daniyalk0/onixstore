import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../components/Context";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true)
  const {authStatus} = useMyContext()

  console.log('fgfdgfdg', authStatus);
  

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/auth");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloader(false)
  }, [authentication, authStatus , navigate]);

  return !loader ? <>{children}</> : <h1>loading...</h1>;
}

export default AuthLayout;