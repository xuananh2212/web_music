import Icons from "@/components/Icons";
import { ModalBaseProps } from "@/stores/application/types";
import { Button, Modal } from "antd";
import { WarningCircle } from "iconoir-react";

interface ConfirmModalProps extends ModalBaseProps {
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string | null;
  cancelLabel?: string;
  isError?: boolean;
}

const ConfirmModal = ({
  onClose,
  title,
  confirmLabel = "Xác nhận",
  cancelLabel = "Thoát",
  onSubmit,
  loading,
  description,
  isError,
}: ConfirmModalProps) => {
  return (
    <Modal
      maskClosable={false}
      closable={false}
      className="!w-fit min-w-96 max-w-[600px]"
      centered
      open
      footer={
        <div className="flex justify-end gap-3">
          <Button onClick={onClose}>{cancelLabel}</Button>
          {confirmLabel && (
            <Button loading={loading} onClick={onSubmit} type="primary">
              {confirmLabel}
            </Button>
          )}
        </div>
      }
    >
      <div className="pt-2">
        <div className="flex gap-3">
          {isError ? <Icons size={22} name="close-circle" /> : <WarningCircle color="#FAAD14" width={24} height={24} />}
          <div className="flex flex-col gap-2">
            <p className="font-semibold opacity-85 text-base">{title}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
