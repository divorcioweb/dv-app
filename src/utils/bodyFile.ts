import * as FileSystem from "expo-file-system";

export const bodyFile = async (value: any, file: any) => {
  // const base64 = await FileSystem.readAsStringAsync(file.uri, {
  //   encoding: "base64",
  // });

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
  console.log(formData);

  return formData;
};
