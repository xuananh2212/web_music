import { MenuProps } from "antd";
import Link from "next/link";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { CgMusicSpeaker } from "react-icons/cg";
import { FaChartBar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { LuAlbum } from "react-icons/lu";

type MenuItem = Required<MenuProps>["items"][number];
export const categories: MenuItem[] = [
  {
    key: "/dashboard",
    label: <Link href={"/dashboard"}>Biểu Đồ</Link>,
    icon: <FaChartBar size={20} />,
  },
  {
    key: "/users",
    label: <Link href={"/users"}>Người dùng</Link>,
    icon: <FaRegUser size={20} />,
  },
  {
    key: "/artists",
    label: <Link href={"/artists"}>Nghệ sĩ</Link>,
    icon: <GrUserManager size={20} />,
  },
  {
    key: "/genres",
    label: <Link href={"/genres"}>Thể loại nhạc</Link>,
    icon: <CgMusicSpeaker size={20} />,
  },
  {
    key: "/albums",
    label: <Link href={"/albums"}>Albums</Link>,
    icon: <LuAlbum size={20} />,
  },
  {
    key: "/songs",
    label: <Link href={"/songs"}>Bài hát</Link>,
    icon: <BsMusicNoteBeamed size={20} />,
  },
];
