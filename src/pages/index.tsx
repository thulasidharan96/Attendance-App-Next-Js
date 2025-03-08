"use client";

import { useState } from "react";
import Frame from "../assets/Frame.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import { User } from "@/types/types";
import { LoginApi, RegisterApi } from "./api/User";
import ScaleLoader from "@/components/loader/ScaleLoader";
import {
  department,
  name,
  RegisterNumber,
  role,
  store,
  userId,
} from "@/components/services/store";
import { isAuthenticated } from "@/components/services/auth";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<User>({
    RegisterNumber: "",
    name: "",
    email: "",
    password: "",
  });

  const checkPasswordStrength = (
    password: string,
    name: string,
    email: string
  ): { strength: string; color: string } => {
    if (!password) return { strength: "None", color: "text-gray-500" };

    let score = 0;

    // Check if password contains name or email
    if (
      !password.toLowerCase().includes(name.toLowerCase()) &&
      !password.toLowerCase().includes(email.toLowerCase())
    ) {
      score++;
    }

    // Check length
    if (password.length >= 8) score++;

    // Check for numbers
    if (/\d/.test(password)) score++;

    // Check for symbols
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    // Return strength based on score
    switch (score) {
      case 0:
        return { strength: "Very Weak", color: "text-red-500" };
      case 1:
        return { strength: "Weak", color: "text-orange-500" };
      case 2:
        return { strength: "Medium", color: "text-amber-500" };
      case 3:
        return { strength: "Strong", color: "text-green-500" };
      case 4:
        return { strength: "Very Strong", color: "text-emerald-500" };
      default:
        return { strength: "None", color: "text-gray-500" };
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (isSignUp) {
      handleSignUp(
        formData.email,
        formData.password,
        formData.name,
        formData.RegisterNumber
      );
    } else {
      handleSignIn(formData.email, formData.password);
    }
  };

  //Registration
  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
    RegisterNumber: string
  ) => {
    try {
      setIsLoading(true);
      const response = await RegisterApi(
       email,
        password,
        name,
        RegisterNumber
      );

      if (response.status === 200) {
        alert("Registration successful");
        window.location.href = "/";
      } else if (response.status === 409) {
        alert("User already exists");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Login
  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await LoginApi(email, password);

      if (response?.status === 200) {
        const data = response.data;
        store(data.token);
        role(data.role);
        name(data.name);
        RegisterNumber(data.RegisterNumber);
        userId(data.id);
        department(data.department);
        // window.location.href = "/dashboard";
        isAuthenticated(data.token);
      } else if (response?.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const slideVariants = {
    hidden: { x: isSignUp ? -20 : 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };
  const ui = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Background Image */}
      <motion.div className="hidden md:flex w-full md:w-1/2 relative p-4">
        <div
          className="absolute inset-0 bg-cover rounded-xl m-3 flex flex-col justify-between p-6"
          style={{ backgroundImage: `url(${Frame.src})` }}
        >
          <motion.div className="text-white text-center space-y-2">
            <motion.h1 className="text-2xl md:text-3xl font-bold">
              Welcome to SimpleFlow
            </motion.h1>
            <motion.p className="text-sm md:text-base text-gray-200">
              Your Gateway to Effortless Management.
            </motion.p>
          </motion.div>

          <motion.div className="text-white text-center">
            <motion.p className="text-lg md:text-xl font-semibold">
              Seamless Collaboration
            </motion.p>
            <motion.p className="text-sm mt-2">
              Believe you can, and you&apos;re halfway there.{" "}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full md:w-1/2 flex flex-col mt-10 md:mt-0 p-4 md:p-0 m-2 md:m-0">
        {/* Logo */}
        <motion.p
          className="text-purple1 text-9xl font-bold text-center"
          variants={ui}
          initial="hidden"
          animate="visible"
        >
          U!
        </motion.p>
        {/* Right Section - Auth Form */}
        <motion.div
          className="w-full flex flex-col items-center p-2 mt-2 bg-white rounded-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-full max-w-xs mb-4" variants={itemVariants}>
            <div className="flex justify-center bg-gray-300 p-1 rounded-lg">
              <motion.button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors duration-300 ${
                  !isSignUp
                    ? "bg-purple1 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-1 rounded-md text-xs font-medium transition-colors duration-300 ${
                  isSignUp
                    ? "bg-purple1 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sign Up
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center w-full"
            variants={itemVariants}
          >
            <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3">
              <motion.div variants={itemVariants}>
                <label className="block text-xs font-medium text-gray-700">
                  Email Id
                </label>
                <motion.input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-2 py-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  whileFocus={{ scale: 1.01, borderColor: "#8B5CF6" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <motion.input
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-2 py-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Password"
                  whileFocus={{ scale: 1.01, borderColor: "#8B5CF6" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                {isSignUp && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">
                      Password Strength:{" "}
                      <span
                        className={
                          checkPasswordStrength(
                            formData.password,
                            formData.name,
                            formData.email
                          ).color
                        }
                      >
                        {
                          checkPasswordStrength(
                            formData.password,
                            formData.name,
                            formData.email
                          ).strength
                        }
                      </span>
                    </p>
                    <ul className="text-xs text-gray-500 mt-1">
                      <li
                        className={`${
                          !formData.password
                            .toLowerCase()
                            .includes(formData.name.toLowerCase()) &&
                          !formData.password
                            .toLowerCase()
                            .includes(formData.email.toLowerCase())
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        • Cannot contain your name or email address
                      </li>
                      <li
                        className={
                          formData.password.length >= 8
                            ? "text-green-500"
                            : "text-gray-500"
                        }
                      >
                        • At least 8 characters
                      </li>
                      <li
                        className={
                          /[\d!@#$%^&*(),.?":{}|<>]/.test(formData.password)
                            ? "text-green-500"
                            : "text-gray-500"
                        }
                      >
                        • Contains a number or symbol
                      </li>
                    </ul>
                  </div>
                )}
              </motion.div>

              {isSignUp && (
                <motion.div
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-xs font-medium text-gray-700">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-2 py-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your name"
                    whileFocus={{ scale: 1.01, borderColor: "#8B5CF6" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </motion.div>
              )}

              {isSignUp && (
                <motion.div
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="block text-xs font-medium text-gray-700">
                    Registration Number
                  </label>
                  <motion.input
                    type="text"
                    name="RegisterNumber"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        RegisterNumber: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your registration number"
                    whileFocus={{ scale: 1.01, borderColor: "#8B5CF6" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </motion.div>
              )}

              {!isSignUp && (
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple1 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </Link>
              )}
              {isLoading && (
                <div className="flex justify-center items-center">
                  <ScaleLoader className="text-purple1" />
                </div>
              )}
              <motion.button
                type="submit"
                className="w-full bg-purple1 text-white py-2 rounded-md hover:bg-purple1 transition duration-300 mt-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isLoading}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </motion.button>

              {isSignUp && (
                <motion.p
                  key={isSignUp ? "signup-text" : "signin-text"} // Key forces re-render on state change
                  className="text-xs text-center text-gray-500 mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  By {isSignUp ? "signing up" : "signing in"}, you agree to
                  SimpleFlow&apos;s{" "}
                  <Link
                    href="/terms"
                    className="text-purple-600 hover:underline"
                  >
                    Terms of use
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
