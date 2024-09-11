import { axiosInstance } from "@/configs/axios.config";
import { API } from "@/configs/env.config";
import Cookies from "js-cookie";
import { LoginReq } from "./types";
class musicService {
  // Auth
  static login(data: LoginReq) {
    return axiosInstance.post("/auth/v1/sign-in", data, {
      baseURL: API,
    });
  }
  static refreshToken() {
    return axiosInstance.post(
      "/refresh-token",
      {
        refreshToken: Cookies.get("refresh_token"),
      },
      {
        baseURL: API,
        hiddenToastError: true,
      }
    );
  }
  // user
  static getUsers(params: any) {
    return axiosInstance.get("/user/v1", {
      baseURL: API,
      params,
    });
  }
  static getUserDetail(id: string) {
    return axiosInstance.get(`/user/v1/profile`, {
      baseURL: API,
    });
  }
  static updateUser(data: any) {
    return axiosInstance.post(`/user/v1/${data?.id}`, data, {
      baseURL: API,
    });
  }
}

export default musicService;
