import { Department } from "@/services/category/types";
import _ from "lodash";

export const convertToDepartment = (data: any): Department => {
  return {
    code: data?.code,
    name: data?.name,
    branch_id: _.isObject(data?.branch) ? data?.branch?.value : data?.branch,
  };
};
