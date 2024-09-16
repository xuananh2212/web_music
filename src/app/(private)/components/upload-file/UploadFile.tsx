import Icons from "@/components/Icons";
import { validateFile } from "@/helpers/validate"; // Create a new validation helper for files
import { Button, Form, Image } from "antd";
import { useWatch } from "antd/es/form/Form";
import Dragger from "antd/es/upload/Dragger";
import clsx from "clsx";
import { toast } from "sonner";
import styles from "./UploadFile.module.scss"; // Updated file name

interface PropsUploadFile {
  form: any;
  nameUrl: string; // name for the URL of the uploaded file
  nameFile: any; // name for the file field in the form
  label?: string;
  readonly?: boolean;
  content?: string;
  fileType: "image" | "audio" | "video"; // New prop to handle file type
}

const UploadFile = ({
  form,
  nameUrl,
  readonly,
  nameFile,
  label,
  content = "Tải file",
  fileType = "image", // Default file type is image
}: PropsUploadFile) => {
  const beforeUploadHandler = (file: File) => {
    return false; // Prevent default upload behavior
  };

  const onChangeHandler = (info: any) => {
    const file = info.file;
    const { isValid, errorType, errorMessage } = validateFile(info.file, fileType); // Updated validation for files
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

  const handleDeleteFile = () => {
    form.setFieldValue(nameFile, null);
    form.setFieldValue(nameUrl, null);
  };

  const fileUrl = useWatch(nameUrl, { form, preserve: true });

  const renderPreview = () => {
    if (!fileUrl) return null;

    if (fileType === "image") {
      return <Image src={fileUrl} alt="file" />;
    }

    if (fileType === "audio") {
      return (
        <audio controls>
          <source src={fileUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (fileType === "video") {
      return (
        <video controls width="250">
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      );
    }

    return null;
  };

  return (
    <Form.Item className={clsx(readonly ? "pointer-events-none" : "")} name={nameFile} label={label}>
      <Dragger
        beforeUpload={beforeUploadHandler}
        onChange={(info) => onChangeHandler(info)}
        className={styles.removeNameFile}
      >
        {fileUrl ? (
          <div className={styles.fileContainer}>
            {renderPreview()} {/* Renders the appropriate preview based on file type */}
            <div className={styles.overlay}>
              <Button
                className="bg-transparent text-white border-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile();
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
              Tải lên {fileType === "image" ? "ảnh" : fileType === "audio" ? "nhạc MP3" : "video"} có dung lượng dưới
              50MB
            </p>
          </>
        )}
      </Dragger>
    </Form.Item>
  );
};

export default UploadFile;
