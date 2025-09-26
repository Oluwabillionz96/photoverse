"use client";
import { AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Forms from "../Form/Forms";
import VerifyEmail from "../VerifyEmail";
import Image from "next/image";

interface LoginInfo {
  email: string;
  password: string;
}

interface RegisterInfo {
  email: string;
  password: string;
  confirmedPassword: string;
}

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999999999] backdrop-blur-sm bg-black/50 flex items-center justify-center animate-pulse">
      <Image src={"/photoverse-logo.png"} width={100} height={100} alt="logo" />
    </div>
  );
};

const AuthenticationModal = ({
  loginInfo,
  setLoginInfo,
  registerInfo,
  setRegisterInfo,
  mode,
  setOpenModal,
}: {
  loginInfo: LoginInfo;
  setLoginInfo: (arg: LoginInfo) => void;
  registerInfo: RegisterInfo;
  setRegisterInfo: (arg: RegisterInfo) => void;
  mode?: "login" | "register";
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [viewPassword, setViewPassword] = useState({
    loginPassword: false,
    registerPassword: false,
    confirmPassword: false,
  });
  const [isLogin, setIsLogin] = useState(
    mode ? (mode === "login" ? true : false) : true
  );
  const [isCreated, setIsCreated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!mounted ? (
        <Loading />
      ) : (
        <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isCreated ? (
              <Forms
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
                registerInfo={registerInfo}
                setRegisterInfo={setRegisterInfo}
                viewPassword={viewPassword}
                setViewPassword={setViewPassword}
                key={"auth-form"}
                setIsCreated={setIsCreated}
                mode={mode}
                setOpenModal={setOpenModal}
              />
            ) : (
              <VerifyEmail
                email={registerInfo.email}
                // resendCode={resendCode}
                key={"email-confirmation"}
                // countDown={updateResendCode}
                // setResendCode={setResendCode}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default AuthenticationModal;
