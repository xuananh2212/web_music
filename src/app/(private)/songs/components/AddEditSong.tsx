// Additional imports and component setup
"use client";
import FormMaster from "@/app/(private)/components/form-master";
import { default as UploadImage } from "@/app/(private)/components/upload-image/UploadImage";
import CustomTreeSelect from "@/components/custom-tree-select/CustomTreeSelect";
import { URL_IMAGE } from "@/helpers/common.constant";
import { validRequire } from "@/helpers/validate";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import UploadService from "@/services/upload/UploadService";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { DatePicker, Form, Input } from "antd";
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
  const { data: dataSong, isFetching } = useAlbumDetailQuery(id);
  const [form] = useForm();
  const { isPending: isUploadPending, mutateAsync: mutateUploadAsync } = useMutation({
    mutationFn: async (file: FormData) => {
      const response = await UploadService.uploadFileVideo(file);
      return response?.data;
    },
  });
  const { isPending: isUploadFileVideoPending, mutateAsync: mutateUploadFileVideoAsync } = useMutation({
    mutationFn: async (file: FormData) => {
      const response = await UploadService.uploadFileVideo(file);
      return response?.data;
    },
  });
  const typeView = type === "view";

  const handleAdd = async (
    data: Record<string, any>,
    mutateAsync: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => {
    try {
      const currenFile = data?.urlImageFile?.file;
      const fileMusic = data?.fileMp3File?.file;
      const fileVideoFile = data?.fileVideoFile?.file;
      if (currenFile) {
        const file = new FormData();
        file.append("file", currenFile);
        const response = await mutateUploadAsync(file);
        data.urlImage = `${URL_IMAGE}${response?.filePath}`;
      }
      if (fileMusic) {
        const file = new FormData();
        file.append("file", fileMusic);
        const response = await mutateUploadFileVideoAsync(file);
        data.fileUrl = `${URL_IMAGE}${response?.filePath}`;
      }
      if (fileVideoFile) {
        const file = new FormData();
        file.append("file", fileVideoFile);
        const response = await mutateUploadFileVideoAsync(file);
        data.videoUrl = `${URL_IMAGE}${response?.filePath}`;
      }
      await mutateAsync({
        ...data,
        releaseDate: data.releaseDate?.toISOString(),
        artistId: data?.artist?.value,
        genreId: data?.genre?.value,
        albumId: data?.album?.value,
      });
    } catch (err) {}
    onClose?.();
  };

  const handleUpdate = async (
    data: Record<string, any>,
    mutateAsyncUpdate: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => {
    try {
      const currenFile = data?.urlImageFile?.file;
      const fileMusic = data?.fileMp3File?.file;
      const fileVideoFile = data?.fileVideoFile?.file;
      if (currenFile) {
        const file = new FormData();
        file.append("file", currenFile);
        const response = await mutateUploadAsync(file);
        data.urlImage = `${URL_IMAGE}${response?.filePath}`;
      }
      if (fileMusic) {
        const file = new FormData();
        file.append("file", fileMusic);
        const response = await mutateUploadFileVideoAsync(file);
        data.fileUrl = `${URL_IMAGE}${response?.filePath}`;
      }
      if (fileVideoFile) {
        const file = new FormData();
        file.append("file", fileVideoFile);
        const response = await mutateUploadFileVideoAsync(file);
        data.videoUrl = `${URL_IMAGE}${response?.filePath}`;
      }
      console.log("data", data);
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
      isPending={isUploadPending || isUploadFileVideoPending}
      form={form}
      type={type}
      isFetching={isFetching}
      titleName="Bài hát"
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      queryKey={[MUSIC_QUERY_KEY_ENUM.SONGS]}
      queryDetailKey={[MUSIC_QUERY_KEY_ENUM.SONG_DETAIL]}
      mutationAddFn={async (data: any) => {
        const response = await musicService.createSong(data);
        return response?.data;
      }}
      mutationUpdateFn={async (data: any) => {
        const response = await musicService.updateSong(data);
        return response?.data;
      }}
      components={{
        addEditComponent: AddEditSong,
      }}
      id={id}
      initialDefaultValues={{}}
      dataEdit={{
        ...dataSong?.data?.data,
        genre: {
          value: dataSong?.data?.data?.Genre?.id,
          label: dataSong?.data?.data?.Genre?.name,
        },
        album: {
          value: dataSong?.data?.data?.Album?.id,
          label: dataSong?.data?.data?.Album?.title,
        },
        userName: dataSong?.data?.data?.data_name,
        urlImage: dataSong?.data?.data?.image_url,
        fileUrl: dataSong?.data?.data?.file_url,
        videoUrl: dataSong?.data?.data?.video_url,
        releaseDate: dataSong?.data?.data?.release_date
          ? dayjs(dataSong?.data?.data?.release_date)
          : dataSong?.data?.data?.release_date,
      }}
      minWidth={1100}
      onAddSuccess={onAddSuccess}
      onClose={onClose}
    >
      <div className="grid lg:grid-cols-4 gap-6">
        <Form.Item name="title" rules={[validRequire()]} label="Tên bài hát">
          <Input placeholder=" Nhập Tên bài hát" maxLength={25} readOnly={typeView} />
        </Form.Item>
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
          name="genre"
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
          treeNodeLabelProp="name"
          rules={[validRequire()]}
          header={[
            {
              id: "Id",
            },
            {
              name: "Tên album",
            },
          ]}
          name="album"
          placeholder={!typeView ? "Chọn Album" : ""}
          onLoadData={async (queryParams) => {
            const response: any = await musicService.getAlbums(queryParams);
            return (
              response?.data?.data?.length && response?.data?.data.map((data: any) => ({ ...data, name: data?.title }))
            );
          }}
          allowClear
          readOnly={typeView}
        />
        <Form.Item name="releaseDate" label="Ngày phát hành bài nhạc">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <div className="row-span-2 col-span-2">
          <UploadImage label="Hình ảnh" readonly={typeView} form={form} nameUrl="urlImage" nameFile="urlImageFile" />
        </div>
        <div className="row-span-2 col-span-2">
          <UploadFile form={form} nameUrl="fileUrl" nameFile="fileMp3File" label="Tải file nhạc" fileType="audio" />
        </div>

        <div className="row-span-2 col-span-2">
          <UploadFile form={form} nameUrl="videoUrl" nameFile="fileVideoFile" label="Tải video" fileType="video" />
        </div>

        <div className="row-span-2 col-span-2">
          <Form.Item className="h-full" name="lyrics" label="Lời bài hát">
            <TextArea className="h-full" rows={7} />
          </Form.Item>
        </div>
      </div>
    </FormMaster>
  );
};
export default AddEditSong;
