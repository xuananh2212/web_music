import { TableBaseProps } from "@/app/(private)/components/table-base";
import { formatDate, formatDateTime } from "@/helpers/date";
import { Tag } from "antd";
const convertLevelOrganization = (level: 0 | 1) => {
  return level === 1 ? <Tag color="blue">Phòng ban</Tag> : <Tag color="green">Đơn vị</Tag>;
};
export const USER_LIST_DEFAULT_COLUMNS: TableBaseProps["columns"] = [
  {
    title: "Mã",
    dataIndex: "code",
    fixed: "left",
    ellipsis: true,
    width: 200,
    isSort: true,
    isFilter: true,
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    render: (text, record) => {
      return <div className={record?.parent_id ? "" : "text-ant-blue"}>{text}</div>;
    },
  },
  {
    title: "Cấp tổ chức",
    dataIndex: "organization_level",
    width: 200,
    render: (text) => {
      return convertLevelOrganization(text);
    },
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    filter: {
      type: "select",
      options: [
        { value: 0, label: "Đợn vị" },
        { value: 1, label: "Phòng ban" },
      ],
    },
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Số đăng ký",
    dataIndex: "register_number",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Nơi cấp",
    dataIndex: "place_of_issue",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Ngày cấp",
    dataIndex: "date_of_issue",
    width: 200,
    ellipsis: true,
    render: (data: string) => {
      return data ? formatDate(data, "DD-MM-YYYY") : "";
    },
    filter: {
      type: "date",
    },
    isSort: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Người tạo",
    dataIndex: "created_by_name",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_on",
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
    title: "Người sửa",
    dataIndex: "modified_by_name",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    isFilter: true,
    hidden: true,
  },
  {
    title: "Lịch sử cập nhật",
    dataIndex: "modified_on",
    width: 200,
    render: formatDateTime,
    filter: {
      type: "date",
    },
    ellipsis: true,
    isDrag: true,
    isFilter: true,
  },
];
