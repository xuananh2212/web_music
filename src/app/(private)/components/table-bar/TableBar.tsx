"use client";

import { Button, Dropdown, Form, Input, Tooltip } from "antd";
import { Plus } from "iconoir-react";
import { debounce } from "lodash";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import { TableBarProps } from "../table-master";

const { Search: SearchInput } = Input;

const TableBar = ({
  placeholderInput,
  actions,
  selectedRowKeys,
  onChangeQueryParams,
  onClickDropDown,
  onFinishFailed,
  onAction,
  actionDropdownAdd,
  moreActions,
  hiddenAdd,
  queryParams,
}: TableBarProps) => {
  const handleKeyWordChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      onChangeQueryParams((prev: any) => ({
        ...prev,
        keyword: e.target.value,
        page_index: 1,
      }));
    }, 300),
    []
  );
  const moreActionsElement = useMemo(() => {
    return moreActions?.(selectedRowKeys, queryParams, onChangeQueryParams);
  }, [selectedRowKeys, queryParams]);
  return (
    <div className="flex gap-6 items-center justify-between">
      <Form
        onFinishFailed={onFinishFailed}
        className="h-fit flex-1 rounded-tl-md rounded-tr-md relative bg-transparent p-0"
      >
        <SearchInput
          size="middle"
          placeholder={placeholderInput}
          type="text"
          name="keyword"
          onChange={handleKeyWordChange}
          className="w-[264px]"
          allowClear
        />
      </Form>
      <div className="action flex gap-3">
        <div className="flex gap-3">
          {moreActionsElement}
          {actionDropdownAdd && actionDropdownAdd.length ? (
            <Dropdown menu={{ items: actionDropdownAdd, onClick: onClickDropDown }} trigger={["click"]}>
              <Button disabled={hiddenAdd} type="primary" icon={<Plus />}>
                Thêm
              </Button>
            </Dropdown>
          ) : (
            <Button disabled={hiddenAdd} type="primary" icon={<Plus />} onClick={() => onAction("add")}>
              Thêm
            </Button>
          )}
        </div>
        {actions?.map(({ name, icon: Icon, dropDown, onClick }, index: number) => {
          if (dropDown?.length) {
            return (
              <Dropdown menu={{ items: dropDown, onClick: onClickDropDown }} key={index} trigger={["click"]}>
                <Button
                  key={index}
                  onClick={onClick}
                  className="!p-0 !w-8 !h-8 flex items-center border-none justify-center cursor-pointer"
                >
                  <Tooltip title={name} color={"var(--color-400)"}>
                    <Icon width={22} height={22} name={name} />
                  </Tooltip>
                </Button>
              </Dropdown>
            );
          }
          return (
            <div
              key={index}
              onClick={onClick}
              className="!p-0 !w-8 !h-8 flex items-center border-none justify-center cursor-pointer"
            >
              <Tooltip title={name} color={"var(--color-400)"}>
                <Icon width={22} height={22} name={name} />
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TableBar);
