import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MyProvider } from "./components/Context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./register/AuthLayout.jsx";
import { SnackbarProvider } from "notistack";

import Home from "./components/Home.jsx";
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const Subscribe = lazy(() => import("./components/Subscribe.jsx"));
const Bags = lazy(() => import("./components/Categories/Bags.jsx"));
const Boots = lazy(() => import("./components/Categories/Boots.jsx"));
const Caps = lazy(() => import("./components/Categories/Caps.jsx"));
const Sneekers = lazy(() => import("./components/Categories/Sneekers.jsx"));
const CartPage = lazy(() => import("./components/CartPage.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Authentication = lazy(() => import("./register/Authentication.jsx"));

const Loading = () => <div>Loading...</div>;

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
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/subscribe",
        element: (
          <Suspense fallback={<Loading />}>
            <Subscribe />
          </Suspense>
        ),
      },
      {
        path: "/Men's Boot",
        element: (
          <Suspense fallback={<Loading />}>
            <Boots />
          </Suspense>
        ),
      },
      {
        path: "/Men's Sneaker",
        element: (
          <Suspense fallback={<Loading />}>
            <Sneekers />
          </Suspense>
        ),
      },
      {
        path: "/Bag",
        element: (
          <Suspense fallback={<Loading />}>
            <Bags />
          </Suspense>
        ),
      },
      {
        path: "/Cap",
        element: (
          <Suspense fallback={<Loading />}>
            <Caps />
          </Suspense>
        ),
      },
      {
        path: "/CartPage",
        element: (
          <Suspense fallback={<Loading />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<Loading />}>
            <Authentication />
          </Suspense>
        ),
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
