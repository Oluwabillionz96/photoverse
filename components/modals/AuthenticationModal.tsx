"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Forms from "../Form/Forms";
import VerifyEmail from "../VerifyEmail";
import { useLoginMutation } from "@/services/api";

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
  const [resendCode, setResendCode] = useState(60);

  function updateResendCode() {
    const timerInterval = setInterval(() => {
      setResendCode((prev) => {
        if (prev === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  }

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
          />
        ) : (
          <VerifyEmail
            email={registerInfo.email}
            resendCode={resendCode}
            key={"email-confirmation"}
          />
        )}
      </AnimatePresence>

      {!isLogin && (
        <Button
          variant={"destructive"}
          onClick={() => {
            setIsCreated(!isCreated);
            updateResendCode();
          }}
          className="absolute bottom-0"
        >
          Account Created
        </Button>
      )}
    </div>
  );
};

export default AuthenticationModal;
