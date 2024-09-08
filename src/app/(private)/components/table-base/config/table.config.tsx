import { TableProps, Tooltip } from "antd";
import { EditPencil, Eye, Trash } from "iconoir-react";
import { cloneDeep } from "lodash";
import { TableMasterProps } from "../../table-master";
import HeaderCell from "../components/header-cell/HeaderCell";
import { TableBaseProps } from "../types";

export const addActionColumns = (defaultColumns: Array<any>, onAction: TableMasterProps["onAction"]) => {
  const actionColumns = [
    {
      title: "view",
      key: "view",
      icon: (
        <Tooltip title="Xem" color={"var(--color-400)"}>
          <Eye color="#00A991" width={16} height={16} />
        </Tooltip>
      ),
      onClick: (value: any) => {
        onAction("view", value);
      },
    },
    {
      title: "edit",
      key: "edit",
      icon: (
        <Tooltip title="Chỉnh sửa" color={"var(--color-400)"}>
          <EditPencil color="#FF9443" width={16} height={16} />
        </Tooltip>
      ),
      onClick: (value: any) => {
        onAction("edit", value);
      },
    },
    {
      title: "delete",
      key: "delete",
      icon: (
        <Tooltip title="Xoá" color={"var(--color-400)"}>
          <Trash color="#F65757" fontSize={16} width={16} height={16} />
        </Tooltip>
      ),
      onClick: (value: any) => {
        onAction("delete", value);
      },
    },
  ];

  const columnsAction = [
    {
      title: <div className="text-center">Hành động</div>,
      key: "action",
      fixed: "right",
      disabledResize: true,
      render: (_: any, record: any) => {
        return (
          <div className="flex justify-center gap-4">
            {actionColumns.map((value) => {
              return (
                <div
                  key={value.key}
                  className="cursor-pointer flex justify-center"
                  onClick={() => value.onClick(record)}
                >
                  {value.icon}
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];
  const newDefaultColumns = defaultColumns.map((col) => {
    if (col?.ellipsis) {
      return {
        ...col,
        ellipsis: false,
        render: (text: any, record: any, index: any) => {
          return (
            <div className="line-clamp-2 break-all" title={text}>
              {col?.render ? col.render(text, record, index) : text}
            </div>
          );
        },
      };
    } else {
      return {
        ...col,
      };
    }
  });
  return [...cloneDeep(newDefaultColumns), ...cloneDeep(columnsAction)];
};

const scroll: any = { x: true };

const showSorterTooltip: TableProps["showSorterTooltip"] = { target: "sorter-icon" };

export const TABLE_BASE_CONFIG: Partial<TableProps> = {
  scroll,
  showSorterTooltip,
  components: {
    header: {
      cell: HeaderCell,
    },
  },
};

export const processColumn =
  (onChangeColumns: TableBaseProps["onChangeColumns"], onChangeQueryParams: TableBaseProps["onChangeQueryParams"]) =>
  (columns: TableBaseProps["columns"]): TableBaseProps["columns"] => {
    return columns.map((_col: any) => {
      let col = _col;
      if (!col.key) {
        col.key = col.dataIndex;
      }
      col.onHeaderCell = (props: any) => ({
        ...props,
        onChangeColumns,
        onChangeQueryParams,
      });
      col.sorter = false;
      return col;
    });
  };
