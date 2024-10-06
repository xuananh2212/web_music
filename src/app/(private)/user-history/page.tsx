"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import useUserHistoryQuery from "./hooks/useUserHistoryQuery";

const Page = () => {
  const queryData = useUserHistoryQuery();
  return <TableMaster title="Danh sách lịch sử nghe" {...queryData} />;
};

export default Page;
