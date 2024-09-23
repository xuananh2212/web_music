// Additional imports and component setup
"use client";
import FormMaster from "@/app/(private)/components/form-master";
import UploadImage from "@/app/(private)/components/upload-image/UploadImage";
import { URL_IMAGE } from "@/helpers/common.constant";
import { validPhoneNumber } from "@/helpers/validate";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import UploadService from "@/services/upload/UploadService";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { default as useUserDetailQuery } from "../../hooks/useUserDetailQuery";
export interface AddEditUserProps {
  type: any;
  id?: string;
  onClose?: () => void;
  onSuccess?: (data: any) => void;
  onAddSuccess: () => void;
}

const AddEditUser = ({ id, type, onClose, onSuccess, onAddSuccess }: AddEditUserProps) => {
  const { data: dataUser, isFetching } = useUserDetailQuery(id);
  const [form] = useForm();
  const { isPending: isUploadPending, mutateAsync: mutateUploadAsync } = useMutation({
    mutationFn: async (file: FormData) => {
      const response = await UploadService.uploadFileVideo(file);
      return response?.data;
    },
  });
  const typeViewEdit = type === "edit" || type === "view";
  const typeView = type === "view";

  const handleAdd = async (
    data: Record<string, any>,
    mutateAsync: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => {};

  const handleUpdate = async (
    data: Record<string, any>,
    mutateAsyncUpdate: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => {
    try {
      const currenFile = data?.urlImageFile?.file;
      if (currenFile) {
        const file = new FormData();
        file.append("file", currenFile);
        const response = await mutateUploadAsync(file);
        data.urlImage = `${URL_IMAGE}${response?.filePath}`;
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
      titleName="người dùng"
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      queryKey={[MUSIC_QUERY_KEY_ENUM.USERS]}
      queryDetailKey={[MUSIC_QUERY_KEY_ENUM.USER_DETAIL]}
      mutationAddFn={async (data: any) => {}}
      mutationUpdateFn={async (data: any) => {
        const response = await musicService.updateUser({
          ...data,
        });
        return response?.data;
      }}
      components={{
        addEditComponent: AddEditUser,
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
          <Form.Item name="userName" label="Tên Người dùng">
            <Input
              placeholder="Nhập tên người dùng"
              maxLength={25}
              readOnly={typeViewEdit}
              disabled={type === "edit"}
            />
          </Form.Item>
          <div className="row-span-2">
            <p>Hình ảnh</p>
            <UploadImage readonly={typeView} form={form} nameUrl="urlImage" nameFile="urlImageFile" />
          </div>
          <Form.Item name="email" label="Email">
            <Input disabled={type === "edit"} readOnly={typeViewEdit} maxLength={255} />
          </Form.Item>
          <Form.Item name="phone" rules={[validPhoneNumber()]} label="Số điện thoại">
            <Input placeholder="Nhập số điện thoại" readOnly={typeView} maxLength={255} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select
              options={[
                { value: 1, label: "Đang hoạt động" },
                { value: 0, label: "Khóa tài khoản" },
              ]}
            />
          </Form.Item>
        </div>
      </div>
    </FormMaster>
  );
};
export default AddEditUser;
