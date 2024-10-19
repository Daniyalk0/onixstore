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

function Signup({ className, handleToggle }) {
  const [checkmark, setCheckmark] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const viewPort = window.innerWidth;
  const { isAnimating, animatee, login, logout } = useMyContext();
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const onsubmit = async (data) => {
    setPasswordShow(false);

    seterror("");
    console.log("Form data:", data);
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          login(data);
        }
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
      if (error) {
        alert("User with same email is already exists!");
      }
      console.log("error in crerating", error);
    }
  };

  const validatePassword = (password) => {
    const errors = {};

    // Example password conditions
    if (!password) {
      errors.password = "Required";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.lowercase = "One lowercase character is required";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.uppercase = "One uppercase character is required";
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.number = "One number is required";
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.special = "One special character is required";
    }
    if (password.length < 8) {
      errors.length = "Use 8 or more characters";
    }
    return errors;
  };

  return (
    <div
      className={`${className}   card w-full h-full  shadow-lg shadow-[#f6f6f6] bg-[#EBEEF0] pt-8 px-8 flex flex-col gap-5 xs:gap-4 xs:px-5 xs:py-6 py-6   md:pt-3 md:py-0 md:gap-10 md:px-14  xl:px-11 xl:gap-5 relative  transition-all duration-700 `}
    >
      <button
        className=" font-pop bg-[#d2d2d2] text-[#a9a9a9] hover:text-[#848484] py-[0.2vw] xl:w-[3vw] lg:w-[5vw] md:w-[7vw] w-[11vw] mt-[-5vw] md:mt-[-1vw] lg:mt-[-0.3vw] xs:mt-[-2vw] xxs:mt-[-4vw] text-center transition-all duration-200 lg:text-[0.9vw] lg:px-3 lg:py-2 right-3 px-3 hover:bg-[#dedede] xs:text-[2vw] xs:py-1 xs:px-2 xs:top-2 top-3  md:text-[1.5vw] md:py-[0.5vw] xl:py-[0.1vw] xl:text-[0.7vw] xl:px-1"
        onClick={animatee}
      >
        {isLogin ? "Sign Up" : "Login"}
      </button>

      <h1 className="font-pop font-semibold  text-center text-[4vw] text-zinc-800 mt-3 xs:mt-[1.5vw]  md:text-start md:text-[3vw] xl:text-[1.5vw] xl:mt-[0.8vw] lg:mt-[0.6vw] transition-all duration-700 md:mt-[-4vw]">
        Create an account
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          const passwordErrors = validatePassword(values.password);
          if (Object.keys(passwordErrors).length > 0) {
            errors.password = passwordErrors;
          }

          return errors;
        }}
        onSubmit={(values) => {
          onsubmit(values);
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
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col  font-pop gap-5 xl:gap-4 xxs:gap-2 ">
              <div
                className={`font-pop text-zinc-700 font-light flex flex-col items-start gap-[2px]  xl:gap-[0px] xxs:gap-0 xs:gap-0 relative`}
              >
                <label
                  htmlFor="username"
                  className="text-zinc-500  text-[2.5vw] capitalize md:text-[1.9vw] xl:text-[0.9vw] lg:text-[1.3vw]"
                >
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  onBlur={handleBlur}
                  className={` w-full xl:w-[80%] h-full md:py-[1vw] border-[1px] border-[#00000015] py-2 rounded-md pl-2 text-[3vw] outline-none  transition-all duration-200 xs:py-[1.5vw] md:text-[1.9vw] xl:text-[1vw] xl:py-[0.5vw] bg-[#EBEEF0] xxs:py-[2.5vw]  ${
                    touched.username
                      ? errors.username
                        ? "border-red-500"
                        : "border-green-500"
                      : "border-zinc-300"
                  }`}
                />
                {errors.username && touched.username && (
                  <div className="text-red-500 text-[1.9vw] md:text-[1.3vw] xl:text-[0.60vw] absolute  lg:text-[1vw]   top-[100%]">
                    {errors.username}
                  </div>
                )}
              </div>
              <div
                className={`font-pop text-zinc-700 font-light flex flex-col items-start gap-[3px]  xl:gap-[0px] xxs:gap-0 xs:gap-0 relative`}
              >
                <label
                  htmlFor="email"
                  className="text-zinc-500  text-[2.5vw] capitalize md:text-[1.9vw] xl:text-[0.9vw] lg:text-[1.3vw]"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  className={`w-full xl:w-[80%] h-full md:py-[1vw] border-[1px]  py-2 rounded-md pl-2 text-[3vw] outline-none  transition-all duration-200 xs:py-[1.5vw] md:text-[1.9vw] xl:text-[1vw] xl:py-[0.5vw] bg-[#EBEEF0] ${
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

              <div className="relative">
                <div
                  className={`font-pop text-zinc-700 font-light flex flex-col items-start gap-[2px]  xl:gap-[0px] xxs:gap-0 xs:gap-0 relative`}
                >
                  <label
                    htmlFor="password"
                    className="text-zinc-500  text-[2.5vw] capitalize md:text-[1.9vw] xl:text-[0.9vw] lg:text-[1.3vw]"
                  >
                    Password
                  </label>

                  <Field
                    name="password"
                    onChange={handleChange}
                    type={passwordShow ? "text" : "password"}
                    id="password"
                    className={`${
                      isLogin ? "hidden" : "block"
                    } relative xl:w-[80%] w-full h-full md:py-[1vw] border-[1px]  py-2 rounded-md pl-2 text-[3vw] outline-none  transition-all duration-200 xs:py-[1.5vw] md:text-[1.9vw] xl:text-[1vw] xl:py-[0.5vw] bg-[#EBEEF0]     ${
                      !touched.password ? "border-zinc-300" : ""
                    }
                ${touched.password && !values.password ? "border-red-500" : ""}
               ${
                 touched.password && values.password && errors.password
                   ? "border-red-500"
                   : ""
               }
               ${
                 touched.password && values.password && !errors.password
                   ? "border-green-500"
                   : ""
               }`}
                  />
                  {touched.password && !values.password && errors.password && (
                    <div className="text-red-500 relative lg:text-[1vw] md:text-[1.3vw] xl:text-[0.60vw] text-[1.9vw] top-[100%]">
                      {errors.password.password}
                    </div>
                  )}

                  {/* <ErrorMessage name="password" component="div" /> */}
                  <div onClick={() => setPasswordShow((prev) => !prev)}>
                    {passwordShow ? (
                      <FaRegEyeSlash
                        className={`absolute top-[50%] lg:top-[40%] right-4 text-[#00000078] xs:text-[2.5vw] lg:text-[1.5vw] 
                               xxs:top-[50%] xl:top-[55%] xl:right-[8vw]   md:top-[33%] xs:top-[50%] xl:text-[0.9vw]
                             `}
                      />
                    ) : (
                      <FaRegEye
                        className={`absolute top-[50%] xl:text-[0.9vw] xs:top-[50%]  right-4 md:top-[33%] text-[#00000078] xs:text-[2.5vw] lg:text-[1.5vw] 
                               xxs:top-[50%] xl:top-[55%] xl:right-[8vw]
                            `}
                      />
                    )}
                  </div>
                  {isLogin && (
                    <div className="absolute font-pop right-0 lg:text-[0.7vw] mt-1 underline text-[1.5vw]">
                      Forgot Password?
                    </div>
                  )}
                </div>

                <div
                  className={`flex items-center gap-x-5 leading-3 xxs:gap-x-3 sm:mt-2 xl:gap-x-5 xl:mt-0 transition-all duration-500 ${
                    isLogin ? "hidden" : "block"
                  }`}
                >
                  <div className="flex text-zinc-500 items-center gap-1 mt-1 ">
                    <FaCircle className="text-[0.9vw] md:text-[0.7vw] xl:text-[0.3vw]" />
                    <p
                      className={`text-[1.5vw] md:text-[1vw] xl:text-[0.50vw]  xxs:text-[1.6vw] lg:text-[0.9vw] ${
                        !values.password
                          ? "text-zinc-600" // If password input is empty
                          : errors.password && errors.password.length
                          ? "text-red-500" // If lowercase condition is not met
                          : "text-green-500" // If lowercase condition is met
                      }`}
                    >
                      Use 8 or more characters
                    </p>
                  </div>
                  <div className="flex text-zinc-500 items-center gap-1 mt-1 ">
                    <FaCircle className="text-[0.9vw] md:text-[0.7vw] xl:text-[0.3vw]" />
                    <p
                      className={`text-[1.5vw] md:text-[1vw] xl:text-[0.55vw]  xxs:text-[1.6vw] lg:text-[0.9vw] ${
                        !values.password
                          ? "text-zinc-600" // If password input is empty
                          : errors.password && errors.password.uppercase
                          ? "text-red-500" // If lowercase condition is not met
                          : "text-green-500" // If lowercase condition is met
                      }`}
                    >
                      One uppercase character
                    </p>
                  </div>
                  <div className="flex text-zinc-500 items-center gap-1 mt-1 ">
                    <FaCircle className="text-[0.9vw] md:text-[0.7vw] xl:text-[0.3vw]" />
                    <p
                      className={`text-[1.5vw] md:text-[1vw] xl:text-[0.50vw]  xxs:text-[1.6vw] lg:text-[0.9vw] ${
                        !values.password
                          ? "text-zinc-600" // If password input is empty
                          : errors.password && errors.password.lowercase
                          ? "text-red-500" // If lowercase condition is not met
                          : "text-green-500" // If lowercase condition is met
                      }`}
                    >
                      One lowercase character
                    </p>
                  </div>
                </div>
                <div
                  className={`xxs:mt-[-2vw] flex items-center flex-wrap gap-x-[5.6vw] leading-3 xs:gap-x-[7.2vw] xxs:gap-x-[6vw] md:gap-x-[3.8vw] xl:gap-x-[2.34vw] xl:mt-[-0.4vw] transition-all duration-500 ${
                    isLogin ? "hidden" : "block"
                  }`}
                >
                  <div className="flex text-zinc-500 items-center gap-1 mt-1 ">
                    <FaCircle className="text-[0.9vw] md:text-[0.7vw] xl:text-[0.3vw]" />
                    <p
                      className={`text-[1.5vw] md:text-[1vw] xl:text-[0.50vw]  xxs:text-[1.6vw] lg:text-[0.9vw] ${
                        !values.password
                          ? "text-zinc-600" // If password input is empty
                          : errors.password && errors.password.special
                          ? "text-red-500" // If lowercase condition is not met
                          : "text-green-500" // If lowercase condition is met
                      }`}
                    >
                      One special character
                    </p>
                  </div>

                  <div className="flex text-zinc-500 items-center gap-1 mt-1 ">
                    <FaCircle className="text-[0.9vw] md:text-[0.7vw] xl:text-[0.3vw]" />
                    <p
                      className={`text-[1.5vw] xxs:text-[1.6vw] md:text-[1vw] xl:text-[0.50vw] lg:text-[0.9vw]  ${
                        !values.password
                          ? "text-zinc-600" // If password input is empty
                          : errors.password && errors.password.number
                          ? "text-red-500" // If lowercase condition is not met
                          : "text-green-500" // If lowercase condition is met
                      }`}
                    >
                      One number
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`updates font-pop md:my-6 flex items-start justify-start gap-1 my-9 ml-[-0.8vw]  xl:my-8 transition-all duration-500 xxs:my-5 ${
                isLogin ? "hidden" : "flex"
              }`}
            >
              <div
                onClick={() => setCheckmark((prev) => !prev)}
                className="text-[3.2vw] md:text-[2.2vw] xl:text-[1.2vw]"
              >
                {checkmark ? (
                  <IoIosCheckmarkCircle />
                ) : (
                  <IoIosCheckmarkCircleOutline />
                )}
              </div>
              <p className="text-[1.9vw] md:text-[1.4vw] xl:text-[0.7vw] xl:leading-3 text-zinc-700 xl:w-[80%]">
                I want to receive emails about the product, feature updates,
                events, and marketing promotions.
              </p>
            </div>
            <div
              className={`${
                isLogin ? "hidden" : "block"
              } terms text-[2vw] mt-3 md:text-[1.4vw] font-pop xl:text-[0.7vw] xl:leading-3 xl:w-[80%]  text-zinc-700 transition-all duration-500 `}
            >
              <p>
                By creating an account, you agree to the{" "}
                <span className="border-b-[1px] border-zinc-700">
                  Terms of use
                </span>{" "}
                and{" "}
                <span className="border-b-[1px] border-zinc-700">
                  Privacy Policy.
                </span>{" "}
              </p>
            </div>
            <div className="w-full flex justify-center items-center mt-2 xl:mt-[2.5vw] xl:items-start xl:justify-start  ">
              <button
                type="submit"
                className="bg-[#c4c4c4] hover:bg-[#d0d0d0] hover:text-[#797979] duration-400 transition-all w-[40vw] xl:w-[12vw] py-3 rounded-full text-[#969696] font-pop mt-2 xs:py-2 xs:mt-[3vw] sm:w-[50vw] sm:py-4 sm:mt-[3vw] xl:mt-0 xl:py-2 xxs:py-1 xxs:mt-[4vw]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex items-center xl:justify-start text-[2vw] w-full justify-center mt-[-3.7vw] gap-1 xs:mt-[-3vw] md:text-[1.3vw] md:mt-[-4vw] xl:mt-[-1.2vw] xl:text-[0.6vw] font-pop xxs:mt-[-4.4vw] lg:mt-[-3vw] ">
        <p className="transition-all duration-500">Already have an account?</p>

        <p
          className="relative underline cursor-pointer transition-all duration-500   md:text-[1.3vw] xl:text-[0.6vw] xxs:text-[1.8vw]"
          onClick={animatee}
        >
          Log in
        </p>
      </div>
    </div>
  );
}

export default Signup;
