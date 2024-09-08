import { Button, Empty, Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { TablePaginationConfig } from "antd/lib";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDragListView from "react-drag-listview";
import { processColumn, TABLE_BASE_CONFIG } from "./config/table.config";
import { expandAllRows } from "./helpers";
import styles from "./TableBase.module.scss";
import { TableBaseContext, TableBaseProps } from "./types";

export const TableBase = (props: TableBaseProps) => {
  const {
    onChangeColumns,
    data,
    size = "small",
    selectedRowKeys,
    onSelectChange,
    queryParams,
    onChangeQueryParams,
    loading,
    columns,
    canInitializeData,
    onInitData,
    defaultColumns,
    settingColumnsKey,
    disableRowSelection,
  } = props;

  const [isMounted, setIsMounted] = useState(false);

  const handleChange = useCallback((pagination: any) => {
    onChangeQueryParams((pre: any) => {
      let params = {
        ...pre,
        page_size: pagination.pageSize,
        page_index: pagination.current,
      };
      return params;
    });
  }, []);

  const rowSelection: TableRowSelection<any> = useMemo(
    () => ({
      selectedRowKeys,
      onChange: onSelectChange,
      onSelectAll: expandAllRows,
    }),
    [selectedRowKeys, onSelectChange]
  );

  const pagination = useMemo<TablePaginationConfig>(
    () => ({
      position: ["bottomLeft"],
      pageSize: queryParams.page_size,
      total: data?.total_items,
      pageSizeOptions: [10, 15, 20],
      className: "gap-x-2 [&>li:first-child]:!mr-auto !mb-0",
      showSizeChanger: true,
      current: queryParams.page_index || 1,
      showTotal: (total) => (
        <div>
          Tổng số: <strong>{total}</strong> bản ghi
        </div>
      ),
    }),
    [queryParams?.page_size, queryParams.page_index, data?.total_items]
  );

  const handleDragEnd = useCallback((fromIndex: number, toIndex: number) => {
    onChangeColumns((prev) => {
      const visibleColumns = prev.filter((col) => !col.hidden);
      const [movedColumn] = visibleColumns.splice(fromIndex - 1, 1);
      visibleColumns.splice(toIndex - 1, 0, movedColumn);
      const resultColumns = prev.map((col) => {
        if (!col.hidden) {
          return visibleColumns.shift()!;
        }
        return col;
      });
      return resultColumns;
    });
  }, []);

  useEffect(() => {
    onChangeColumns(processColumn(onChangeColumns, onChangeQueryParams));
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <TableBaseContext.Provider value={{ queryParams, columns, defaultColumns, settingColumnsKey }}>
      <ReactDragListView.DragColumn
        nodeSelector=".drag-column"
        handleSelector=".column-title"
        onDragEnd={handleDragEnd}
      >
        <Table
          {...TABLE_BASE_CONFIG}
          columns={columns}
          dataSource={data?.items}
          loading={loading}
          onChange={handleChange}
          size={size}
          rowSelection={disableRowSelection ? undefined : rowSelection}
          tableLayout="fixed"
          className={styles.root}
          bordered
          pagination={pagination}
          locale={
            loading || !canInitializeData
              ? undefined
              : {
                  emptyText: <EmptyText onInitData={onInitData} />,
                }
          }
        />
      </ReactDragListView.DragColumn>
    </TableBaseContext.Provider>
  );
};

export default React.memo(TableBase);

const EmptyText = React.memo(({ onInitData }: any) => {
  return (
    <Empty
      className="[&>.ant-empty-image]:h-[60px]"
      image={<Image src="/images/table-init-data.png" alt="empty" height={60} width={98} className="object-cover" />}
      description={
        <p>
          Hệ thống chưa có dữ liệu.&nbsp;
          <span className="cursor-pointer text-ant-blue">Xem hướng dẫn tạo dữ liệu mẫu</span>
        </p>
      }
    >
      <Button onClick={onInitData} className="!bg-ant-blue" type="primary">
        Khởi tạo dữ liệu
      </Button>
    </Empty>
  );
});
EmptyText.displayName = "EmptyText";
