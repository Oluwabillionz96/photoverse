"use client";
import TabLayouts from "@/components/TabLayouts";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <TabLayouts />
      {children}
    </>
  );
};

export default Layout;
