"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import useGenreQuery from "./hooks/useGenreQuery";

const Page = () => {
  const queryData = useGenreQuery();
  return <TableMaster title="Danh sách Albums" {...queryData} />;
};

export default Page;
