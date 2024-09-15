import { TableBaseProps } from "@/app/(private)/components/table-base";
import { formatDateTime } from "@/helpers/date";
import { Image, Tag } from "antd";
const convertStatus = (value: any) => {
  return <Tag color={value === 1 ? "blue" : "red"}>{value === 1 ? "Đang hoạt động" : "Tài khoản bị khóa"}</Tag>;
};
export const USER_LIST_DEFAULT_COLUMNS: TableBaseProps["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    fixed: "left",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Tên Tài khoản nghệ sĩ",
    dataIndex: "user_name",
    ellipsis: true,
    width: 200,
    isSort: true,
    isFilter: true,
  },
  {
    title: "Biệt danh",
    dataIndex: "stage_name",
    width: 200,
    isSort: true,
    isDrag: true,
    isFilter: true,
  },
  {
    title: "Hình ảnh",
    dataIndex: "url_image",
    width: 200,
    isSort: true,
    isDrag: true,
    isFilter: true,
    render: (value: string) => {
      return value && <Image width={35} height={35} src={value} />;
    },
  },
  {
    title: "email",
    dataIndex: "email",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
  },
  {
    title: "Số điên thoại",
    dataIndex: "phone",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
  },

  {
    title: "Trạng thái",
    dataIndex: "status",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    render: (value: any) => {
      return convertStatus(value);
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
    isFilter: true,
    hidden: true,
  },
];
