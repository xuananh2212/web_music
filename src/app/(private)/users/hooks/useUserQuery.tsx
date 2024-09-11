import getActionBar from "@/app/(private)/components/table-bar/common/getActionBar";
import { TableBaseProps } from "@/app/(private)/components/table-base";
import { addActionColumns } from "@/app/(private)/components/table-base/config/table.config";
import { BaseQueryTable, TableMasterProps } from "@/app/(private)/components/table-master";
import { openModal } from "@/components";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { useMemo, useState } from "react";
import { USER_LIST_DEFAULT_COLUMNS } from "../columns.setting";
import AddEditUser from "../components/add-edit-user/AddEditUser";

const formatData = (data: any) => {
  return {
    ...data,
    items: data?.users.map((item: any) => {
      return {
        ...item,
        key: item.id,
      };
    }),
  };
};

const useUserQuery: BaseQueryTable = () => {
  const initialQueryParams = { keyword: "" };
  const [queryParams, setQueryParams] = useState<any>(initialQueryParams);
  const onAction: TableMasterProps["onAction"] = (type, value) => {
    if (type === "delete" && value.id) {
    } else {
      openModal(AddEditUser, {
        type,
        id: value?.id,
        onAddSuccess: () => {
          setQueryParams((prev: any) => {
            if (isEqual(prev, initialQueryParams)) {
              refetch();
              return prev;
            } else {
              return initialQueryParams;
            }
          });
        },
      });
    }
  };
  const { isPending, refetch, data } = useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.USERS, queryParams],
    queryFn: async () => {
      const response = await musicService.getUsers(queryParams);
      return formatData(response?.data);
    },
    placeholderData: (prev) => prev,
  });

  const [columns, setColumns] = useState<TableBaseProps["columns"]>(
    addActionColumns(USER_LIST_DEFAULT_COLUMNS, onAction)
  );

  const actionsBar: TableMasterProps["actionsBar"] = useMemo(
    () =>
      getActionBar(
        {
          onRefetch: refetch,
        },
        true
      ),
    [queryParams]
  );

  return {
    data,
    loading: isPending,
    columns,
    onChangeColumns: setColumns,
    actionsBar,
    queryParams,
    defaultColumns: USER_LIST_DEFAULT_COLUMNS,
    onChangeQueryParams: setQueryParams,
    onAction,
    hiddenAdd: true,
  };
};

export default useUserQuery;
