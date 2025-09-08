"use client";
import CreateFolder from "@/components/CreateFolder";
import TabLayouts from "@/components/TabLayouts";
import { changeModalStatus } from "@/lib/slices/routingSlice";
import { Rootstate } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [foldername, setFoldername] = useState("");
  const dispatch = useDispatch();
  const { modalStatus } = useSelector((state: Rootstate) => state.routing);
  const setModalStatus = (value: "" | "preview" | "select" | "foldername") => {
    dispatch(changeModalStatus(value));
  };
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
