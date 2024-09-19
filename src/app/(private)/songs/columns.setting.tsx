import { TableBaseProps } from "@/app/(private)/components/table-base";
import { formatDateTime } from "@/helpers/date";
import { Image, Tag } from "antd";
const convertStatus = (value: any) => {
  return <Tag color={value === 1 ? "blue" : "red"}>{value === 1 ? "Đang hoạt động" : "Tài khoản bị khóa"}</Tag>;
};
export const SONG_DEFAULT_COLUMNS: TableBaseProps["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    fixed: "left",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Tên bài hát",
    dataIndex: "title",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Id album",
    dataIndex: "album_id",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  // {
  //   title: "Tên album",
  //   dataIndex: "album_name",
  //   ellipsis: true,
  //   width: 200,
  //   isSort: true,
  // },
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
    title: "Lượt xem",
    dataIndex: "view",
    ellipsis: true,
    width: 200,
    isSort: true,
    render: (data: any) => {
      return data || 0;
    },
  },
  {
    title: "Lượt yêu thích",
    dataIndex: "favorites",
    ellipsis: true,
    width: 200,
    isSort: true,
    render: (data: any) => {
      return data || 0;
    },
  },
  {
    title: "Lời bài nhạc",
    dataIndex: "lyrics",
    ellipsis: true,
    width: 200,
    isSort: true,
  },
  {
    title: "Ngày phát hành",
    dataIndex: "release_date",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    render: formatDateTime,
  },
  {
    title: "File nhạc",
    dataIndex: "file_url",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    render: (value: string) => {
      return (
        value && (
          <audio controls>
            <source src={value} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      );
    },
  },
  {
    title: "File video",
    dataIndex: "video_url",
    width: 200,
    ellipsis: true,
    isSort: true,
    isDrag: true,
    render: (value: string) => {
      return (
        value && (
          <video controls width="250">
            <source src={value} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        )
      );
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
