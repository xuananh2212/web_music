"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import useAlbumQuery from "./hooks/useAlbumQuery";

const Page = () => {
  const queryData = useAlbumQuery();
  return <TableMaster title="Danh sách Bài hát" {...queryData} />;
};

export default Page;