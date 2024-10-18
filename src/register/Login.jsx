import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { FaCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useMyContext } from "../components/Context";
import authService from "../appwrite/auth";

function Login({ handleToggle, className }) {
  const [passwordShow, setPasswordShow] = useState(false);
  const { login } = useMyContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const log = async (data) => {
    setError("");
    setPasswordShow(false);
    // setLoading(true)
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("getcurrentuser", userData);
        if (userData) {
          login(userData);
          console.log("userdata", userData);
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      if (
        error.message ===
        "Invalid credentials. Please check the email and password."
      ) {
        alert(error.message);
      }
      console.log(error.message);
    }
  };

  const { isAnimating, animatee } = useMyContext();

  const handleKeyPress = (event, submitForm) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default form submission
      console.log('Enter key pressed');
      submitForm(); // Manually trigger the form submission
    }
  };

  return (
    <div
      className={`${className}  card w-full h-full  shadow-lg shadow-[#f6f6f6] bg-[#EBEEF0] pt-8 px-8 flex flex-col gap-5 xs:gap-4 xs:px-5 xs:py-6 py-6   md:pt-3 md:py-0 md:gap-10 md:px-14  xl:px-11 xl:gap-5 relative  
  `}
    >
      <button
        className=" font-pop bg-[#d2d2d2] text-[#a9a9a9] hover:text-[#848484] py-[0.2vw] xl:w-[3.5vw]  text-center transition-all duration-200 lg:text-[0.9vw] lg:px-3 lg:py-2 lg:w-[6vw] right-3 px-3 hover:bg-[#dedede] xs:text-[2vw] xs:py-1 xs:px-2 xs:top-2 top-3  md:text-[1.5vw] md:py-[0.5vw] xl:py-[0.1vw] xl:text-[0.7vw] xl:px-1 xl:z-[999] md:w-[9vw] w-[12vw]"
        onClick={animatee}
      >
        Sign Up
      </button>

      <h1 className="font-pop font-semibold  text-center text-[4vw] text-zinc-800 mt-3 xs:mt-[1.5vw] xl:ml-[4vw]  md:text-start md:text-[3vw] lg:mt-[3vw] md:mt-[3vw] xl:text-[1.5vw] xl:mt-[0.8vw] transition-all duration-700 ">
        Log in
      </h1>
      <div
        className={`transition-all duration-500 w-full font-pop flex flex-col lg:gap-3 md:gap-3 gap-3 justify-center  items-center`}
      >
        <button className=" w-[90%] xl:w-[80%]  h-full rounded-full border-[1px] border-zinc-400 flex items-center justify-center md:py-3  py-3 lg:text-[1vw] gap-2">
          <FaFacebook className="text-[#1877F2] lg:text-[1.4vw]" />
          <p className="xxs:text-[3vw]">Log in with Facebook</p>
        </button>
        <button
          className="w-[90%] xl:w-[80%] h-full rounded-full border-[1px] border-zinc-400 flex items-center justify-center md:py-3   py-3 lg:text-[1vw] gap-2"
          onClick={authService?.loginWithGoogle}
        >
          <FcGoogle className=" lg:text-[1.4vw]" />
          <p className="xxs:text-[3vw]">Log in with Google</p>
        </button>
        <div className="w-full flex items-center lg:mt-2 mt-4 xl:my-5 md:my-0">
          <div className="bg-zinc-300 w-[50%] lg:h-[0.05vw]" />
          <p className="text-zinc-600 lg:text-[1vw] px-3">OR</p>
          <div className="bg-zinc-300 w-[50%] lg:h-[0.05vw]" />
        </div>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          } else if (!/[0-9]/.test(values.password)) {
            errors.password = "Password must contain at least one number";
          } else if (!/[!@#$%^&*]/.test(values.password)) {
            errors.password =
              "Password must contain at least one special character";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await log(values); 
            setSubmitting(false); 
          } catch (error) {
            setSubmitting(false); 
          }
        }}
      
      >
        {({
          isSubmitting,
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}
              onKeyDown={(e) => handleKeyPress(e, handleSubmit)}>
            <div className="flex flex-col gap-2 font-pop sm:gap-5 xl:gap-4 xxs:gap-2 justify-center items-center w-full ">
              <div
                className={`font-pop text-zinc-700 font-light flex flex-col  gap-[2px]  xl:gap-[0px] xxs:gap-0 xs:gap-0  md:w-[100%] lg:w-[100%]  w-[90%] xl:w-[80%] relative`}
              >
                <label
                  htmlFor="email"
                  className="text-zinc-500  text-[2.5vw] capitalize md:text-[1.9vw] xl:text-[0.9vw] lg:text-[1.4vw]"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  className={`w-full xl:w-full h-full md:py-[1vw] border-[1px]  py-2 rounded-md xxs:py-[2.6vw]  pl-2 text-[3vw] outline-none xs:py-[1.5vw]  transition-all duration-200  md:text-[1.9vw] xl:text-[1vw] xl:py-[0.5vw] bg-[#EBEEF0] ${
                    touched.email
                      ? errors.email
                        ? "border-red-500"
                        : "border-green-500"
                      : "border-zinc-300"
                  }`}
                />

                {errors.email && touched.email && (
                  <div className="text-red-500 absolute  lg:text-[1vw] md:text-[1.3vw] xl:text-[0.60vw] text-[1.9vw] top-[100%]">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 font-pop sm:gap-5 xl:gap-0 xxs:gap-2 justify-center items-center w-full relative">
                <div
                  className={`font-pop text-zinc-700 font-light flex flex-col  gap-[2px]  xl:gap-[0px] xxs:gap-0 xs:gap-0  md:w-[100%]  lg:w-[100%] w-[90%] xl:w-[80%] relative`}
                >
                  <label
                    htmlFor="password"
                    className="text-zinc-500  text-[2.5vw] capitalize md:text-[1.9vw] xl:text-[0.9vw] lg:text-[1.4vw]"
                  >
                    Password
                  </label>

                  <Field
                    name="password"
                    onChange={handleChange}
                    type={passwordShow ? "text" : "password"}
                    id="password"
                    className={` xxs:py-[2.6vw] xl:w-full w-full h-full md:py-[1vw] border-[1px]  py-2  rounded-md pl-2 text-[3vw] outline-none  transition-all duration-200 xs:py-[1.5vw] md:text-[1.9vw] xl:text-[1vw] xl:py-[0.5vw] bg-[#EBEEF0]     ${
                      !touched.password ? "border-zinc-300" : ""
                    }
      ${touched.password && !values.password ? "border-red-500" : ""}
      ${
        touched.password && values.password && errors.password
          ? "border-red-500"
          : ""
      }
      ${error && "border-red-500"}
      ${
        touched.password && values.password && !errors.password
          ? "border-green-500"
          : ""
      }`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 absolute  lg:text-[1vw] md:text-[1.3vw] xl:text-[0.60vw] text-[1.9vw] top-[100%]">
                      {errors.password}
                    </div>
                  )}
                  {/* <ErrorMessage name="password" component="div" /> */}

                  <div onClick={() => setPasswordShow((prev) => !prev)}>
                    {passwordShow ? (
                      <FaRegEyeSlash
                        className={`absolute top-[50%] lg:top-[40%] right-10 text-[#00000078] xs:text-[2.5vw] lg:text-[1.5vw] 
                       xxs:top-[50%] xxs:right-3 xl:top-[55%] xl:right-[1.5vw] xs:right-4   md:top-[33%] xs:top-[50%] xl:text-[0.9vw]
                     `}
                      />
                    ) : (
                      <FaRegEye
                        className={`absolute top-[50%] xl:text-[0.9vw] xs:top-[50%] xs:right-4   right-6 md:top-[33%] text-[#00000078] xs:text-[2.5vw] lg:text-[1.5vw] 
                       xxs:top-[50%] xxs:right-3 xl:top-[55%]  xl:right-[1.5vw]
                       `}
                      />
                    )}
                  </div>
                </div>
                <div className=" font-pop right-0 lg:text-[0.7vw] mt-0 underline text-[1.5vw] xl:ml-[21vw] ml-[50vw] xs:ml-[62vw] xs:mt-[-1vw] xxs:ml-[58vw] lg:ml-[38vw] lg:mt-[-1.6vw] md:text-[1vw] md:ml-[38vw] md:mt-[-1.5vw] xl:mt-[0.2vw]">
                  Forgot Password?
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-2 xl:mt-[1.3vw] xl:items-start xl:justify-start xl:ml-[3.4vw]">
              <button
                type="submit"
                className="bg-[#c4c4c4] hover:bg-[#d0d0d0] hover:text-[#797979] duration-400 transition-all w-[63vw] xl:w-[12vw] py-3 rounded-full text-[#969696] font-pop mt-2 xs:py-2 xs:mt-[3vw] sm:w-[50vw] sm:py-4 sm:mt-[3vw] xl:mt-0 xl:py-2 xxs:py-1 xxs:mt-[4vw]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex xl:ml-[3.8vw] items-center xl:justify-start text-[2vw] w-full justify-center mt-[-3.4vw] gap-1 xs:mt-[-3vw] md:text-[1.3vw] md:mt-[-4vw] xl:mt-[-1.2vw] xl:text-[0.6vw] font-pop xxs:mt-[-4vw] lg:mt-[-3vw] ">
        <p className="transition-all duration-500">Don't have an account?</p>

        <p
          className="relative underline cursor-pointer transition-all duration-500   md:text-[1.3vw] xl:text-[0.6vw] xxs:text-[1.8vw]"
          onClick={animatee}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
}

export default Login;
