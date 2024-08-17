import { MenuProps } from "antd";
import { User, ViewGrid } from "iconoir-react";
import Link from "next/link";
type MenuItem = Required<MenuProps>["items"][number];
export const categories: MenuItem[] = [
  {
    key: "dashboard",
    label: <Link href={"/dashboard"}>Biểu Đồ</Link>,
    icon: <ViewGrid width={20} height={20} />,
  },
  {
    key: "users",
    label: <Link href={"/users"}>Người dùng</Link>,
    icon: <User width={20} height={20} />,
  },
];
