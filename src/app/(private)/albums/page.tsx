"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import useAlbumQuery from "./hooks/useAlbumQuery";

const Page = () => {
  const queryData = useAlbumQuery();
  return <TableMaster title="Danh sách Albums" {...queryData} />;
};

export default Page;
