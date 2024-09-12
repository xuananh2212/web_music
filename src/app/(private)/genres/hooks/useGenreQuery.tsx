import { addActionColumns } from "@/app/(private)/components/table-base/config/table.config";
import { BaseQueryTable, FormType, TableMasterProps } from "@/app/(private)/components/table-master";
import { openModal } from "@/components";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { useMemo, useState } from "react";
import getActionBar from "../../components/table-bar/common/getActionBar";
import { TableBaseProps } from "../../components/table-base";
import { GENRES_LIST_DEFAULT_COLUMNS } from "../columns.setting";
import AddEditGenres from "../components/add-edit-user/AddEditGenres";

const formatData = (data: any) => {
  return {
    ...data,
    items: data?.data.map((item: any) => {
      return {
        ...item,
        key: item.id,
      };
    }),
  };
};

const useGenreQuery: BaseQueryTable = () => {
  const initialQueryParams = { keyword: "" };
  const [queryParams, setQueryParams] = useState<any>(initialQueryParams);
  const onAction: TableMasterProps["onAction"] = (type, value) => {
    if (type === "delete" && value.id) {
    } else {
      openModal(AddEditGenres, {
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
  const listAction: FormType[] = ["view", "edit", "delete"];
  const { isPending, refetch, data } = useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.GENRES, queryParams],
    queryFn: async () => {
      const response = await musicService.getGenres(queryParams);
      return formatData(response?.data);
    },
    placeholderData: (prev) => prev,
  });

  const [columns, setColumns] = useState<TableBaseProps["columns"]>(
    addActionColumns(GENRES_LIST_DEFAULT_COLUMNS, onAction, listAction)
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
    defaultColumns: GENRES_LIST_DEFAULT_COLUMNS,
    onChangeQueryParams: setQueryParams,
    onAction,
  };
};

export default useGenreQuery;
