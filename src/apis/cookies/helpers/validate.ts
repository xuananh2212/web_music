import { CookieInterface } from "../utils/setCookie";

export default function validateDataPost(cookies: CookieInterface) {
  try {
    const { name, value, expire } = cookies;
    let errors = {};
    if (!name)
      errors = Object.assign(errors, {
        name: "Tên không được để trống",
      });
    if (!value) {
      errors = Object.assign(errors, {
        value: "Giá trị không được để trống",
      });
    }
    if (!expire) {
      errors = Object.assign(errors, {
        expire: "Thời hạn không được để trống",
      });
    }
    if (Object.keys(errors).length) {
      return {
        status: 400,
        errors,
      };
    } else {
      return {
        status: 201,
        message: "Thêm cookie thành công",
      };
    }
  } catch {
    return {
      status: 400,
    };
  }
}
