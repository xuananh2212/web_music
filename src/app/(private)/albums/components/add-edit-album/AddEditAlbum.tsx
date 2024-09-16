// Additional imports and component setup
"use client";
import FormMaster from "@/app/(private)/components/form-master";
import UploadImage from "@/app/(private)/components/upload-image/UploadImage";
import CustomTreeSelect from "@/components/custom-tree-select/CustomTreeSelect";
import { validRequire } from "@/helpers/validate";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import UploadService from "@/services/upload/UploadService";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { DatePicker, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import useAlbumDetailQuery from "../../hooks/useAlbumDetailQuery";
export interface AddEditAlbumProps {
  type: any;
  id?: string;
  onClose?: () => void;
  onAddSuccess: () => void;
}

const AddEditAlbum = ({ id, type, onClose, onAddSuccess }: AddEditAlbumProps) => {
  const { data: dataAlbum, isFetching } = useAlbumDetailQuery(id);
  const [form] = useForm();
  const { isPending: isUploadPending, mutateAsync: mutateUploadAsync } = useMutation({
    mutationFn: async (file: FormData) => {
      const response = await UploadService.uploadImage(file);
      return response?.data;
    },
  });
  const typeViewEdit = type === "edit" || type === "view";
  const typeView = type === "view";

  const handleAdd = async (
    data: Record<string, any>,
    mutateAsync: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => {
    try {
      const currenFile = data?.urlImageFile?.file;
      if (currenFile) {
        const file = new FormData();
        file.append("image", currenFile);
        const response = await mutateUploadAsync(file);
        data.urlImage = response?.data;
        onClose?.();
      }
      await mutateAsync({ ...data, releaseDate: data.releaseDate?.toISOString(), artistId: data?.artist?.value });
    } catch (err) {}
  };

  const handleUpdate = async (
    data: Record<string, any>,
    mutateAsyncUpdate: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => {
    try {
      const currenFile = data?.urlImageFile?.file;
      if (currenFile) {
        const file = new FormData();
        file.append("image", currenFile);
        const response = await mutateUploadAsync(file);
        data.urlImage = response?.data;
      }
      const sendData = {
        ...data,
        id,
        releaseDate: data?.releaseDate && data.releaseDate.toISOString(),
        artistId: data?.artist?.value,
      };
      await mutateAsyncUpdate(sendData);
      form.resetFields();
      onClose?.();
    } catch (error) {}
  };
  return (
    <FormMaster
      isPending={isUploadPending}
      form={form}
      type={type}
      isFetching={isFetching}
      titleName="Album"
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      queryKey={[MUSIC_QUERY_KEY_ENUM.ALBUMS]}
      queryDetailKey={[MUSIC_QUERY_KEY_ENUM.ALBUM_DETAIL]}
      mutationAddFn={async (data: any) => {
        const response = await musicService.createAlbum(data);
        return response?.data;
      }}
      mutationUpdateFn={async (data: any) => {
        const response = await musicService.updateAlbum(data);
        return response?.data;
      }}
      components={{
        addEditComponent: AddEditAlbum,
      }}
      id={id}
      initialDefaultValues={{}}
      dataEdit={{
        ...dataAlbum?.data?.data,
        userName: dataAlbum?.data?.data?.data_name,
        urlImage: dataAlbum?.data?.data?.image_url,
        artist: {
          value: dataAlbum?.data?.data?.artist_id,
          label: dataAlbum?.data?.data?.Artist?.stage_name,
        },
        releaseDate: dataAlbum?.data?.data?.release_date
          ? dayjs(dataAlbum?.data?.data?.release_date)
          : dataAlbum?.data?.data?.release_date,
      }}
      minWidth={700}
      onAddSuccess={onAddSuccess}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-2 gap-6">
          <Form.Item name="title" rules={[validRequire()]} label="Tên album">
            <Input placeholder=" Nhập tên album" maxLength={25} readOnly={typeView} />
          </Form.Item>
          <div className="row-span-2">
            <p>Hình ảnh</p>
            <UploadImage readonly={typeView} form={form} nameUrl="urlImage" nameFile="urlImageFile" />
          </div>

          <CustomTreeSelect
            label="Nghệ sĩ"
            treeNodeLabelProp="stage_name"
            rules={[validRequire()]}
            header={[
              {
                id: "Id",
              },
              {
                stage_name: "Nghệ danh",
              },
            ]}
            name="artist"
            placeholder={!typeView ? "Chọn loại công cụ dụng cụ" : ""}
            onLoadData={async (queryParams) => {
              const response: any = await musicService.getArtists(queryParams);
              return response?.data?.data;
            }}
            allowClear
            readOnly={typeView}
          />
          <Form.Item name="releaseDate" label="Ngày phát hành">
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
        </div>
      </div>
    </FormMaster>
  );
};
export default AddEditAlbum;
