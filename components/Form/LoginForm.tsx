"use client";

import { LoginInfo, ViewPassword } from "@/lib/types";
import { useLoginMutation } from "@/services/api";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Input from "../Input/Input";
import { validateLoginInfo } from "@/lib/utils/Validation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authenticate } from "@/lib/slices/authSlice";
import Spinner from "../loaders/Spinner";
import { usePathname, useRouter } from "next/navigation";

const LoginForm = ({
  loginInfo,
  setLoginInfo,
  viewPassword,
  setViewPassword,
  setIsLogin,
  setMode,
}: {
  loginInfo: LoginInfo;
  setLoginInfo: (arg: LoginInfo) => void;
  viewPassword: ViewPassword;
  setViewPassword: (arg: ViewPassword) => void;
  setIsLogin: (arg: boolean) => void;
  setMode?: Dispatch<SetStateAction<"login" | "register">>;
}) => {
  const [login, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    setLoginInfo({ email: "", password: "" });
  }, [setLoginInfo]);

  const handleLogin = async () => {
    const payload = { email: loginInfo.email, password: loginInfo.password };

    const response = await login(payload);

    if ("data" in response) {
      toast.success(response?.data?.message);
      dispatch(authenticate({ token: response?.data?.token }));
      if (pathname === "/") {
        router.push("/folders");
      }
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
    return;
  };

  // if (isError) {
  //   console.log(error);
  //   return <p>Error</p>;
  // }

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
      <form
        className="flex flex-col w-[74%] gap-4"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const error = validateLoginInfo(loginInfo, setLoginError, loginError);
          if (error) return;
          handleLogin();
        }}
      >
        <Input
          type="email"
          placeholder="email"
          value={loginInfo.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLoginInfo({ ...loginInfo, email: e.target.value });
          }}
          error={loginError.email}
          onKeyDown={() => {
            setLoginError({ ...loginError, email: "" });
          }}
          required
        />
        <div className="relative">
          <Input
            type={viewPassword.loginPassword ? "text" : "password"}
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setLoginInfo({
                ...loginInfo,
                password: e.target.value,
              });
            }}
            required
            error={loginError.password}
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
          className="w-full h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4"
          disabled={
            !loginInfo.email.trim() || !loginInfo.password.trim() || isLoading
          }
        >
          {isLoading && <Spinner />}
          {isLoading ? "Logging in..." : "Login"}
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
          {"Don't have an account? "}
          <span
            className="text-blue-500 font-semibold"
            onClick={() => {
              setIsLogin(false);
              if (setMode !== undefined) setMode("register");
            }}
          >
            Sign up
          </span>
        </motion.p>
      </MotionConfig>
    </motion.div>
  );
};

export default LoginForm;
