import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import confService from "../appwrite/conf";
import { nanoid } from "nanoid";
import authService from "../appwrite/auth";
import { useSnackbar } from "notistack";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [value, setValue] = useState(false);
  const [animate, setanimate] = useState(true);
  const [cartState, setCartState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [namesUpdated, setNamesUpdated] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setisAnimating] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [itemsLoading, setItemsLoading] = useState(false);
  const [cartNotification, setCartNotification] = useState(false);
  const [increaseQuantityLoading, setIncreaseQuantityLoading] = useState(false);
  const [decreaseQuantityLoading, setDecreaseQuantityLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [allProductsLoading, setallProductsLoading] = useState()
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductByQuantityLoading, setAddProductByQuantityLoading] = useState(false);


  const [Ids, setIds] = useState();
  const initialState = {
    authStatus: false,
    userData: null,
  };
  const path = window.location.pathname;

  const [authState, setAuthState] = useState();


  useEffect(() => {
    setAuthState(initialState);
  }, []);

  const login = async (userData) => {
    setAuthState({
      authStatus: true,
      userData: userData, 
    });
  };

  const logout = () => {
    setAuthState({
      authStatus: false,
      userData: null,
    });
  };

  const handleToggle = () => {

    setIsLogin((prev) => !prev);

  };


  const animatee = () => {
    setisAnimating(true);
    setTimeout(() => {
      setisAnimating(false);
      handleToggle();
    }, 300);
  };

  const isAnimate = () => {
    if (window.innerWidth < 768) {

      if (!value) {
        setValue(true);
        setanimate(false);
        setTimeout(() => {
          console.log(animate);
        }, 500);
      } else if (value) {
        setValue(false);
        setTimeout(() => {
          setanimate(true);
          console.log(animate);
        }, 200);
      }
    } else {
      console.log("Viewport is 768px or wider, isAnimate skipped");
    }
  };

  const ok = async () => {
    const auth = await authService.getCurrentUser();
    setUserId(auth.$id);
  };
  useEffect(() => {
    if (authState) {
      ok();
    }
  }, [authState]);

  const addProducts = async (fileUrl, productToAdd) => {

setAddProductLoading(true)
    const file = await confService.uploadFile(fileUrl);
    console.log("image", file);

    if (file) {
      const fileId = file.$id;

      const success = await confService.addProductToDatabase({
        productName: productToAdd?.name,
        productPrice: productToAdd?.price,
        productRating: productToAdd?.ratings,
        productImage: fileId,
        userId: userId,
        productQuantity: 1,
        productId: productToAdd.id,
        productColor: productToAdd.color,
        productSize: productToAdd.size,
      });
      if (success) {
        enqueueSnackbar("Added to Cart!", {
          variant: "success",
          autoHideDuration: 2000, 
          anchorOrigin: {
            vertical: "bottom", 
            horizontal: "right",
          },
        });
        setAddProductLoading(false)
        console.log(addProductLoading);
        
      }
    }
  };

  const addProductsByQuantity = async (
    fileUrl,
    productToAdd,
    quantity,
    color,
    size
  ) => {
    setAddProductByQuantityLoading(true);
    const file = await confService.uploadFile(fileUrl);
    console.log("image", file);

    if (file) {
      const fileId = file.$id;

    const q =   await confService.addProductToDatabase({
        productName: productToAdd?.name,
        productPrice: productToAdd?.price,
        productRating: productToAdd?.ratings,
        productImage: fileId,
        userId: userId,
        productQuantity: quantity,
        productId: productToAdd.id,
        productColor: color,
        productSize: size,
      });
      if (q) {
        setAddProductByQuantityLoading(false);
      }
    }
  };

  const IncreaseQuantity = async (documentId, incrementValue) => {
    setIncreaseQuantityLoading((prev) => ({ ...prev, [documentId]: true }));
  
    try {
      const increase = await confService.updateProductQuantity({
        documentId, 
        productQuantity: incrementValue, 
      });
      if (increase) {
        setIncreaseQuantityLoading((prev) => ({ ...prev, [documentId]: false }));
        console.log(increaseQuantityLoading);
        
      }
    } catch (error) {
      console.error("Failed to update product quantity", error);
      setIncreaseQuantityLoading((prev) => ({ ...prev, [documentId]: false }));
    }
  };
  
  const decreaseQuantity = async (documentId) => {
    setDecreaseQuantityLoading((prev) => ({...prev, [documentId] : true}));
    try {
      const decrease = await confService.decreaseProductQuantity(
        documentId
      );
      if (decrease) {
        setDecreaseQuantityLoading((prev) => ({...prev, [documentId] : false}));
        
      }
    } catch (error) {
      setDecreaseQuantityLoading((prev) => ({...prev, [documentId] : false}));
      console.error("Failed to decrease product quantity", error);
    }

  };

  const removeProduct = async (fileId, productId) => {
    setItemsLoading(true);
    try {
      const file = await confService.deleteFile(fileId);
      if (file) {
        const remove = await confService.deleteProduct(productId);
        if (remove) {
          setItemsLoading(false);
        }
      }
    } catch (error) {
      console.error("Failed to delete pridycts", error);
    }
  };


  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {

      const existingProductIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[existingProductIndex].quantity += quantity;
        return updatedCartItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  return (
    <MyContext.Provider
      value={{
        value,
        setValue,
        animate,
        setanimate,
        isAnimate,
        cartState,
        setCartState,
        cartItems,
        setCartItems,
        addProducts,
        removeProduct,
        decreaseQuantity,
        namesUpdated,
        setNamesUpdated,
        addToCart,
        isLogin,
        setIsLogin,
        handleToggle,
        isAnimating,
        animatee,
        ...authState,
        login,
        logout,
        IncreaseQuantity,
        setAllProducts,
        allProducts,
        addProductsByQuantity,
        userId,
        itemsLoading,
        setCartNotification,
        cartNotification,
        increaseQuantityLoading,
        decreaseQuantityLoading,
        setallProductsLoading,
        addProductLoading,
        // isProductAvailable,
        addProductByQuantityLoading,
        allProductsLoading,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
export const useMyContext = () => useContext(MyContext);
