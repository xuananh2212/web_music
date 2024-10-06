import dayjs from "dayjs";

export const convertBranchDetail = (data: any) => {
  return {
    place_of_issue: data?.place_of_issue,
    code: data?.code,
    name: data?.name,
    address: data?.address,
    date_of_issue: data?.date_of_issue ? dayjs(data?.date_of_issue) : "",
    register_number: data?.register_number,
  };
};
