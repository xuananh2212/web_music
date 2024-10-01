"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import usePlaylistQuery from "./hooks/usePlaylistQuery";

const Page = () => {
  const queryData = usePlaylistQuery();
  return <TableMaster title="Danh sách phát" {...queryData} />;
};

export default Page;
