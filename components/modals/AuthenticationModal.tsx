"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Forms from "../Form/Forms";
import VerifyEmail from "../VerifyEmail";

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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted)
    return (
      <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/10 flex items-center justify-center"></div>
    );

  return (
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
  );
};

export default AuthenticationModal;
