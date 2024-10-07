import * as FileSystem from "expo-file-system";

export const bodyFile = async (value: any, file: any) => {
  const base64 = await FileSystem.readAsStringAsync(file.uri, {
    encoding: "base64",
  });

  const body = {
    tipo: file.mimeType.split("/")[1],
    nome: value,
    contentType: file.mimeType,
    content: base64,
  };

  return body
};
