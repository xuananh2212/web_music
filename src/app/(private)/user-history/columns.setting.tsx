import { TableBaseProps } from "@/app/(private)/components/table-base";
import { formatDateTime } from "@/helpers/date";
import { Tag } from "antd";
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
    title: "userId",
    dataIndex: "user_id",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Tên người dùng",
    dataIndex: "User",
    ellipsis: true,
    render: (data: any) => {
      return data && data?.user_name;
    },
    width: 200,
    isSort: true,
  },
  {
    title: "SongId",
    dataIndex: "song_id",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Tên Bài Hát",
    dataIndex: "Song",
    ellipsis: true,
    width: 200,
    isSort: true,
    render: (data: any) => {
      return data && data?.title;
    },
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
