"use client";
import CreateFolder from "@/components/CreateFolder";
import TabLayouts from "@/components/TabLayouts";
import useModalContext from "@/hooks/useModalContext";
import { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [foldername, setFoldername] = useState("");
  const { modalStatus, changeModalStatus: setModalStatus } = useModalContext();
  return (
    <>
      <TabLayouts />
      {modalStatus !== "" ? (
        <CreateFolder
          foldername={foldername}
          setFoldername={setFoldername}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      ) : null}
      {children}
    </>
  );
};

export default Layout;
