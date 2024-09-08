import { isNil } from "lodash";

export enum FILTER_COLUMN_ENUM {
  NotNull = 0,
  Null = 1,
  Contain = 2,
  NotContain = 3,
  Equal = 4,
  NotEqual = 5,
  StartWith = 6,
  EndWith = 7,
  LessThan = 8,
  LessThanOrEqual = 9,
  MoreThan = 10,
  MoreThanOrEqual = 11,
  DateEqual = 12,
  DateNotEqual = 13,
  NumberLessThan = 14,
  NumberLessThanOrEqual = 15,
  NumberMoreThan = 16,
  NumberMoreThanOrEqual = 17,
}

export enum SORT_COLUMN_ENUM {
  Default = -1,
  Increase = 0,
  Decrease = 1,
}

export const QUERY_DEFAULT = {
  keyword: "",
  pageSize: 15,
  pageIndex: 1,
  order: [],
  filters: [],
};

export const TABLE_OPTIONS_FILTER = [
  { value: FILTER_COLUMN_ENUM.NotNull, label: "(Không trống)" },
  { value: FILTER_COLUMN_ENUM.Null, label: "(Trống)" },
  { value: FILTER_COLUMN_ENUM.Equal, label: "Bằng" },
  { value: FILTER_COLUMN_ENUM.NotEqual, label: "Khác" },
  { value: FILTER_COLUMN_ENUM.Contain, label: "Chứa" },
  { value: FILTER_COLUMN_ENUM.NotContain, label: "Không chứa" },
  { value: FILTER_COLUMN_ENUM.StartWith, label: "Bắt đầu với" },
  { value: FILTER_COLUMN_ENUM.EndWith, label: "Kết thúc với" },
];

export const TABLE_OPTIONS_DATE_FILTER = [
  { value: FILTER_COLUMN_ENUM.NotNull, label: "(Không trống)" },
  { value: FILTER_COLUMN_ENUM.Null, label: "(Trống)" },
  { value: FILTER_COLUMN_ENUM.DateEqual, label: "Bằng" },
  { value: FILTER_COLUMN_ENUM.DateNotEqual, label: "Khác" },
  { value: FILTER_COLUMN_ENUM.LessThan, label: "Nhỏ hơn" },
  { value: FILTER_COLUMN_ENUM.LessThanOrEqual, label: "Nhỏ hơn hoặc bằng" },
  { value: FILTER_COLUMN_ENUM.MoreThan, label: "Lớn hơn" },
  { value: FILTER_COLUMN_ENUM.MoreThanOrEqual, label: "Lớn hơn hoặc bằng" },
];

export const TABLE_OPTIONS_NUMBER_FILTER = [
  { value: FILTER_COLUMN_ENUM.NotNull, label: "(Không trống)" },
  { value: FILTER_COLUMN_ENUM.Null, label: "(Trống)" },
  { value: FILTER_COLUMN_ENUM.Equal, label: "Bằng" },
  { value: FILTER_COLUMN_ENUM.NotEqual, label: "Khác" },
  { value: FILTER_COLUMN_ENUM.NumberLessThan, label: "Nhỏ hơn" },
  { value: FILTER_COLUMN_ENUM.NumberLessThanOrEqual, label: "Nhỏ hơn hoặc bằng" },
  { value: FILTER_COLUMN_ENUM.NumberMoreThan, label: "Lớn hơn" },
  { value: FILTER_COLUMN_ENUM.NumberMoreThanOrEqual, label: "Lớn hơn hoặc bằng" },
];

export const getFilterOptionLabel = (value: number | null | undefined) => {
  if (isNil(value)) return "";
  return [...TABLE_OPTIONS_FILTER, ...TABLE_OPTIONS_DATE_FILTER, ...TABLE_OPTIONS_NUMBER_FILTER].find(
    (e) => e.value === value
  )?.label;
};

export const TABLE_OPTIONS_ORDER = [
  {
    value: SORT_COLUMN_ENUM.Decrease,
    label: "Giảm",
  },
  {
    value: SORT_COLUMN_ENUM.Increase,
    label: "Tăng",
  },
];
