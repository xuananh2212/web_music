import { Tab } from "@private/components/tabs/Tabs";
import { ProfileCircle, Reports } from "iconoir-react";

export const tabs: Tab[] = [
  {
    key: "data",
    icon: <ProfileCircle className="w-[18px] h-[18px]" />,
    label: "Dữ liệu",
    matchPath: "/categories/organization-structure/data",
  },
  {
    key: "reports",
    icon: <Reports className="w-[18px] h-[18px]" />,
    label: "Báo cáo",
    matchPath: "/categories/organization-structure/reports",
  },
];
