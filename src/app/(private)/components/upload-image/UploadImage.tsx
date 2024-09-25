import Icons from "@/components/Icons";
import { validateImage } from "@/helpers/validate";
import { Button, Form, Image, Input } from "antd";
import { useWatch } from "antd/es/form/Form";
import Dragger from "antd/es/upload/Dragger";
import clsx from "clsx";
import { toast } from "sonner";
import styles from "./UploadImage.module.scss";
interface PropsUploadImage {
  form: any;
  nameUrl: string; // name url
  nameFile: any; // name file
  label?: string;
  readonly?: boolean;
  content?: string;
}
const UploadImage = ({ form, nameUrl, readonly, nameFile, label, content = "Tải ảnh" }: PropsUploadImage) => {
  const beforeUploadHandler = (file: File) => {
    return false;
  };
  const onChangeHandler = (info: any) => {
    const file = info.file;
    const { isValid, errorType, errorMessage } = validateImage(info.file, "");
    if (!isValid) {
      toast.error(errorMessage);
      if (form && errorType) {
        form.setFields([{ name: nameFile, errors: [errorMessage] }]);
      }
      return;
    }
    const localUrl = URL.createObjectURL(file);
    form.setFieldsValue({ [nameUrl]: localUrl });
    form.setFields([{ name: nameFile, errors: [] }]);
  };
  const handleDeleteImage = () => {
    form.setFieldValue(nameFile, null);
    form.setFieldValue(nameUrl, null);
  };
  const image = useWatch(nameUrl, { form, preserve: true });
  return (
    <>
      <Form.Item className={clsx(readonly ? "pointer-events-none" : "")} name={nameFile} label={label}>
        <Dragger
          beforeUpload={beforeUploadHandler}
          onChange={(info) => onChangeHandler(info)}
          className={styles.removeNameFile}
        >
          {image ? (
            <div className={styles.imageContainer}>
              <Image src={image} alt="image" />
              <div className={styles.overlay}>
                <Button
                  className="bg-transparent text-white border-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage();
                  }}
                >
                  X
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="ant-upload-drag-icon">
                <Icons className="!text-color-100" name="inbox" size={48} />
              </p>
              <p className="ant-upload-text text-center font-normal text-xs leading-6">{content}</p>
              <p className="ant-upload-hint text-center font-roboto text-[10px] font-normal leading-[22px] text-black/45">
                Tải lên ảnh có dung lượng dưới 5MB
              </p>
            </>
          )}
        </Dragger>
      </Form.Item>
      <Form.Item name={nameUrl} className="hidden">
        <Input />
      </Form.Item>
    </>
  );
};

export default UploadImage;
