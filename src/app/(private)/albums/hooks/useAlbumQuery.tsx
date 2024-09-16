import { addActionColumns } from "@/app/(private)/components/table-base/config/table.config";
import { BaseQueryTable, FormType, TableMasterProps } from "@/app/(private)/components/table-master";
import { openConfirmDeleteModal, openModal } from "@/components";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import getActionBar from "../../components/table-bar/common/getActionBar";
import { TableBaseProps } from "../../components/table-base";
import { ALBUM_LIST_DEFAULT_COLUMNS } from "../columns.setting";
import AddEditAlbum from "../components/add-edit-album/AddEditAlbum";

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

const useAlbumQuery: BaseQueryTable = () => {
  const initialQueryParams = { keyword: "" };
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState<any>(initialQueryParams);
  const { isPending: isPendingDelete, mutateAsync: mutateDeleteAsync } = useMutation({
    mutationFn: async (id: string) => {
      return musicService.deleteAlbum(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({
        queryKey: [MUSIC_QUERY_KEY_ENUM.ALBUMS],
      });
    },
  });
  const onAction: TableMasterProps["onAction"] = (type, value) => {
    if (type === "delete" && value.id) {
      openConfirmDeleteModal(() => {
        return mutateDeleteAsync(value.id);
      });
    } else {
      openModal(AddEditAlbum, {
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
    queryKey: [MUSIC_QUERY_KEY_ENUM.ALBUMS, queryParams],
    queryFn: async () => {
      const response = await musicService.getAlbums(queryParams);
      return formatData(response?.data);
    },
    placeholderData: (prev) => prev,
  });

  const [columns, setColumns] = useState<TableBaseProps["columns"]>(
    addActionColumns(ALBUM_LIST_DEFAULT_COLUMNS, onAction, listAction)
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
    defaultColumns: ALBUM_LIST_DEFAULT_COLUMNS,
    onChangeQueryParams: setQueryParams,
    onAction,
  };
};

export default useAlbumQuery;
