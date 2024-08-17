"use client";
import useApplicationStore from "@/stores/application/application.store";
import clsx from "clsx";
import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => {
  const openSidebar = useApplicationStore((state) => state.openSidebar);
  return (
    <main
      className={clsx("mt-12 relative transition-all p-6", {
        "ml-[240px]": openSidebar,
        "ml-[64px]": !openSidebar,
      })}
    >
      {children}
    </main>
  );
};

export default Main;
