import { Refresh } from "iconoir-react";
import { TableMasterProps } from "../../table-master";

interface GetActionBarParams {
  onRefetch?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  onSetting?: () => void;
}

const getActionBar = (
  { onRefetch }: GetActionBarParams,
  isCollapseExpand?: boolean
): TableMasterProps["actionsBar"] => {
  const actions: TableMasterProps["actionsBar"] = [
    {
      key: 1,
      name: "Làm mới",
      icon: Refresh,
      onClick: onRefetch,
    },
  ];
  return actions.filter((action) => typeof action.onClick === "function");
};

export default getActionBar;
