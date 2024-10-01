export const convertDepartmentDetail = (data: Record<string, any>) => {
  return {
    branch: {
      value: data.branch?.id,
      label: data.branch?.name,
    },
    name: data?.name,
    code: data?.code,
  };
};
