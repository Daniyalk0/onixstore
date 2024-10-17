import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Subscribe from "./components/Subscribe.jsx";
import Bags from "./components/Categories/Bags.jsx";
import Boots from "./components/Categories/Boots.jsx";
import Caps from "./components/Categories/Caps.jsx";
import Sneekers from "./components/Categories/Sneekers.jsx";
import { MyProvider } from "./components/Context.jsx";
import CartPage from "./components/CartPage.jsx";
import About from "./components/About.jsx";
import Signup from "./register/Signup.jsx";
import Login from "./register/Login.jsx";
import Authentication from "./register/Authentication.jsx";
import AuthLayout from "./register/AuthLayout.jsx";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Product-details/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/Men's Boot",
        element: <Boots />,
      },
      {
        path: "/Men's Sneaker",
        element: <Sneekers />,
      },
      {
        path: "/Bag",
        element: <Bags />,
      },
      {
        path: "/Cap",
        element: <Caps />,
      },
      {
        path: "/CartPage",
        element: <CartPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <MyProvider>
        <RouterProvider router={router} />
      </MyProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
