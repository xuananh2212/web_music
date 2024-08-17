import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export interface SidebarItem {
  id?: number;
  name?: string;
  path?: string;
  icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
  [key: string]: any;
}
