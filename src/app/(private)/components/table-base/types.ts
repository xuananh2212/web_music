import { SelectProps, TableProps } from "antd";
import { createContext } from "react";

export interface IBaseFilterColumn {
  type: "date" | "string" | "number" | "boolean";
}

export interface ISelectFilterColumn {
  type: "select";
  options: SelectProps["options"];
}

export type IFilterColumn = IBaseFilterColumn | ISelectFilterColumn;

export type TableColumn = {
  title: string;
  dataIndex: string;
  key?: string;
  ellipsis?: boolean;
  align?: "center" | "left" | "right";
  render?: (text: any, record?: any, index?: number) => React.ReactNode;
  isSort?: boolean;
  isFilter?: boolean;
  filter?: IFilterColumn;
  width?: number;
  fixed?: "left" | "right";
  hidden?: boolean;
  [key: string]: any;
};

export interface TableBaseProps {
  settingColumnsKey?: string;
  columns: Array<TableColumn>;
  defaultColumns?: Array<TableColumn>;
  onChangeColumns: React.Dispatch<React.SetStateAction<Array<TableColumn>>>;
  queryParams: any;
  onChangeQueryParams: React.Dispatch<React.SetStateAction<any>>;
  data: any;
  size?: TableProps["size"];
  selectedRowKeys: string[];
  onSelectChange: any;
  hiddenAdd?: boolean;
  loading: boolean;
  disableRowSelection?: boolean;
  canInitializeData?: boolean;
  onInitData?: () => void;
}

export interface TableBaseContextValue {
  queryParams: TableBaseProps["queryParams"];
  columns: TableBaseProps["columns"];
  defaultColumns?: TableBaseProps["columns"];
  settingColumnsKey?: TableBaseProps["settingColumnsKey"];
}

export const TableBaseContext = createContext<TableBaseContextValue | undefined>(undefined);
