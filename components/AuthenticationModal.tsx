"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";

const AuthenticationModal = () => {
  const [viewPassword, setViewPassword] = useState(false);
  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/10 flex items-center justify-center">
      <div className="bg-white w-[30%] flex flex-col justify-center items-center gap-6 py-8 rounded-xl">
        <h2 className="text-3xl font-semibold  w-fit mx-auto text-center">
          Welcome To Photoverse
        </h2>
        <div className="flex w-[74%] mx-auto">
          <motion.button
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="h-10 rounded-tl-sm rounded-bl-sm text-xl font-semibold hover:cursor-pointer flex-1/2 bg-blue-500 text-white"
          >
            Login
          </motion.button>
          <motion.button
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="h-10 flex-1/2 rounded-tr-sm rounded-br-sm font-semibold hover:cursor-pointer text-xl bg-[#EAEAEB]"
          >
            Register
          </motion.button>
        </div>
        <form className="flex flex-col w-[74%] gap-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="off"
            autoFocus
            className="h-12 outline-0 border-1 px-2 text-[1.1rem] rounded-sm border-gray-500"
            required
          />
          <div className="relative">
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              className="h-12 outline-0 border-1 px-2 text-[1.1rem] rounded-sm border-gray-500 w-full"
              required
            />
            <button
              className="absolute top-3 right-2 hover:cursor-pointer"
              type="button"
              onClick={() => {
                setViewPassword(!viewPassword);
              }}
            >
              {viewPassword ? (
                <MdOutlineRemoveRedEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w- full h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500"
          >
            Login
          </button>
        </form>
        <p className="font-semibold">
          <Link href={"/"} className="text-blue-500">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthenticationModal;
