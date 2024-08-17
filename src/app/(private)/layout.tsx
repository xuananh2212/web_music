import getMetadata from "@/configs/site.config";
import "@/styles/globals.scss";
import { Metadata } from "next";
import React from "react";
import Header from "./components/header";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata("Trang chủ");
  return metadata;
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-color-50 min-h-[calc(100vh-48px)]">
      <Header />
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;
