import { axiosInstance } from "@/configs/axios.config";
import { API_UPLOAD_TEMP, API_USER } from "@/configs/env.config";

class UploadService {
  static upload(files: any) {
    return axiosInstance.post("upload", null, {
      baseURL: API_USER,
    });
  }
  static uploadTemp(file: any) {
    console.log("file", file);
    return axiosInstance.post("file/upload-temp", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      allowSpacing: true,
      baseURL: API_UPLOAD_TEMP,
    });
  }
}

export default UploadService;
