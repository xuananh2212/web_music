import { Rule } from "antd/lib/form";

export const patternEmail =
  /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const patternUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const patternPhone =
  /^(?:\+84|0)(3|5|7|8|9|1[2|6|8|9])([0-9]{8})$|^(?:\+84|0)2([0-9]{9})$|^(?:\+84|0)?1900([0-9]{4,6})$/;
export const patternValidCharacter = /^[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]*$/;
export const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
export const patternDomain = /^[a-z]+(-[a-z]+)*$/;
export const patternVNCharacter =
  /^[a-zA-ZàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ\s]+$/;
const patternIdNumber = /^\d{12}$/;
const patternVND = /^(\d{1,3}(?:\.\d{3})*|\d+)(?:,\d{1,2})?$/;

export const validRequire = (message?: string): Rule => {
  return {
    required: true,
    validator: (_rule, value) => {
      if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
        return Promise.reject(message || "Trường này không thể trống");
      }
      return Promise.resolve();
    },
    message: message || "Trường này không thể trống",
  };
};

export const validRequireArray = (message?: string): Rule => {
  return {
    type: "array",
    validator: async (_, value) => {
      if (!value || value.length < 1) {
        return Promise.reject(new Error(message || "Mảng cần ít nhất 1 phần tử"));
      }
      return Promise.resolve();
    },
  };
};

export const validCharacter = (message?: string): Rule => {
  return {
    pattern: patternValidCharacter,
    transform: (value: string) => value.trim(),
    message: message || "Chuỗi chứa các ký tự không hợp lệ",
  };
};

export const validVNCharacter = (message?: string): Rule => {
  return {
    pattern: patternVNCharacter,
    transform: (value: string) => value.trim(),
    message: message || "Chuỗi chứa các ký tự không hợp lệ",
  };
};

export const validEmail = (message?: string): Rule => {
  return {
    type: "email",
    required: true,
    transform: (value: string) => value.trim(),
    message: message || "Định dạng email không hợp lệ",
  };
};

export const validMinLength = (minLength: number, message?: string): Rule => {
  return {
    min: minLength,
    transform: (value: string) => value.trim(),
    message: message || `Chiều dài tối thiểu là ${minLength}`,
  };
};

export const validMaxLength = (maxLength = 255, message?: string): Rule => {
  return {
    max: maxLength,
    transform: (value: string) => value.trim(),
    message: message || `Chiều dài tối đa là ${maxLength}`,
  };
};

export const validPassword = (message?: string): Rule => {
  return {
    validator: (_rule, value) => {
      if (!patternPassword.test(value)) {
        return Promise.reject(
          message ||
            "Mật khẩu tối thiểu 8 ký tự, và tối đa 15 ký tự. Bao gồm số, chữ thường, chữ in hoa và ký tự đặc biệt."
        );
      }
      return Promise.resolve();
    },
    message:
      message ||
      "Mật khẩu tối thiểu 8 ký tự, và tối đa 15 ký tự. Bao gồm số, chữ thường, chữ in hoa và ký tự đặc biệt.",
  };
};

export const validPhoneNumber = (message?: string): Rule => {
  return {
    validator: (_rule, value) => {
      if (!patternPhone.test(value)) {
        return Promise.reject(message || "Số điện thoại không hợp lệ");
      }
      return Promise.resolve();
    },
    message: message || "Số điện thoại không hợp lệ",
  };
};

export const validDomain = (message?: string): Rule => {
  return {
    validator: (_rule, value) => {
      if (!patternDomain.test(value)) {
        return Promise.reject(message || "Tên miền không hợp lệ. Chỉ cho phép chữ cái và dấu gạch ngang.");
      }
      return Promise.resolve();
    },
    message: message || "Tên miền không hợp lệ. Chỉ cho phép chữ cái và dấu gạch ngang.",
  };
};

export const validIdNumber = (message?: string): Rule => {
  return {
    validator: (_rule, value) => {
      const trimmedValue = value?.trim();
      if (!trimmedValue) {
        return Promise.resolve();
      }
      if (isNaN(Number(trimmedValue))) {
        return Promise.reject(message || "Dữ liệu phải là số.");
      }
      if (!patternIdNumber.test(trimmedValue)) {
        return Promise.reject(message || "Số căn cước công dân phải có đúng 12 ký tự số.");
      }
      return Promise.resolve();
    },
    message: message || "Số căn cước công dân phải có đúng 12 ký tự số. ",
  };
};

export const validMoneyVND = (message?: string): Rule => {
  return {
    validator: (_rule, value) => {
      const trimmedValue = String(value).trim();
      if (!trimmedValue) {
        return Promise.resolve();
      }
      if (!patternVND.test(trimmedValue)) {
        return Promise.reject(
          message || "Vui lòng nhập số tiền hợp lệ theo định dạng tiền tệ Việt Nam. Ví dụ: 1.000,00 hoặc 1000.00"
        );
      }
      return Promise.resolve();
    },
    message: message || "Vui lòng nhập số tiền hợp lệ theo định dạng tiền tệ Việt Nam. Ví dụ: 1.000,00 hoặc 1000.00",
  };
};
