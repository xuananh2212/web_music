export interface LoginReq {
  email: string;
  password: string;
  [key: string]: any;
}

export interface RegisterReq {
  username: string;
  password: string;
  phone: string;
  fullname: string;
  taxcode: string;
  email: string;
  company_name: string;
  domain_name: string;
  re_captcha_token: string;
  agreed_privacy_policy: boolean;
}

export interface ForgotPasswordReq {
  email: string;
}

export interface VerifyEmailReq {
  user_id: string;
  token: string;
}

export interface ResetPasswordReq {
  password: string;
  re_password: string;
}

export interface Role {
  code: string;
  name: string;
  description?: string;
  [key: string]: any;
}
export interface ForgotChangePasswordReq {
  password: string;
  re_password: string;
  token: string;
  user_id: string;
}

export interface Account {
  id?: string;
  code: string;
  email: string;
  username: string;
  role_id: string;
  branch_id: string;
}

export interface IAccountSearchParams {
  from_date?: string;
  to_date?: string;
  status?: number;
  role_id?: string;
  filters?: any;
  sort?: any;
  page_size?: number;
  page_index?: number;
  keyword?: string;
}

export enum StatusAccount {
  InActive = "Ngưng sử dụng",
  Active = "Hoạt động",
  ValidateEmail = "Chờ",
  CreatePassword = "Chưa tạo mật khẩu",
}
export enum StatusAccountValue {
  InActive = "0",
  Active = "1",
  ValidateEmail = "2",
  CreatePassword = "3",
}
