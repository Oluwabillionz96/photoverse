import { LoginInfo, ViewPassword } from "@/lib/types";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { ChangeEvent } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const LoginForm = ({
  loginInfo,
  setLoginInfo,
  viewPassword,
  setViewPassword,
  setIsLogin,
}: {
  loginInfo: LoginInfo;
  setLoginInfo: (arg: LoginInfo) => void;
  viewPassword: ViewPassword;
  setViewPassword: (arg: ViewPassword) => void;
  setIsLogin: (arg: boolean) => void;
}) => {
  return (
    <motion.div
      className="w-full flex items-center justify-center flex-col gap-4"
      variants={{
        initial: { x: 0, opacity: 0 },
        animate: { x: [-400, 0], opacity: 1 },
        exit: { x: -400, opacity: 0 },
      }}
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
          disabled={!loginInfo.email.trim() || !loginInfo.password.trim()}
        >
          Login
        </button>
      </form>
      <MotionConfig transition={{ duration: 0.5, ease: "easeIn", delay: 1.2 }}>
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
  );
};

export default LoginForm;
