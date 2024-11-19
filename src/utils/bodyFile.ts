export const bodyFile = async (value: any, file: any) => {
  const body = {
    ...file,
    name: value,
  };

  return body;
};

export const createFormData = (files: any[]) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file as any);
  });

  return formData;
};
