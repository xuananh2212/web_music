import { useCallback, useMemo, useState } from "react";
import {
  FILTER_COLUMN_ENUM,
  TABLE_OPTIONS_DATE_FILTER,
  TABLE_OPTIONS_FILTER,
  TABLE_OPTIONS_NUMBER_FILTER,
} from "../../table-master";
import { FilterActionProps } from "../components/header-cell/more-actions/components/filter-action/FilterAction";
import { useTableBaseContextSelector } from "./useTableContext";

const useFilterColumn = (props: FilterActionProps) => {
  const { dataIndex, filter: filterProps, onChangeQueryParams, onClose } = props;
  const filtered = useTableBaseContextSelector((context) =>
    context.queryParams?.filters?.find((e: any) => e.name === dataIndex)
  );
  const filterType = filterProps?.type || "string";

  const filterTypeOptions = useMemo(() => {
    let options = TABLE_OPTIONS_FILTER;
    if (filterType === "date") {
      options = TABLE_OPTIONS_DATE_FILTER;
    }
    if (filterType === "number") {
      options = TABLE_OPTIONS_NUMBER_FILTER;
    }
    return options;
  }, []);

  const column = useTableBaseContextSelector((context) => context.columns?.find((e: any) => e.dataIndex === dataIndex));

  let emptyFilter: any = {
    value: "",
    type: FILTER_COLUMN_ENUM.Contain,
  };
  if (filterType === "date") {
    emptyFilter = {
      value: null,
      type: FILTER_COLUMN_ENUM.LessThan,
    };
  } else if (filterType === "number") {
    emptyFilter = {
      value: null,
      type: FILTER_COLUMN_ENUM.Equal,
    };
  }

  const [filters, setFilters] = useState<{
    value: any;
    type: number;
  }>(filtered ? { value: filtered.value, type: filtered.type } : emptyFilter);

  const handleReset = useCallback(() => {
    onClose();
    onChangeQueryParams((prev: any) => {
      if (!prev.filters) return prev;
      prev.filters = prev.filters.filter((item: any) => item.name !== dataIndex);
      return {
        ...prev,
      };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    onClose();
    onChangeQueryParams((pre: any) => {
      if (!pre.filters) {
        pre.filters = [];
      }
      const index = pre.filters?.findIndex((item: any) => item.name === dataIndex);
      if (index !== -1) {
        pre.filters[index] = {
          name: dataIndex,
          value: filters.value,
          type: filters.type,
        };
      } else {
        pre.filters.push({
          name: dataIndex,
          value: filters.value,
          type: filters.type,
        });
      }
      return {
        ...pre,
        page_index: 1,
      };
    });
  }, [filters]);

  return {
    onSubmit: handleSubmit,
    onReset: handleReset,
    onChange: setFilters,
    name: column?.title,
    options:
      column?.filter?.type === "select"
        ? column?.filter?.options?.map((e) => ({ ...e, value: `${e.value}` }))
        : undefined,
    filterTypeOptions,
    filterType,
    ...filters,
  };
};

export default useFilterColumn;
