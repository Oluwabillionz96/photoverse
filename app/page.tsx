"use client";

import LandingPage from "@/components/LandingPage";
import AuthenticationModal from "@/components/modals/AuthenticationModal";
import { Rootstate } from "@/lib/store";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { authenticated } = useSelector((state: Rootstate) => state.auth);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [mode, setMode] = useState<"login" | "register">("register");
  const [openModal, setOpenModal] = useState(false);

  if (authenticated) {
    redirect("/folders");
  }

  return (
    <>
      {!authenticated && openModal && (
        <AuthenticationModal
          loginInfo={loginInfo}
          setLoginInfo={setLoginInfo}
          registerInfo={registerInfo}
          setRegisterInfo={setRegisterInfo}
          mode={mode}
          setOpenModal={setOpenModal}
          setMode={setMode}
        />
      )}
      <LandingPage setOpenModal={setOpenModal} setMode={setMode} />
    </>
  );
}
