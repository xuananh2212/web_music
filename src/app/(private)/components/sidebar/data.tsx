import { MenuProps } from "antd";
import { User, ViewGrid } from "iconoir-react";
import Link from "next/link";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
type MenuItem = Required<MenuProps>["items"][number];
export const categories: MenuItem[] = [
  {
    key: "/dashboard",
    label: <Link href={"/dashboard"}>Biểu Đồ</Link>,
    icon: <ViewGrid width={20} height={20} />,
  },
  {
    key: "/users",
    label: <Link href={"/users"}>Người dùng</Link>,
    icon: <User width={20} height={20} />,
  },
  {
    key: "/artists",
    label: <Link href={"/artists"}>Nghệ sĩ</Link>,
    icon: <GrUserManager width={20} height={20} />,
  },
  {
    key: "/genres",
    label: <Link href={"/genres"}>Thể loại nhạc</Link>,
    icon: <BsFillMusicPlayerFill width={20} height={20} />,
  },
];
