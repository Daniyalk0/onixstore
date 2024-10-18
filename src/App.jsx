import React, { useEffect, useRef } from "react";
import Home from "./components/Home";
import Hamburger from "./components/menu/Hamburger";
import DesktopNav from "./components/menu/DesktopNav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Subscribe from "./components/Subscribe";
import { useMyContext } from "./components/Context";
import authService from "./appwrite/auth";
import service from "./appwrite/conf";
import conf from "./conf";
import LoadingLayout from "./loadingLayout/LoadingLayout";
import { useSnackbar } from 'notistack';


function App() {
  const { login, logout, setAllProducts, setallProductsLoading, allProductsLoading } = useMyContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch and set products
    const fetchProducts = async (userId) => {
    
      try {
        const products = await service.getProducts(userId);
        if (products) {
          setAllProducts(products);
         
        } else {
          console.log("No products available");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      
      }
    };

    const fetchUserAndProducts = async () => {
      setallProductsLoading(true)
      const user = await authService.getCurrentUser();
      if (user) {
        fetchProducts(user.$id);
        setallProductsLoading(false)
      } else {
        console.log("No user is logged in");
        setallProductsLoading(false)
      }
    };

    fetchUserAndProducts();

    const unsubscribe = service.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`,
      (response) => {
        console.log("Realtime event received:", response);
        if (
          response.events.some((event) =>
            event.includes("databases.*.collections.*.documents.*")
          )
        ) {
          fetchUserAndProducts();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [authService, service]);


  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        login();
        console.log("userData in app.jsx");
      } else {
        logout();
        console.log("no userData in app.jsx");
      }
     
    });
  }, [authService]);


  return (
    <LoadingLayout>
      <div>
        <Hamburger />
        <DesktopNav />
        <main>
          <Outlet />
        </main>

        <Subscribe />
        <Footer />
      </div>
    </LoadingLayout>
  );
}

export default App;
