"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import useSongQuery from "./hooks/useSongQuery";

const Page = () => {
  const queryData = useSongQuery();
  return <TableMaster title="Danh sách Bài hát" {...queryData} />;
};

export default Page;
