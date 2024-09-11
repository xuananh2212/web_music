import { MenuProps } from "antd";
import React from "react";
import { TableBaseProps } from "../table-base";

export interface TableMasterProps
  extends Pick<
    TableBaseProps,
    | "settingColumnsKey"
    | "defaultColumns"
    | "columns"
    | "onChangeColumns"
    | "queryParams"
    | "onChangeQueryParams"
    | "disableRowSelection"
    | "canInitializeData"
    | "onInitData"
    | "hiddenAdd"
  > {
  data: any;
  title: string;
  actionsBar: TableBarProps["actions"];
  actionDropdownAdd?: any;
  onAction: (type: FormType, value?: any, key?: string) => void;
  onClickDropDown?: MenuProps["onClick"];
  onBulkAction?: (type: BulkActionType, ids: string[], callbackSuccess: () => void) => void;
  loading: boolean;
  tableBarProps?: Pick<TableBarProps, "moreActions">;
}

export type FormType = "add" | "copy" | "view" | "edit" | "delete" | "follow";

export type BulkActionType = "delete";

export interface TableBarProps extends Pick<TableBaseProps, "onChangeQueryParams" | "queryParams"> {
  placeholderInput?: string;
  actions: Action[];
  hiddenAdd: boolean | undefined;
  selectedRowKeys: string[];
  onClickDropDown?: MenuProps["onClick"];
  onFinishFailed?: (errorInfo: any) => void;
  onAction: TableMasterProps["onAction"];
  actionDropdownAdd?: MenuProps["items"];
  moreActions?: (
    selectedRowKeys: string[],
    queryParams: TableBaseProps["queryParams"],
    onChangeQueryParams: TableBaseProps["onChangeQueryParams"]
  ) => React.ReactNode;
  disableDeleteMany?: boolean;
}

interface Action {
  key: number;
  dropDown?: MenuProps["items"];
  name: string;
  icon: React.FC<any>;
  onClick?: () => void;
}

export type BaseQueryTable = () => BaseQueryTableResult;

export type BaseQueryTableResult = Pick<
  TableMasterProps,
  | "settingColumnsKey"
  | "onAction"
  | "onBulkAction"
  | "actionsBar"
  | "data"
  | "loading"
  | "columns"
  | "onChangeColumns"
  | "queryParams"
  | "onChangeQueryParams"
  | "tableBarProps"
  | "onInitData"
  | "canInitializeData"
  | "defaultColumns"
  | "hiddenAdd"
>;
