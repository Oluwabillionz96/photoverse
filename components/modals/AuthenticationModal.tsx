"use client";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";

interface LoginInfo {
  email: string;
  password: string;
}

interface RegisterInfo {
  email: string;
  password: string;
  confirmedPassword: string;
}

const AuthenticationModal = ({
  loginInfo,
  setLoginInfo,
  registerInfo,
  setRegisterInfo,
}: {
  loginInfo: LoginInfo;
  setLoginInfo: (arg: LoginInfo) => void;
  registerInfo: RegisterInfo;
  setRegisterInfo: (arg: RegisterInfo) => void;
}) => {
  const [viewPassword, setViewPassword] = useState({
    loginPassword: false,
    registerPassword: false,
    confirmPassword: false,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isCreated, setIsCreated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted)
    return (
      <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/10 flex items-center justify-center"></div>
    );

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/10 flex items-center justify-center">
      <motion.div
        initial={{ y: -600 }}
        animate={{ y: [-600, 0] }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="bg-white lg:w-[30%] md:w-[60%] w-9/10  md:h-fit flex flex-col justify-center items-center gap-6 py-8 rounded-xl overflow-hidden"
      >
        <>
          <motion.h2
            initial={{ x: 0 }}
            animate={{ x: [-400, 0] }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
            className="md:text-3xl text-xl  font-semibold  w-fit mx-auto text-center"
          >
            Welcome To Photoverse
          </motion.h2>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [-400, 0] }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.6 }}
            className="md:flex w-[74%] mx-auto hidden"
          >
            <MotionConfig transition={{ duration: 0.1, ease: "easeInOut" }}>
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                className={`h-10 rounded-tl-sm  rounded-bl-sm text-xl font-semibold hover:cursor-pointer flex-1/2 ${
                  isLogin ? " bg-blue-500 text-white" : "bg-[#EAEAEB]"
                }`}
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                onClick={() => {
                  setIsLogin(false);
                }}
                className={`h-10 flex-1/2 rounded-tr-sm  md:block rounded-br-sm font-semibold hover:cursor-pointer text-xl ${
                  !isLogin ? " bg-blue-500 text-white" : "bg-[#EAEAEB]"
                }`}
              >
                Register
              </motion.button>
            </MotionConfig>
          </motion.div>
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                className="w-full flex items-center justify-center flex-col gap-4"
                variants={{
                  initial: { x: 0, opacity: 0 },
                  animate: { x: [-400, 0], opacity: 1 },
                  exit: { x: -400, opacity: 0 },
                }}
                key={"login"}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.7 }}
              >
                <form className="flex flex-col w-[74%] gap-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={loginInfo.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setLoginInfo({ ...loginInfo, email: e.target.value });
                    }}
                    autoFocus
                    className="h-12 outline-0 border px-2 text-[1.1rem] rounded-sm border-gray-500"
                    required
                  />
                  <div className="relative">
                    <input
                      type={viewPassword.loginPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={loginInfo.password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setLoginInfo({
                          ...loginInfo,
                          password: e.target.value,
                        });
                      }}
                      className="h-12 outline-0 border-1 px-2 text-[1.1rem] rounded-sm border-gray-500 w-full"
                      required
                    />
                    <button
                      className="absolute top-3 right-2 hover:cursor-pointer"
                      type="button"
                      onClick={() => {
                        setViewPassword({
                          ...viewPassword,
                          loginPassword: !viewPassword.loginPassword,
                        });
                      }}
                    >
                      {viewPassword.loginPassword ? (
                        <MdOutlineRemoveRedEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={
                      !loginInfo.email.trim() || !loginInfo.password.trim()
                    }
                  >
                    Login
                  </button>
                </form>
                <MotionConfig
                  transition={{ duration: 0.5, ease: "easeIn", delay: 1.2 }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 1] }}
                    exit={{ opacity: [1, 0.5, 0] }}
                    className="font-semibold"
                  >
                    <Link href={"/"} className="text-blue-500">
                      Forgot Password?
                    </Link>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 1] }}
                    exit={{ opacity: [1, 0.5, 0] }}
                    className="md:hidden"
                  >
                    Don't have an account?{" "}
                    <span
                      className="text-blue-500 font-semibold"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </span>
                  </motion.p>
                </MotionConfig>
              </motion.div>
            ) : (
              <motion.form
                variants={{
                  initial: { x: 0, opacity: 0 },
                  animate: { x: [400, 0], opacity: 1 },
                  exit: { x: 400, opacity: 0 },
                }}
                key={"register"}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="flex flex-col w-[74%] gap-4"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={registerInfo.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setRegisterInfo({ ...registerInfo, email: e.target.value });
                  }}
                  autoFocus
                  className="h-12 outline-0 border px-2 text-[1.1rem] rounded-sm border-gray-500"
                  required
                />
                <div className="relative">
                  <input
                    type={viewPassword.registerPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={registerInfo.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setRegisterInfo({
                        ...registerInfo,
                        password: e.target.value,
                      });
                    }}
                    className="h-12 outline-0 border-1 px-2 text-[1.1rem] rounded-sm border-gray-500 w-full"
                    required
                  />
                  <button
                    className="absolute top-3 right-2 hover:cursor-pointer"
                    type="button"
                    onClick={() => {
                      setViewPassword({
                        ...viewPassword,
                        registerPassword: !viewPassword.registerPassword,
                      });
                    }}
                  >
                    {viewPassword.registerPassword ? (
                      <MdOutlineRemoveRedEye size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={viewPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="h-12 outline-0 border-1 px-2 text-[1.1rem] rounded-sm border-gray-500 w-full"
                    required
                    value={registerInfo.confirmedPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setRegisterInfo({
                        ...registerInfo,
                        confirmedPassword: e.target.value,
                      });
                    }}
                  />
                  <button
                    className="absolute top-3 right-2 hover:cursor-pointer"
                    type="button"
                    onClick={() => {
                      setViewPassword({
                        ...viewPassword,
                        confirmPassword: !viewPassword.confirmPassword,
                      });
                    }}
                  >
                    {viewPassword.confirmPassword ? (
                      <MdOutlineRemoveRedEye size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={
                    !registerInfo.email.trim() ||
                    !registerInfo.password.trim() ||
                    !registerInfo.confirmedPassword.trim()
                  }
                >
                  Create Account
                </button>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 1] }}
                  exit={{ opacity: [1, 0.5, 0] }}
                  transition={{ duration: 0.5, ease: "easeIn", delay: 1.2 }}
                  className="md:hidden text-center"
                >
                  Already have an account?{" "}
                  <span
                    className="text-blue-500 font-semibold"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign in
                  </span>
                </motion.p>
              </motion.form>
            )}
          </AnimatePresence>
          {!isLogin && !isCreated && (
            <Button
              variant={"destructive"}
              onClick={() => {
                setIsCreated(true);
              }}
            >
              Account Created
            </Button>
          )}
        </>
      </motion.div>
    </div>
  );
};

export default AuthenticationModal;
