"use client";
import useLogout from "@/hooks/useLogout";
import useProfile from "@/hooks/useProfile";
import useApplicationStore from "@/stores/application/application.store";
import { ThemeType } from "@/stores/application/types";
import { Avatar, Badge, Dropdown, MenuProps } from "antd";
import Image from "next/image";
import { useCallback } from "react";
import styles from "../Header.module.scss";

const themeOptions = [
  { key: "3-1", value: "blue", label: "Xanh dương", color: "#12448a" },
  { key: "3-2", value: "green", label: "Xanh lá", color: "#4fb1a1" },
  { key: "3-3", value: "red", label: "Đỏ", color: "#cb6453" },
  { key: "3-4", value: "orange", label: "Cam", color: "#d38049" },
];

const UserSidebar = () => {
  const { setTheme } = useApplicationStore();
  const profile = useProfile();
  const logout = useLogout();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex py-2 items-center gap-[10px]">
          <Avatar size={40} src={<Image src="/images/avatar-default.png" width={40} height={40} alt="avatar" />} />
          <div>
            <span className="text-sm font-semibold">{profile?.username}</span>
            <span className="block mt-1">EVN</span>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div className={`flex items-center gap-2 pr-3`}>
          <div className="w-[20px] h-[20px] rounded-full bg-color-500" />
          <span className="color-circle">Màu chủ đề</span>
        </div>
      ),
      children: themeOptions.map((option) => ({
        ...option,
        label: (
          <div className={`theme-option-${option.value} flex items-center gap-2`}>
            <div
              className="w-[20px] h-[20px] rounded-full"
              style={{
                background: `${option.color}`,
              }}
            ></div>
            <span className="color-circle"> {option.label}</span>
          </div>
        ),
      })),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "FAQ",
    },
    {
      key: "logout",
      label: "Đăng xuất",
    },
  ];

  const handleValueTheme = (key: string) => {
    const result = themeOptions.find((option) => option.key === key);
    return result?.value || "green";
  };

  const handleOnClickDropDown: MenuProps["onClick"] = useCallback(
    ({ key }: { key: string }) => {
      switch (key) {
        case "3-1":
        case "3-2":
        case "3-3":
        case "3-4":
          setTheme(handleValueTheme(key) as ThemeType);
          break;
        case "logout":
          logout();
          break;
        default:
          break;
      }
    },
    [setTheme]
  );

  return (
    <div className="flex items-center">
      <Dropdown
        className={styles.styleDropdown}
        menu={{ items, onClick: handleOnClickDropDown }}
        placement="bottomRight"
      >
        <div className="cursor-pointer">
          <Badge offset={[-4, 25]} style={{ background: "green", transform: "translate(50%, 50%)" }} dot>
            <Avatar size={32} src={<Image src="/images/avatar-default.png" width={40} height={40} alt="avatar" />} />
          </Badge>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserSidebar;
