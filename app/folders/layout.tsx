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
  const [folderName, setFolderName] = useState("");
  const { modalStatus, changeModalStatus: setModalStatus } = useModalContext();
  return (
    <>
      <TabLayouts />
      {modalStatus !== "" ? (
        <CreateFolder
          folderName={folderName}
          setFolderName={setFolderName}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      ) : null}
      {children}
    </>
  );
};

export default Layout;
