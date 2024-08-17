"use client";
import { Input } from "antd";
import Link from "next/link";
import styles from "./Header.module.scss";
import ActionHeader from "./components/ActionHeader";
const Header = () => {
  const { Search } = Input;
  return (
    <>
      <header className={styles.root}>
        <Link href="/dashboard" className="flex items-center">
          <div className="text-neutral-500 flex gap-[6px] items-center">Logo</div>
        </Link>
        <Search placeholder="Tìm kiếm" style={{ width: 700 }} />
        <ActionHeader />
      </header>
    </>
  );
};
export default Header;
