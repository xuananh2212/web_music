import { axiosInstance } from "@/configs/axios.config";
import { API_USER } from "@/configs/env.config";
import Cookies from "js-cookie";
import {
  Account,
  ForgotChangePasswordReq,
  ForgotPasswordReq,
  IAccountSearchParams,
  LoginReq,
  RegisterReq,
  ResetPasswordReq,
  Role,
  VerifyEmailReq,
} from "./types";
class UserService {
  // Auth
  static login(data: LoginReq) {
    return axiosInstance.post("/authen/login", data, {
      baseURL: API_USER,
    });
  }
  static register(data: RegisterReq) {
    return axiosInstance.post("/authen/register", data, {
      baseURL: API_USER,
    });
  }
  static forgotPassword(data: ForgotPasswordReq) {
    return axiosInstance.post("/authen/forgot-password", data, {
      baseURL: API_USER,
    });
  }
  static refreshToken() {
    return axiosInstance.post(
      "/authen/refresh",
      {
        refresh_token: Cookies.get("refresh_token"),
      },
      {
        baseURL: API_USER,
        hiddenToastError: true,
      }
    );
  }
  static verifyEmail(data: VerifyEmailReq) {
    return axiosInstance.post("/authen/validate-email", data, {
      baseURL: API_USER,
    });
  }
  static forgotChangePassword(data: ForgotChangePasswordReq) {
    return axiosInstance.post("/authen/forgot-password-change-password", data, {
      baseURL: API_USER,
    });
  }
  static createPassword(data: ResetPasswordReq, token: string) {
    return axiosInstance.post("/authen/create-password", data, {
      baseURL: API_USER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Account
  static createAccount(data: Account) {
    return axiosInstance.post("/account", data, {
      baseURL: API_USER,
    });
  }
  static updatedAccount(data: Account) {
    return axiosInstance.post("/account/update", data, {
      baseURL: API_USER,
    });
  }

  static getAccount(params: IAccountSearchParams) {
    return axiosInstance.get("/account/search", { baseURL: API_USER, params });
  }
  static getDetailAccount(id: string) {
    return axiosInstance.get(`/account/${id}`, { baseURL: API_USER });
  }
  static deleteAccount(data: { id: string }) {
    return axiosInstance.post("/account/delete-account", data, {
      baseURL: API_USER,
    });
  }
  static deleteAccounts(data: { ids: string[] }) {
    return axiosInstance.post("/account/delete-accounts", data, {
      baseURL: API_USER,
    });
  }

  // Role
  static createRole(data: Role) {
    return axiosInstance.post("/role", data, {
      baseURL: API_USER,
      // hiddenToastError: true,
      // hiddenProgress: true,
    });
  }
  static getRole(params: IAccountSearchParams) {
    return axiosInstance.get("/role/search", { baseURL: API_USER, params });
  }
  static getRoleActive(params: IAccountSearchParams) {
    return axiosInstance.get("/role/search/active", { baseURL: API_USER, params });
  }
  static getDetailRole(id: string) {
    return axiosInstance.get(`/role/${id}`, { baseURL: API_USER });
  }
  static deleteRole(data: { id: string }) {
    return axiosInstance.post("/role/delete-role", data, {
      baseURL: API_USER,
    });
  }
  static updatedRole(data: Role) {
    return axiosInstance.post("/role/update", data, {
      baseURL: API_USER,
    });
  }
  static deleteRoles(data: { ids: string[] }) {
    return axiosInstance.post("/role/delete-roles", data, {
      baseURL: API_USER,
    });
  }
  static followRole(data: { id: string; is_followed: boolean }) {
    return axiosInstance.post("/role/toggle-follow", data, {
      baseURL: API_USER,
    });
  }
  static followAccount(data: { id: string; is_followed: boolean }) {
    return axiosInstance.post("/account/toggle-follow", data, {
      baseURL: API_USER,
    });
  }
}

export default UserService;
