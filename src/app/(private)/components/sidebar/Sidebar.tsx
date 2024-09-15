"use client";

import useApplicationStore from "@/stores/application/application.store";
import { categories } from "@private/components/sidebar/data";
import { Menu } from "antd";
import clsx from "clsx";
import { Menu as MenuIcon, NavArrowLeft } from "iconoir-react";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./Sidebar.module.scss";
import { findDefaultKey } from "./common/findDefaultKey";

const Sidebar = () => {
  const isOpen = useApplicationStore((state) => state.openSidebar);
  const setOpen = useApplicationStore((state) => state.setOpenSidebar);
  const pathName = usePathname();
  const toggleSidebar = () => {
    setOpen(!isOpen);
  };
  // check active vs active when reload
  const defaultSelectedKeys = React.useMemo<any>(
    () => [findDefaultKey(categories, pathName) || categories?.[0]?.key],
    [pathName]
  );
  return (
    <div id="sidebar" className={clsx(styles.root, isOpen ? "w-60" : "w-[70px]")}>
      <div
        id="toggle-sidebar"
        className={clsx(
          styles.toggleSidebar,
          "text-color-600 font-bold bg-white",
          isOpen ? "justify-between" : "justify-center"
        )}
        onClick={toggleSidebar}
      >
        {isOpen && <p className="whitespace-nowrap">Quản lý</p>}
        <div className="toggle">
          {isOpen ? <NavArrowLeft width={24} height={24} /> : <MenuIcon width={18} height={18} />}
        </div>
      </div>
      <Menu mode="inline" items={categories} className={styles.listItem} defaultSelectedKeys={defaultSelectedKeys} />
    </div>
  );
};

export default React.memo(Sidebar);
