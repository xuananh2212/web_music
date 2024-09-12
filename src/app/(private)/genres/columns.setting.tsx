import { TableBaseProps } from "@/app/(private)/components/table-base";
import { formatDateTime } from "@/helpers/date";
import { Image, Tag } from "antd";
const convertStatus = (value: any) => {
  return <Tag color={value === 1 ? "blue" : "red"}>{value === 1 ? "Đang hoạt động" : "Tài khoản bị khóa"}</Tag>;
};
export const GENRES_LIST_DEFAULT_COLUMNS: TableBaseProps["columns"] = [
  {
    title: "Thể loại nhạc",
    dataIndex: "name",
    fixed: "left",
    ellipsis: true,
    width: 200,
    isSort: true,
    isFilter: true,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image_url",
    width: 200,
    isSort: true,
    isDrag: true,
    isFilter: true,
    render: (value: string) => {
      return value && <Image width={35} height={35} src={value} />;
    },
  },
  {
    title: "Nội dung",
    dataIndex: "description",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_at",
    width: 200,
    render: formatDateTime,
    filter: {
      type: "date",
    },
    ellipsis: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Lịch sử cập nhập",
    dataIndex: "updated_at",
    width: 200,
    render: formatDateTime,
    filter: {
      type: "date",
    },
    ellipsis: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
];
