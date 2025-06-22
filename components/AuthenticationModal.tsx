"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";

const AuthenticationModal = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/10 flex items-center justify-center">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-600, 0] }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="bg-white w-[30%] flex flex-col justify-center items-center gap-6 py-8 rounded-xl overflow-hidden"
      >
        <motion.h2
          initial={{ x: 0 }}
          animate={{ x: [-400, 0] }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
          className="text-3xl font-semibold  w-fit mx-auto text-center"
        >
          Welcome To Photoverse
        </motion.h2>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [-400, 0] }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.6 }}
          className="flex w-[74%] mx-auto"
        >
          <motion.button
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="h-10 rounded-tl-sm rounded-bl-sm text-xl font-semibold hover:cursor-pointer flex-1/2 bg-blue-500 text-white"
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => {
              setIsLogin(false);
            }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="h-10 flex-1/2 rounded-tr-sm rounded-br-sm font-semibold hover:cursor-pointer text-xl bg-[#EAEAEB]"
          >
            Register
          </motion.button>
        </motion.div>
        <AnimatePresence>
          {isLogin && (
            <>
              <motion.form
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: [-400, 0], opacity: [0, 0.2, 0.5, 1] }}
                exit={{ x: -400, opacity: [1, 0.5, 0.2, 0] }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.7 }}
                className="flex flex-col w-[74%] gap-4"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  autoFocus
                  className="h-12 outline-0 border px-2 text-[1.1rem] rounded-sm border-gray-500"
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
                  className="w-full h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500"
                >
                  Login
                </button>
              </motion.form>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 1] }}
                exit={{ opacity: [1, 0.5, 0] }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 1.2 }}
                className="font-semibold"
              >
                <Link href={"/"} className="text-blue-500">
                  Forgot Password?
                </Link>
              </motion.p>
            </>
          )}
        </AnimatePresence>
        
      </motion.div>
    </div>
  );
};

export default AuthenticationModal;
