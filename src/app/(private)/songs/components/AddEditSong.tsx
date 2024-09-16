// Additional imports and component setup
"use client";
import FormMaster from "@/app/(private)/components/form-master";
import { default as UploadImage } from "@/app/(private)/components/upload-image/UploadImage";
import CustomTreeSelect from "@/components/custom-tree-select/CustomTreeSelect";
import { validRequire } from "@/helpers/validate";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import UploadService from "@/services/upload/UploadService";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import UploadFile from "../../components/upload-file/UploadFile";
import useAlbumDetailQuery from "../hooks/useSongDetailQuery";
export interface AddEditSongProps {
  type: any;
  id?: string;
  onClose?: () => void;
  onAddSuccess: () => void;
}

const AddEditSong = ({ id, type, onClose, onAddSuccess }: AddEditSongProps) => {
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
        addEditComponent: AddEditSong,
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
          <Form.Item name="title" rules={[validRequire()]} label="Tên bài hát">
            <Input placeholder=" Nhập Tên bài hát" maxLength={25} readOnly={typeView} />
          </Form.Item>
          <div className="row-span-2">
            <UploadImage readonly={typeView} form={form} nameUrl="urlImage" nameFile="urlImageFile" />
          </div>
          <div className="col-span-2">
            <UploadFile form={form} nameUrl="file_url" nameFile="fileMp3File" label="Tải file nhạc" fileType="audio" />
          </div>

          <div className="row-span-2 col-span-2">
            <UploadFile form={form} nameUrl="video_url" nameFile="fileVideoFile" label="Tải video" fileType="video" />
          </div>

          <CustomTreeSelect
            label="Thể loại"
            treeNodeLabelProp="name"
            rules={[validRequire()]}
            header={[
              {
                id: "Id",
              },
              {
                name: "Tên thể loại",
              },
            ]}
            name="artist"
            placeholder={!typeView ? "Chọn Thể loại" : ""}
            onLoadData={async (queryParams) => {
              const response: any = await musicService.getGenres(queryParams);
              return response?.data?.data;
            }}
            allowClear
            readOnly={typeView}
          />
          <CustomTreeSelect
            label="Album"
            treeNodeLabelProp="title"
            rules={[validRequire()]}
            header={[
              {
                id: "Id",
              },
              {
                title: "Tên album",
              },
            ]}
            name="artist"
            placeholder={!typeView ? "Chọn Album" : ""}
            onLoadData={async (queryParams) => {
              const response: any = await musicService.getAlbums(queryParams);
              return response?.data?.data;
            }}
            allowClear
            readOnly={typeView}
          />
          <Form.Item name="lyrics" label="Lời bài hát">
            <TextArea />
          </Form.Item>
          <Form.Item name="releaseDate" label="Ngày phát hành bài nhạc">
            <TextArea />
          </Form.Item>
        </div>
      </div>
    </FormMaster>
  );
};
export default AddEditSong;
