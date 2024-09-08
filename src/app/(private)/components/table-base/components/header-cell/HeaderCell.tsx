import { Tooltip } from "antd";
import clsx from "clsx";
import React, { useCallback, useRef } from "react";
import { IFilterColumn, TableBaseProps } from "../..";
import { SORT_COLUMN_ENUM } from "../../../table-master";
import { useTableBaseContextSelector } from "../../hooks/useTableContext";
import styles from "./HeaderCell.module.scss";

interface HeaderCellProps extends React.ThHTMLAttributes<HTMLElement> {
  width: number | null | undefined;
  isSort: boolean;
  dataIndex: any;
  isDrag: boolean;
  isFilter: boolean;
  disabledResize: boolean | null | undefined;
  fixed: string | null | undefined;
  filter: IFilterColumn | null | undefined;
  onChangeColumns: TableBaseProps["onChangeColumns"];
  onChangeQueryParams: TableBaseProps["onChangeQueryParams"];
}

const HeaderCell = (props: HeaderCellProps) => {
  const {
    width: defaultWidth,
    isSort,
    isFilter,
    dataIndex,
    isDrag,
    style,
    className,
    children,
    disabledResize,
    fixed,
    filter,
    onChangeColumns,
    onChangeQueryParams,
  } = props;
  const thRef = useRef<HTMLTableHeaderCellElement>(null);
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = thRef.current?.offsetWidth || defaultWidth || 100;

      const onMouseMove = (e: MouseEvent) => {
        requestAnimationFrame(() => {
          const newWidth = startWidth + (e.clientX - startX);
          if (thRef.current) {
            thRef.current.style.width = `${newWidth}px`;
          }
        });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [defaultWidth]
  );

  const handleSort = (order: number) => {
    onChangeQueryParams((prev: any) => {
      if (order < 0) {
        delete prev.sort;
      } else {
        prev.sort = {
          name: dataIndex,
          type: order,
        };
      }
      return { ...prev };
    });
  };

  const isShowHiddenAction = useTableBaseContextSelector(
    (context) => !!context.defaultColumns?.find((e: any) => e.dataIndex === dataIndex)?.hidden
  );

  const isShowMoreAction = isFilter || isShowHiddenAction;
  const isFixed = !!fixed;
  const canDrag =
    !isFixed && !className?.includes("ant-table-cell-fix-left") && !className?.includes("ant-table-cell-fix-right");

  return (
    <th
      style={style}
      title=""
      ref={thRef}
      className={clsx(styles.root, className, {
        [styles.sorter]: isSort,
        "drag-column": canDrag,
      })}
    >
      <div
        className={clsx("column-title", {
          "mr-9": isSort && isShowMoreAction,
          "select-none hover:cursor-move": !disabledResize && canDrag,
          "mr-4": (isSort && !isShowMoreAction) || (!isSort && isShowMoreAction),
        })}
      >
        {children}
      </div>
      {isSort && <Sorter right={isShowMoreAction ? 20 : 4} dataIndex={dataIndex} onSort={handleSort} />}
      {!disabledResize && <div className="resize-handle" onMouseDown={onMouseDown} />}
    </th>
  );
};

export default React.memo(HeaderCell);

interface SorterProps {
  right: number;
  dataIndex: string;
  onSort?: (order: number) => void;
}

const Sorter = React.memo(({ right, dataIndex, onSort }: SorterProps) => {
  const order = useTableBaseContextSelector((context) =>
    context.queryParams?.sort?.name === dataIndex ? context.queryParams.sort?.type : undefined
  );

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let newOrder = SORT_COLUMN_ENUM.Increase;
    if (order === SORT_COLUMN_ENUM.Increase) {
      newOrder = SORT_COLUMN_ENUM.Decrease;
    } else if (order === SORT_COLUMN_ENUM.Decrease) {
      newOrder = SORT_COLUMN_ENUM.Default;
    }
    if (onSort) {
      onSort(newOrder);
    }
  };

  let text = "Nhấp để sắp xếp tăng dần";
  if (order === SORT_COLUMN_ENUM.Increase) {
    text = "Nhấp để sắp xếp giảm dần";
  } else if (order === SORT_COLUMN_ENUM.Decrease) {
    text = "Nhấp để hủy sắp xếp";
  }

  return (
    <Tooltip placement="top" title={text}>
      <div className="sort-handle" style={{ right: right }} onClick={handleClick}>
        <svg
          viewBox="0 0 1024 1024"
          focusable="false"
          data-icon="caret-up"
          width={12}
          height={12}
          fill={order === SORT_COLUMN_ENUM.Increase ? "var(--color-500)" : "rgba(0, 0, 0, 0.29)"}
          aria-hidden="true"
        >
          <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
        </svg>
        <svg
          className="-mt-1"
          viewBox="0 0 1024 1024"
          focusable="false"
          data-icon="caret-down"
          width={12}
          height={12}
          fill={order === SORT_COLUMN_ENUM.Decrease ? "var(--color-500)" : "rgba(0, 0, 0, 0.29)"}
          aria-hidden="true"
        >
          <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
        </svg>
      </div>
    </Tooltip>
  );
});

Sorter.displayName = "Sorter";
