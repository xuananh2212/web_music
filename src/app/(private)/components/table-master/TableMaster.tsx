"use client";
import { Card } from "antd";
import { useMemo, useState } from "react";
import TableBar from "../table-bar";
import TableBase from "../table-base";
import { TableMasterProps } from "./types";

export default function TableMaster({
  columns,
  onChangeColumns,
  queryParams,
  onChangeQueryParams,
  title,
  actionsBar,
  loading,
  onClickDropDown,
  actionDropdownAdd,
  data,
  tableBarProps,
  disableRowSelection,
  canInitializeData,
  onInitData,
  defaultColumns,
  settingColumnsKey,
  ...props
}: TableMasterProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const onAction = useMemo(() => props.onAction, [data, queryParams]);
  return (
    <Card>
      <div className="mb-6 flex justify-between items-start gap-4">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
          <h3 className="mr-3 leading-[32px] text-sm 2xl:text-lg">{title}</h3>
        </div>
        <TableBar
          {...tableBarProps}
          hiddenAdd={props?.hiddenAdd}
          queryParams={queryParams}
          onChangeQueryParams={onChangeQueryParams}
          actions={actionsBar}
          actionDropdownAdd={actionDropdownAdd}
          placeholderInput="Tìm kiếm"
          onAction={onAction}
          selectedRowKeys={selectedRowKeys}
          onClickDropDown={onClickDropDown}
          disableDeleteMany={disableRowSelection}
        />
      </div>
      <TableBase
        settingColumnsKey={settingColumnsKey}
        defaultColumns={defaultColumns}
        columns={columns}
        onChangeColumns={onChangeColumns}
        onChangeQueryParams={onChangeQueryParams}
        data={data}
        queryParams={queryParams}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedRowKeys}
        loading={loading}
        disableRowSelection={disableRowSelection}
        canInitializeData={canInitializeData}
        onInitData={onInitData}
      />
    </Card>
  );
}
