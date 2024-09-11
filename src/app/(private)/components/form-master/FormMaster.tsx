import { openConfirmDeleteModal, openModal } from "@/components";
import { ModalBaseProps } from "@/stores/application";
import { MutationFunction, UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Skeleton } from "antd";
import { FormInstance } from "antd/lib";
import clsx from "clsx";
import { ComponentType } from "react";
import { toast } from "sonner";
import CustomForm from "../custom-form/CustomForm";
import { FormType } from "../table-master";

interface FormMasterProps {
  children?: React.ReactNode;
  type: FormType;
  mutationAddFn: MutationFunction<any, any> | undefined;
  mutationUpdateFn: MutationFunction<any, any> | undefined;
  mutationDeleteFn?: MutationFunction<any, any> | undefined;
  handleAdd: (
    data: Record<string, any>,
    mutateAddAsync: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => Promise<void>;
  handleUpdate: (
    data: Record<string, any>,
    mutateUpdateAsync: UseMutateAsyncFunction<any, Error, any, unknown>
  ) => Promise<void>;
  components?: {
    addEditComponent?: ComponentType<ModalBaseProps & { onSuccess?: () => void } & any> | null;
  };
  queryKey: any[];
  queryDetailKey: any[];
  id?: string;
  onClose?: () => void;
  titleName: string;
  initialDefaultValues: any;
  styleForm?: string;
  minWidth?: number;
  onAddSuccess: () => void;
  dataEdit?: any;
  isFetching: boolean;
  form: FormInstance<any>;
  isPending?: boolean;
}

const FormMaster = ({
  isPending,
  form,
  titleName,
  children,
  type,
  onClose,
  queryKey,
  queryDetailKey,
  id,
  mutationAddFn,
  mutationUpdateFn,
  mutationDeleteFn,
  handleUpdate,
  handleAdd,
  initialDefaultValues,
  components,
  styleForm,
  minWidth = 1200,
  isFetching,
  onAddSuccess,
  dataEdit,
}: FormMasterProps) => {
  const queryClient = useQueryClient();
  const { isPending: isAddPending, mutateAsync: mutateAddAsync } = useMutation({
    mutationFn: mutationAddFn,
    onSuccess: () => {
      toast.success(`Thêm ${titleName} thành công`);
      queryClient.invalidateQueries({
        queryKey: [...queryDetailKey],
      });
      onAddSuccess();
    },
  });
  const { isPending: isUpdatePending, mutateAsync: mutateUpdateAsync } = useMutation({
    mutationFn: mutationUpdateFn,
    onSuccess: () => {
      toast.success(`Cập nhật ${titleName} thành công`);
      queryClient.invalidateQueries({
        queryKey: [...queryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [...queryDetailKey, id],
      });
    },
  });
  const { isPending: isPendingDelete, mutateAsync: mutateDeleteAsync } = useMutation({
    mutationFn: mutationDeleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKey],
      });
    },
  });
  const initialValues = type === "add" ? initialDefaultValues : dataEdit;
  const handleHelp = () => {};
  const handleCancel = () => {
    onClose?.();
  };
  const handleCopy = () => {
    components?.addEditComponent &&
      openModal(components?.addEditComponent, {
        type: "copy",
        id,
        onAddSuccess,
      });
  };
  const onUpdate = () => {
    components?.addEditComponent &&
      openModal(components?.addEditComponent, {
        type: "edit",
        id,
        onAddSuccess,
      });
  };
  const handleUpdateForm = (data: Record<string, any>) => {
    handleUpdate(data, mutateUpdateAsync);
  };
  const onDelete = () => {
    openConfirmDeleteModal(async () => {
      try {
        await mutateDeleteAsync({
          id: id as string,
        });
        toast.success(`Xóa ${titleName} thành công`);
        onClose?.();
      } catch (error) {}
    }, isPendingDelete);
  };
  const confirmLabel = type === "view" ? "Thoát" : "Lưu";
  const title = `${type === "view" ? "Xem chi tiết" : type === "edit" ? "Sửa" : "Thêm"} ${titleName}`;
  const description =
    type === "view" ? "" : `Hãy hoàn thành các trường thông tin để ${type === "edit" ? "sửa" : "thêm"} ${titleName}`;
  const handleFinish = type === "edit" ? handleUpdateForm : (values: any) => handleAdd(values, mutateAddAsync);
  const handleFinishAndAdd =
    type === "add" || type === "copy" ? (values: any) => handleAdd(values, mutateAddAsync) : undefined;
  return (
    <Modal
      maskClosable={false}
      closable={false}
      className={clsx(`min-w-[${minWidth}px]`)}
      centered
      open
      onCancel={handleCancel}
      footer={[]}
    >
      {isFetching ? (
        <Skeleton active />
      ) : (
        <CustomForm
          loading={isAddPending || isUpdatePending || isPending}
          type={type}
          form={form}
          initialValues={initialValues}
          onClose={handleCancel}
          onCopy={handleCopy}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onHelp={handleHelp}
          title={title}
          description={description}
          onFinishAndAdd={handleFinishAndAdd}
          onFinish={handleFinish}
          confirmLabel={confirmLabel}
        >
          <div className={clsx(styleForm)}>{children}</div>
        </CustomForm>
      )}
    </Modal>
  );
};

export default FormMaster;
