"use client";
import { Tabs as TabsAntd } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Type definition for a Tab
 */
export interface Tab {
  key: string;
  icon?: React.ReactNode; // Optional icon for the tab
  label: string | React.ReactNode; // Label can be a string or a ReactNode
  content?: React.ReactNode; // Optional content of the tab
  matchPath?: string; // Optional path for matching with the current route
}

/**
 * Props for the Tabs component
 */
interface TabsProps {
  /**
   * Array of tabs to display
   */
  tabs: Tab[];
}

/**
 * Tabs component displays tabs based on the provided props.
 * It determines the active tab based on the current pathname and allows navigation between tabs.
 *
 * @param {TabsProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered tabs component.
 */
const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const router = useRouter(); // Hook for programmatic navigation
  const pathname = usePathname(); // Get the current pathname

  // Determine the active tab key based on the current pathname
  const findActiveKey = () => {
    for (const tab of tabs) {
      if (pathname.startsWith(tab.matchPath || "")) {
        return tab.key;
      }
    }
    return tabs[0]?.key || ""; // Default to the first tab if no match is found, or an empty string if no tabs
  };

  const activeKey = findActiveKey();

  const items = tabs.map(({ key, icon, label, content, matchPath }) => ({
    key,
    label: (
      <Link href={`${matchPath}`} className="flex items-center gap-[6px] px-3">
        {icon && icon} {/* Render the icon if it exists */}
        <span className="font-semibold select-none">{label}</span>
      </Link>
    ),
    children: content || null, // Use content if it exists, otherwise null
  }));

  return (
    <TabsAntd
      activeKey={activeKey} // Set the active key based on the current pathname
      items={items}
      tabBarGutter={0}
    />
  );
};

export default Tabs;
