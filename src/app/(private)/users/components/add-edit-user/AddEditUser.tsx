// Additional imports and component setup
"use client";
import FormMaster from "@/app/(private)/components/form-master";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Form, Input } from "antd";
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
  const { data: toolTypeDetail, isFetching } = useUserDetailQuery(id);
  const [form] = useForm();
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
      const sendData = { ...data, id };
      await mutateAsyncUpdate(sendData);
      form.resetFields();
      onClose?.();
    } catch (error) {}
  };
  return (
    <FormMaster
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
      dataEdit={{}}
      minWidth={700}
      onAddSuccess={onAddSuccess}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-2 gap-6">
          <Form.Item name="code" label="Mã loại CCDC">
            <Input
              placeholder="Nhập mã loại công cụ dụng cụ"
              maxLength={25}
              readOnly={typeViewEdit}
              disabled={type === "edit"}
            />
          </Form.Item>
          <Form.Item name="name" label="Tên loại CCDC">
            <Input readOnly={typeView} placeholder="Nhập tên loại công cụ dụng cụ" maxLength={255} />
          </Form.Item>

          <Form.Item name="explaination" label="Diễn giải" className="col-span-2">
            <Input readOnly={typeView} maxLength={255} placeholder={!typeView ? "Nhập diễn giải" : ""} />
          </Form.Item>
        </div>
      </div>
    </FormMaster>
  );
};
export default AddEditUser;
