"use client";
import { RegisterInfo, ViewPassword } from "@/lib/types";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const RegistrationForm = ({
  registerInfo,
  setRegisterInfo,
  viewPassword,
  setViewPassword,
  setIsLogin,
}: {
  registerInfo: RegisterInfo;
  setRegisterInfo: (arg: RegisterInfo) => void;
  viewPassword: ViewPassword;
  setViewPassword: (arg: ViewPassword) => void;
  setIsLogin: (arg: boolean) => void;
}) => {
  return (
    <motion.form
      variants={{
        initial: { x: 0, opacity: 0 },
        animate: { x: [400, 0], opacity: 1 },
        exit: { x: 400, opacity: 0 },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="flex flex-col w-[74%] gap-4"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        console.log(registerInfo);
      }}
    >
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={registerInfo.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setRegisterInfo({
            ...registerInfo,
            email: e.target.value,
          });
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
        className="text-center"
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
  );
};

export default RegistrationForm;
