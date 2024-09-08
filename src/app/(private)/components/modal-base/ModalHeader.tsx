import { Button } from "antd";
import { EditPencil, Trash } from "iconoir-react";
import { IoClose } from "react-icons/io5";

interface ModalHeaderProps {
  title: string;
  description?: string;
  onClose?: () => boolean | void;
  onDelete?: () => void;
  onHelp?: () => void;
  onCopy?: () => void;
  onUpdate?: () => void;
  isHiddenAction?: boolean;
}

const ModalHeader = ({ title, description, onDelete, onClose, onUpdate, isHiddenAction }: ModalHeaderProps) => {
  return (
    <div className="w-full mb-5">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="block text-color-500 font-bold text-xl">{title}</p>
          <p className="text-sm text-neutral-600">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          {onDelete && !isHiddenAction && (
            <Button
              onClick={onDelete}
              className="!outline-none !p-0 w-[30px] h-[30px] !border-none !bg-[#F7EDED] rounded-[10px] !hover:bg-[#fce8e8]"
            >
              <Trash width={24} className="cursor-pointer text-error-500" />
            </Button>
          )}
          {onUpdate && !isHiddenAction && (
            <Button
              className="!outline-none !p-0  w-[30px] h-[30px] !border-none !bg-[##76b7f3] rounded-[10px] !hover:bg-[##76b7f3]"
              onClick={() => {
                onUpdate();
                onClose?.();
              }}
            >
              <EditPencil width={24} className="cursor-pointer text-[#FF9443]" />
            </Button>
          )}
          {onClose && (
            <Button className="!outline-none !p-0  w-[30px] h-[30px]  !border-none" onClick={onClose}>
              <IoClose className="cursor-pointer" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
