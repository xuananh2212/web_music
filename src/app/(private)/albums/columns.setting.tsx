import { TableBaseProps } from "@/app/(private)/components/table-base";
import { formatDateTime } from "@/helpers/date";
import { Image, Tag } from "antd";
const convertStatus = (value: any) => {
  return <Tag color={value === 1 ? "blue" : "red"}>{value === 1 ? "Đang hoạt động" : "Tài khoản bị khóa"}</Tag>;
};
export const ALBUM_LIST_DEFAULT_COLUMNS: TableBaseProps["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    fixed: "left",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Tên album",
    dataIndex: "title",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Nghệ sĩ",
    dataIndex: "artist_name",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image_url",
    width: 200,
    isSort: true,
    isDrag: true,
    render: (value: string) => {
      return value && <Image width={35} height={35} src={value} />;
    },
  },
  {
    title: "Ngày phát hành",
    dataIndex: "release_date",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
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
  },
];
