import { Button, Form, FormInstance } from "antd";
import React, { useRef } from "react";
import ModalHeader from "../modal-base/ModalHeader";
import { FormType } from "../table-master";

interface CustomFormProps {
  name?: string;
  children: React.ReactNode;
  description: string;
  title: string;
  confirmLabel?: string;
  loading?: boolean;
  onFinish: (values: Record<string, any>) => void;
  onFinishAndAdd?: (values: Record<string, any>) => void;
  form: FormInstance<any>;
  type: FormType;
  initialValues?: any;
  onClose?: () => boolean | void;
  onEdit?: () => void;
  onView?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  onHelp?: () => void;
  onUpdate?: () => void;
  isHiddenAction?: boolean;
}

const CustomForm = ({
  name,
  children,
  onFinish,
  title,
  confirmLabel = "Lưu",
  loading,
  description,
  onClose,
  onFinishAndAdd,
  form,
  type,
  onView,
  onCopy,
  onUpdate,
  onEdit,
  onDelete,
  initialValues,
  onHelp,
  isHiddenAction,
}: CustomFormProps) => {
  const otherTypeAdd = type !== "add" && type !== "copy";
  const typeView = type === "view";
  const isHaveSaveAndAddNew = !!onFinishAndAdd;
  const refAction = useRef<"save" | "save-and-add-new">("save");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (type === "view") {
      onClose?.();
    } else {
      refAction.current = "save";
      form.submit();
    }
  };

  const handleSaveAndAdd = () => {
    refAction.current = "save-and-add-new";
    form.submit();
  };
  return (
    <div
      ref={formRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ModalHeader
        isHiddenAction={isHiddenAction}
        title={title}
        description={description}
        onClose={onClose}
        onHelp={onHelp}
        onUpdate={typeView ? onUpdate : undefined}
        onCopy={otherTypeAdd ? onCopy : undefined}
        onDelete={otherTypeAdd ? onDelete : undefined}
      />
      <Form
        initialValues={initialValues}
        form={form}
        layout="vertical"
        onFinish={(values) => (refAction.current === "save" ? onFinish(values) : onFinishAndAdd?.(values))}
      >
        <div className="max-h-[calc(100vh-200px)] overflow-auto">{children}</div>
        <div className="flex justify-end gap-3 mt-6 -mb-1">
          <Button loading={loading} type={"primary"} onClick={handleSave}>
            {confirmLabel}
          </Button>
          {/* {isHaveSaveAndAddNew && (
            <Button loading={loading} type="primary" onClick={handleSaveAndAdd}>
              Lưu và Thêm
            </Button>
          )} */}
        </div>
      </Form>
    </div>
  );
};

export default React.memo(CustomForm);
