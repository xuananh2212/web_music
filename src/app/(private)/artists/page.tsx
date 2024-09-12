"use client";

import TableMaster from "@/app/(private)/components/table-master/TableMaster";
import useUserQuery from "./hooks/useUserQuery";

const Page = () => {
  const queryData = useUserQuery();
  return <TableMaster title="Danh sách nghệ sĩ" {...queryData} />;
};

export default Page;
