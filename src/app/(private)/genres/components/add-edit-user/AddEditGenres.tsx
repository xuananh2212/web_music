// Additional imports and component setup
"use client";
import FormMaster from "@/app/(private)/components/form-master";
import UploadImage from "@/app/(private)/components/upload-image/UploadImage";
import { validRequire } from "@/helpers/validate";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import UploadService from "@/services/upload/UploadService";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { default as useUserDetailQuery } from "../../hooks/useUserDetailQuery";
export interface AddEditGenresProps {
  type: any;
  id?: string;
  onClose?: () => void;
  onSuccess?: (data: any) => void;
  onAddSuccess: () => void;
}

const AddEditGenres = ({ id, type, onClose, onSuccess, onAddSuccess }: AddEditGenresProps) => {
  const { data: dataUser, isFetching } = useUserDetailQuery(id);
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
      await mutateAsync(data);
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
      const sendData = { ...data, id };
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
      titleName="Thể loại nhạc"
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      queryKey={[MUSIC_QUERY_KEY_ENUM.GENRES]}
      queryDetailKey={[MUSIC_QUERY_KEY_ENUM.GENRES_DETAIL]}
      mutationAddFn={async (data: any) => {
        const response = await musicService.createGenre(data);
        return response?.data;
      }}
      mutationUpdateFn={async (data: any) => {
        const response = await musicService.updateGenre(data);
        return response?.data;
      }}
      components={{
        addEditComponent: AddEditGenres,
      }}
      id={id}
      initialDefaultValues={{}}
      dataEdit={{
        ...dataUser?.data?.data,
        userName: dataUser?.data?.data?.data_name,
        urlImage: dataUser?.data?.data?.url_image,
      }}
      minWidth={700}
      onAddSuccess={onAddSuccess}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-2 gap-6">
          <Form.Item name="name" rules={[validRequire()]} label="Tên thể loại">
            <Input placeholder=" Nhập tên thể loại" maxLength={25} readOnly={typeViewEdit} disabled={type === "edit"} />
          </Form.Item>
          <div className="row-span-2">
            <p>Hình ảnh</p>
            <UploadImage readonly={typeView} form={form} nameUrl="urlImage" nameFile="urlImageFile" />
          </div>
          <Form.Item className="col-span-2" name="description" label="Nội dùng">
            <TextArea rows={4} placeholder="Nhập đoạn văn ở đây" />
          </Form.Item>
        </div>
      </div>
    </FormMaster>
  );
};
export default AddEditGenres;
